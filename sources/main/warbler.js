'use strict';

/**
 * Twitter APIに対応したOAuth認証用の設定値を作成するクラス
 */
class Warbler {

    /**
     * コンストラクタ
     * @param {string}  scheme              スキーム
     * @param {string}  host                Twitter APIのホスト名
     * @param {string}  path                エントリポイント
     * @param {string}  protocol            'GET'または'POST'
     * @param {string}  consumer_key        コンシューマーキー
     * @param {string}  consumer_secret     コンシューマーシークレットキー
     * @param {string}  access_token        アクセストークン
     * @param {string}  access_token_secret アクセストークンシークレット
     * @param {object}  options             クエリに追加するオプション
     * @param {integer} timeout             タイムアウト時間（ミリ秒）
     */
    constructor(

         scheme, host, entry_point, protocol, consumer_key, consumer_secret
        ,access_token, access_token_secret, options = {}, timeout = 5000

    ){

        this.scheme = scheme;
        this.host   = host;
        this.entry_point  = entry_point;
        this.protocol     = protocol;
        this.consumer_key = consumer_key;
        this.access_token = access_token;
        this.secret_key   = `${consumer_secret}&${access_token_secret}`;
        this.options = options;
        this.timeout = timeout;

    }

    /**
     * スキームを取得する
     * @return {string} スキームを返却
     */
     getScheme () {
         return this.scheme;
     }

    /**
     * ホストを取得する
     * @return {string} ホストを返却
     */
    getHost () {
        return this.host;  
    }

    /**
     * エントリポイントを取得する
     * @reutrn {string} エントリポイントを返却
     */
    getEntryPoint () {
        return this.entry_point;
    }

    /**
     *  プロトコルを取得する
     * @return {string} プロトコルを返却
     */
    getProtocol () {
        return this.protocol;
    }

    /**
     * コンシューマーキーを取得する
     * @return {string} コンシューマーキーを返却
     */
    getConsumerKey () {
         return this.consumer_key;
    }

    /**
     * アクセストークンを取得する
     * @return {string} アクセストークンを返却
     */
    getAccessToken () {
         return this.access_token;
    }

    /**
     * シークレットキーを取得する
     * @return {string} シークレットキーを返却
     */
    getSecretKey () {
        return this.secret_key;
    }

    /**
     * クエリに追加するオプションを取得する
     * @return {object} クエリに追加するオプションを返却
     */
    getOptions () {
        return this.options;
    }

    /**
     * URLエンコードされたクエリに追加するオプションを取得する
     * @return {object} クエリに追加するオプションを返却（URLエンコード済み）
     */
    getOptionsUrlEncoded () {

        var queries = {};

        for(const key in this.getOptions()){
            queries[key] = encodeURIComponent(this.getOptions()[key]);
        }

        return queries;

    }

    /**
     * クエリに追加するオプションを設定する
     * @param {object} options クエリに追加するオプションを返却
     */
    setOptions (options) {
        this.options = options;
    }

    /**
     * タイムアウト時間を取得する
     * @return {integer} タイムアウト時間（ミリ秒）を返却
     */
    getTimeout () {
        return this.timeout;
    }

    /**
     * タイムアウト時間を設定する
     * @param {integer} timeout タイムアウト時間（ミリ秒）を返却
     */
    setTimeout (timeout) {
        this.timeout = timeout;
    }

    /**
     * クラス定数
     */
    static get CODE_TABLE () {
        return '0123456789abcdef';
    }

    /**
     * 認証に使用する文字列を生成して返却する
     * @param {string} timestamp 送信時のタイムスタンプ値
     * @param {string} nonce     ランダム文字列
     * @return {string} HTTPヘッダーのAuthorizationキーに対応する認証用文字列を返却
     */
    getAuthString (timestamp, nonce) {

        var auth = 'OAuth ';

        // 署名を取得
        var signature = this.sign(this.getSignatureString(timestamp, nonce));

        // 署名をクエリーオブジェクトに追加
        var map = this.getQueryMap(timestamp, nonce, signature);

        for(const key in map){
            auth += `${key}="${encodeURIComponent(map[key])}", `;
        }

        // 末尾の,を削除して返却
        return auth.slice(0, -2);

    }

    /**
     * 署名を生成して返却する
     * ＊ハッシュはsha1で生成
     * @param {string} 署名元の文字列を指定
     * @return {string} 署名を返却（base64でエンコード済み）
     */
    sign (target) {

        var crypto = require('crypto');
        return crypto.createHmac('sha1', this.getSecretKey()).update(target).digest("base64");

    }

    /**
     * 署名のための文字列を生成して返却する
     * @param {string} timestamp 送信時のタイムスタンプ値
     * @param {string} nonce     ランダム文字列
     * @param {string} signature OAuth認証用の署名
     * @return {string} 署名用文字列を返却
     */
    getSignatureString (timestamp, nonce) {

        var url  = `${this.getScheme()}://${this.getHost()}${this.getEntryPoint()}`;
        var base = `${this.getProtocol()}&${encodeURIComponent(url)}&`;
        var map  = this.getQueryMap(timestamp, nonce);

        for(const key in map){
            base += encodeURIComponent((key + '=' + map[key] + '&'));
        }

        // 末尾の&を削除して返却
        return base.slice(0, -3);

    }

    /**
     * 送信するクエリーパラメーターを内包するオブジェクトを返却する
     * @param {string} timestamp 送信時のタイムスタンプ値
     * @param {string} nonce     ランダム文字列
     * @param {string} signature OAuth認証用の署名
     * @return {object} クエリパラメーターを内包するオブジェクトを返却
     */
    getQueryMap (timestamp, nonce, signature = '') {

        var parameters = {

            'oauth_token':        this.getAccessToken(),
            'oauth_consumer_key': this.getConsumerKey(),
            'oauth_timestamp': timestamp, 'oauth_signature_method': 'HMAC-SHA1',
            'oauth_nonce': nonce, 'oauth_version': '1.0'

        };

        for(const key in this.getOptions()){
            parameters[key] = encodeURIComponent(this.getOptions()[key]);
        }

        // 署名追加
        if(signature != '') parameters['oauth_signature'] = signature;

        // キーを基準に昇順に並べ替えて返却
        return this.sortMapByAsc(parameters);

    }

    /**
     * NONCE（使い捨てのランダムな値のこと）を生成して返却する
     * @return {string} ３２桁の文字列を返却
     */
    getNonce () {

        var nonce = '';
        var digit = (Warbler.CODE_TABLE.length * 2);

        for(var i=0; i<digit; i++){
            nonce += Warbler.CODE_TABLE.charAt(Math.floor((Math.random() * Warbler.CODE_TABLE.length)));
        }

        return nonce;

    }

    /**
     * オブジェクトの中身をキーに対して昇順で並べ替える
     * @param {object} 中身を並べ替えるオブジェクトを返却
     */
    sortMapByAsc (object) {

        var sorted = {};
        var keys   = [];
 
        // 引数に渡されたオブジェクトのキーのみを取り出す
        for(const key in object){
            keys.push(key);
        }

        // 昇順にソート
        keys.sort();

        // 再格納
        for(var i=0; i< keys.length; i++){
            sorted[keys[i]] = object[keys[i]];
        }

        return sorted;

    }

}

// エクスポート
module.exports = Warbler;
