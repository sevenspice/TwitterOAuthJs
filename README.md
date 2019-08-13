# 概要

OAuth認証に必要なパラメーターを作成するライブラリ。

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

## 対応 API

* Twitter API

# スタートガイド

`package.json` の `dependencies` に以下２つの項目をを追記する。
```
"@sevenspice/warbler": "https://github.com/sevenspice/Warbler.git",
"request": "^2.88.0"
```

パッケージをインストールする。
```
npm install
```

ツイートを検索する場合のソースコード例。
```
touch index.js
vi index.js
```
ファイルに下記をコピーアンドペースト。
※ コンシューマーキー、コンシューマーシークレット、アクセストークン、アクセストークンシークレットは適宜変更すること。
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
