# 概要

OAuth認証に必要なAuthorizationシグネチャを作成するライブラリ。

# 必要条件

| OS      | バージョン |
| :------ | :--------- |
| Ubuntu  | `16.04`    |

| アプリケーション | バージョン               |
| :--------------- | :----------------------- |
| node.js          | `>=8.11.4`               |
| npm              | `>=5.6.0`                |

## OAuthバージョン

| version       |
| :-----------: |
| `1.0`         |

## 対応API

* Twitter API

# スタートガイド

`package.json`の`dependencies`に以下２つの項目をを追記する。
```
"@sevenspice/warbler": "https://github.com/sevenspice/Warbler.git",
"request": "^2.88.0"
```

パッケージをインストールする。
```
npm install
```
※ インストールに失敗する場合は以下も試す。
```
npm install --ignore-scripts
```

ツイートを検索する場合のソースコード例。
```
touch index.js
vi index.js
```

ファイルに下記をコピーアンドペースト。
* コンシューマーキー、コンシューマーシークレット、アクセストークン、アクセストークンシークレットは適宜変更すること。
``` javascript
const Warbler = require('@sevenspice/warbler');
const Request = require('request');

const scheme              = 'https';
const host                = 'api.twitter.com';
const entry_point         = '/1.1/search/tweets.json';
const protocol            = 'GET';
const consumer_key        = 'コンシューマーキー';
const consumer_secret     = 'コンシューマーシークレット';
const access_token        = 'アクセストークン';
const access_token_secret = 'アクセストークンシークレット';
const options   = { q:'#天気', locale:'ja' };
const timeout   = 10000;
const timestamp = Math.round((new Date()).getTime() / 1000);

const walber = new Warbler(
    scheme
    , host
    , entry_point
    , protocol
    , consumer_key
    , consumer_secret
    , access_token
    , access_token_secret
    , options, timeout
);

const getResponse = (_, __, body) => {
    const tweets   = JSON.parse(body);
    const statuses = tweets.statuses;
    for(let i = 0; i < statuses.length; i++){
        process.stdout.write(`${statuses[i].id}\n`);
        process.stdout.write(`${statuses[i].text}\n`);
    }
};

Request.get({
    url: `${walber.getScheme()}://${walber.getHost()}${walber.getEntryPoint()}`,
    qs: walber.getOptions(),
    headers: {
        'Authorization':  walber.getAuthString(timestamp, walber.getNonce())
        , 'content-type': 'application/x-www-form-urlencoded'
    },
}, getResponse);

```

スクリプトを実行。
```
node index.js
```

# Direct Messageについて

Direct Messageでは若干他のAPIと仕様が若干異なるため注意が必要。以下に送信例を示す。
* [Sending and receiving events](https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/overview)

送信コード例
``` javascript
const Warbler = require('@sevenspice/warbler');
const Request = require('request');

const scheme              = 'https';
const host                = 'api.twitter.com';
const entry_point         = '/1.1/direct_messages/events/new.json';
const protocol            = 'POST';
const consumer_key        = 'コンシューマーキー';
const consumer_secret     = 'コンシューマーシークレット';
const access_token        = 'アクセストークン';
const access_token_secret = 'アクセストークンシークレット';
// options には DM に対応した JSON オブジェクトを指定する
const options   = { event: { type: "message_create", message_create: { target: { recipient_id: "USER_ID" } , message_data: { text: 'すごーい！' } } } };
const timeout   = 10000;
const timestamp = Math.round((new Date()).getTime() / 1000);

const walber = new Warbler(
    scheme
    , host
    , entry_point
    , protocol
    , consumer_key
    , consumer_secret
    , access_token
    , access_token_secret
    , options, timeout
);

const getResponse = (_, __, body) => {
    console.log(body);
};

request = Request.post({
    url: `${walber.getScheme()}://${walber.getHost()}${walber.getEntryPoint()}`,
    json: walber.getOptions(), // HTTP 通信に request パッケージを使用している場合は、qs ではなく json を指定する
    headers: {
        'Authorization':  walber.getAuthString(timestamp, walber.getNonce())
        , 'content-type': 'application/json' // application/x-www-form-urlencoded ではなく application/json を指定する
    },
}, getResponse);

```
* `recipient_id`は送りたいユーザーのIDを指定する。
* ユーザーのIDはエントリポイントの`/1.1/users/show.json`を使用して調べることができる。
    * [GET users/show](https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-show)

取得コード例
``` javascript
const Warbler = require('@sevenspice/warbler');
const Request = require('request');

const scheme              = 'https';
const host                = 'api.twitter.com';
const entry_point         = '/1.1/direct_messages/events/list.json';
const protocol            = 'GET';
const consumer_key        = 'コンシューマーキー';
const consumer_secret     = 'コンシューマーシークレット';
const access_token        = 'アクセストークン';
const access_token_secret = 'アクセストークンシークレット';
const options   = {};
const timeout   = 10000;
const timestamp = Math.round((new Date()).getTime() / 1000);

const walber = new Warbler(
    scheme
    , host
    , entry_point
    , protocol
    , consumer_key
    , consumer_secret
    , access_token
    , access_token_secret
    , options, timeout
);

const getResponse = (_, __, body) => {
    console.log(body);
};

request = Request.get({
    url: `${walber.getScheme()}://${walber.getHost()}${walber.getEntryPoint()}`,
    headers: {
        'Authorization':  walber.getAuthString(timestamp, walber.getNonce())
        , 'content-type': 'application/json'
    },
}, getResponse);

```
