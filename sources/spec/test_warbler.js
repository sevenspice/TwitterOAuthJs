'use strict';

const chai    = require('chai');
const assert  = chai.assert;
const Warbler = require(`${__dirname}/../main/warbler`);

describe('Warbler class test', () => {

    const scheme              = 'https';
    const host                = 'api.twitter.com';
    const entry_point         = '/1.1/search/tweets.json';
    const protocol            = 'GET';
    const consumer_key        = 'v0s9tO9WrMHh3yEnhqPujKSag1v6VMIc';
    const consumer_secret     = 'jr7HtnJF1VJN7iG65ibMNh13H2kaLqZ9';
    const access_token        = '8aGkj7x720sxrixbCi0KFilOysGmXSgI';
    const access_token_secret = 'mSBi1SW73czsajiCxVhHQ4jPHx9fEIqQ';
    let warbler = null;

    before( () => {});

    /*
     * 各テスト実施前に実行される
     */
    beforeEach( () => {});

    it('instance', () => {

        const options = {q:'twitter', locale:'ja'};

        // 引数をすべて指定してインスタンス化
        warbler = new Warbler(

            scheme, host, entry_point, protocol, consumer_key
            ,consumer_secret
            ,access_token
            ,access_token_secret
            ,options, 10000

            );


        assert.equal('object', (typeof warbler), 'warbler is not object.');
        assert.equal(scheme,       warbler.getScheme());
        assert.equal(host,         warbler.getHost());
        assert.equal(entry_point,  warbler.getEntryPoint());
        assert.equal(protocol,     warbler.getProtocol());
        assert.equal(consumer_key, warbler.getConsumerKey());
        assert.equal(access_token, warbler.getAccessToken());
        assert.equal(`${consumer_secret}&${access_token_secret}`, warbler.getSecretKey());
        assert.equal(options.q,      warbler.getOptions().q);
        assert.equal(options.locale, warbler.getOptions().locale);
        assert.equal(10000, warbler.getTimeout());


        // クエリオプションとタイムアウトを指定せずにインスタンス化
        warbler = null;
        warbler = new Warbler(

            scheme, host, entry_point, protocol, consumer_key
            ,consumer_secret
            ,access_token
            ,access_token_secret

            );


        assert.equal('object', (typeof warbler), 'warbler is not object.');
        assert.equal(scheme,       warbler.getScheme());
        assert.equal(host,         warbler.getHost());
        assert.equal(entry_point,  warbler.getEntryPoint());
        assert.equal(protocol,     warbler.getProtocol());
        assert.equal(consumer_key, warbler.getConsumerKey());
        assert.equal(access_token, warbler.getAccessToken());
        assert.equal(`${consumer_secret}&${access_token_secret}`, warbler.getSecretKey());
        assert.equal(0,    Object.keys(warbler.getOptions()).length);
        assert.equal(5000, warbler.getTimeout());

        warbler.setOptions(options);
        assert.notEqual(0, Object.keys(warbler.getOptions()).length);
        assert.equal(options.q,      warbler.getOptions().q);
        assert.equal(options.locale, warbler.getOptions().locale);

        warbler.setTimeout(20000);
        assert.equal(20000, warbler.getTimeout());


    });

    it('getOptionsUrlEncoded', () => {

        warbler.setOptions({status:"艦これ"});
        const options = warbler.getOptionsUrlEncoded();

        assert.equal('%E8%89%A6%E3%81%93%E3%82%8C', options['status']);

    });

    it('getAuthString', () => {

        // 返却されるはずの文字列
        const comparison = `OAuth oauth_consumer_key="6TrtNCAdrFounnGuensSQ1a6a", oauth_nonce="372cb60308b5f0479cda91149db21022", oauth_signature="zLDk31PcF6bXPVhy1LaR%2FLkD8zs%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1505374547", oauth_token="822787074-eNcVAnBjdn1TTZ4t1nY6vMZBf8ISKB0FhKWBeOzX", oauth_version="1.0", status="%25E8%2589%25A6%25E3%2581%2593%25E3%2582%258C"`;

        const protocol            = 'POST';
        const entry_point         = '/1.1/statuses/update.json';
        const consumer_key        = '6TrtNCAdrFounnGuensSQ1a6a';
        const consumer_secret     = 'TWWdXzvbsQICL2NotMcIcPxcLDsl7siIwbpaggVU2KcxWk6mgI';
        const access_token        = '822787074-eNcVAnBjdn1TTZ4t1nY6vMZBf8ISKB0FhKWBeOzX';
        const access_token_secret = 'bNHFjslVpXFN6MB4kW7OuhRQ2ZJ1IaBSztXmgm4Z9a0PC';
        const timestamp           = '1505374547';
        const nonce               = '372cb60308b5f0479cda91149db21022';
        const options             = {status:"艦これ"};

        const w = new Warbler(

            scheme, host, entry_point, protocol, consumer_key
            ,consumer_secret, access_token, access_token_secret
            ,options, 10000

            );

        const result = w.getAuthString(timestamp, nonce);

        assert.equal(comparison, result);

    });

    it('sign', () => {

        const target = 'Hello World';
        const key    = 'secret';

        const w = new Warbler(
            scheme, host, entry_point, protocol, consumer_key
            ,key, access_token, '' ); 

        const result = w.sign(target);
        assert.equal("Rn0mSLYlmbiWaLspobTbLILIkZs=", result);

    });

    it('getSignatureString', () => {

        // 返却されるはずの文字列
        const comparison = "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3D%25E8%2589%25A6%25E3%2581%2593%25E3%2582%258C";

        const protocol     = 'POST';
        const entry_point  = '/1.1/statuses/update.json';
        const consumer_key = 'xvz1evFS4wEEPTGEFPHBog';
        const access_token = '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb';
        const nonce        = 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg';
        const timestamp    = '1318622958';
        const options      = {status:"艦これ"};

        const w = new Warbler(

            scheme, host, entry_point, protocol, consumer_key
            ,consumer_secret, access_token, access_token_secret
            ,options, 10000

            ); 

        const result = w.getSignatureString(timestamp, nonce);

        assert.equal(comparison, result);

    });


    it('getNonce', () => {

        const nonce = warbler.getNonce();

        // 32桁であること
        assert.equal(32, nonce.length);

        const nonce1 = warbler.getNonce();
        const nonce2 = warbler.getNonce();

        // 同じ文字列が作成されないこと
        assert.notEqual(nonce1, nonce2);


    });

    it('getQueryMap', () => {

        const nonce = warbler.getNonce();
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const signature = 'abcdefghjklmnopq';
        let keys = [];

        warbler.setOptions({q:'twitter', locale:'ja'});
        let map = warbler.getQueryMap(timestamp, nonce, signature);

        // 要素数は9
        assert.equal(9, Object.keys(map).length);

        for(const key in map){
            keys.push(key);
        }

        // キーの並び順が昇順であること
        assert.equal('locale',                 keys[0]);
        assert.equal('oauth_consumer_key',     keys[1]);
        assert.equal('oauth_nonce',            keys[2]);
        assert.equal('oauth_signature',        keys[3]);
        assert.equal('oauth_signature_method', keys[4]);
        assert.equal('oauth_timestamp',        keys[5]);
        assert.equal('oauth_token',            keys[6]);
        assert.equal('oauth_version',          keys[7]);
        assert.equal('q',                      keys[8]);

        // キーと値の対応が正しいこと
        assert.equal('ja',         map[keys[0]]);
        assert.equal(consumer_key, map[keys[1]]);
        assert.equal(nonce,        map[keys[2]]);
        assert.equal(signature,    map[keys[3]]);
        assert.equal('HMAC-SHA1',  map[keys[4]]);
        assert.equal(timestamp,    map[keys[5]]);
        assert.equal(access_token, map[keys[6]]);
        assert.equal('1.0',        map[keys[7]]);
        assert.equal('twitter',    map[keys[8]]);

        keys = [];
        // 署名は指定しない
        map = warbler.getQueryMap(timestamp, nonce);

        // 要素数は8
        assert.equal(8, Object.keys(map).length);

        for(const key in map){
            keys.push(key);
        }

        // キーの並び順が昇順であること
        assert.equal('locale',                 keys[0]);
        assert.equal('oauth_consumer_key',     keys[1]);
        assert.equal('oauth_nonce',            keys[2]);
        assert.equal('oauth_signature_method', keys[3]);
        assert.equal('oauth_timestamp',        keys[4]);
        assert.equal('oauth_token',            keys[5]);
        assert.equal('oauth_version',          keys[6]);
        assert.equal('q',                      keys[7]);

        // キーと値の対応が正しいこと
        assert.equal('ja',         map[keys[0]]);
        assert.equal(consumer_key, map[keys[1]]);
        assert.equal(nonce,        map[keys[2]]);
        assert.equal('HMAC-SHA1',  map[keys[3]]);
        assert.equal(timestamp,    map[keys[4]]);
        assert.equal(access_token, map[keys[5]]);
        assert.equal('1.0',        map[keys[6]]);
        assert.equal('twitter',    map[keys[7]]);

    });

    it('sortMapByAsc', () => {

        const sample = { ringo:"apple", budou: "grape", kaki:"persimmon", akebi: "chocolate vine"};
        const sorted = warbler.sortMapByAsc(sample);
        const keys   = [];

        for(const key in sorted){
            keys.push(key);
        }

        // キーの並びが昇順であること
        assert.equal('akebi', keys[0]);
        assert.equal('budou', keys[1]);
        assert.equal('kaki' , keys[2]);
        assert.equal('ringo', keys[3]);

        // キーと値の対応が正しいこと
        assert.equal('chocolate vine', sorted[keys[0]]);
        assert.equal('grape',     sorted[keys[1]]);
        assert.equal('persimmon', sorted[keys[2]]);
        assert.equal('apple',     sorted[keys[3]]);

    });

    /*
     * 各テスト実施後に実行される
     */
    afterEach( () => {});

    after( () => {});

});