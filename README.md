# 概要

OAuth認証に必要なパラメーターを作成するライブラリ。
* Twitter APIに対応。

# OAuthバージョン

| version       |
| :-----------: |
| `1.0`         |

# 使用例

``` javascript

/*
 * GETの場合
 */

var Warbler = require(`${__dirname}/sources/main/warbler`);
var request = require("request");

var scheme              = 'https';
var host                = 'api.twitter.com';
var entry_point         = '/1.1/search/tweets.json';
var protocol            = 'GET';
var consumer_key        = '7TrtNCAdrFounnGuensSQ1a6p';
var consumer_secret     = 'TWWdXzcbsQICL2NotMcIcPxcLDsl7siIwbpaggVU2KcxWk6mgB';
var access_token        = '899784073-dMcVAnBjdn1TTZ4t1nY6vMZBf8ISKB0FhKWBeOzZ';
var access_token_secret = 'bNHFjslVpXFN6MB4kW7OuhRQ2ZJ1IaBSztXmgm4Z9a0DC';
var options   = {q:'#ペリーヌ物語', locale:'ja'}
var timeout   = 10000;
var timestamp = Math.round((new Date()).getTime() / 1000);

var walber = new Warbler(
    scheme, host, entry_point, protocol, consumer_key
    ,consumer_secret, access_token, access_token_secret
    ,options, timeout );
    
request.get({
  url: `${walber.getScheme()}://${walber.getHost()}${walber.getEntryPoint()}`,
  qs: walber.getOptions(),
  headers: {
      'Authorization': walber.getAuthString(timestamp, walber.getNonce()),
      'content-type':  'application/x-www-form-urlencoded'
  },
}, function (error, response, body) {
  console.log(body);
});


```

以下がレスポンス結果の例。

```json

{
    "search_metadata": {
        "completed_in": 0.04, 
        "count": 15, 
        "max_id": 907449791973539840, 
        "max_id_str": "907449791973539840", 
        "query": "%23%E3%83%9A%E3%83%AA%E3%83%BC%E3%83%8C%E7%89%A9%E8%AA%9E", 
        "refresh_url": "?since_id=907449791973539840&q=%23%E3%83%9A%E3%83%AA%E3%83%BC%E3%83%8C%E7%89%A9%E8%AA%9E&include_entities=1", 
        "since_id": 0, 
        "since_id_str": "0"
    }, 
    "statuses": [
        {
            "contributors": null, 
            "coordinates": null, 
            "created_at": "Tue Sep 12 03:44:24 +0000 2017", 
            "entities": {
                "hashtags": [
                    {
                        "indices": [
                            49, 
                            56
                        ], 
                        "text": "ペリーヌ物語"
                    }
                ], 
                "media": [
                    {
                        "display_url": "pic.twitter.com/2c9kSMThbb", 
                        "expanded_url": "https://twitter.com/F_M_U/status/859047464132685829/photo/1", 
                        "id": 859047365570957312, 
                        "id_str": "859047365570957312", 
                        "indices": [
                            57, 
                            80
                        ], 
                        "media_url": "http://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                        "media_url_https": "https://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                        "sizes": {
                            "large": {
                                "h": 418, 
                                "resize": "fit", 
                                "w": 567
                            }, 
                            "medium": {
                                "h": 418, 
                                "resize": "fit", 
                                "w": 567
                            }, 
                            "small": {
                                "h": 418, 
                                "resize": "fit", 
                                "w": 567
                            }, 
                            "thumb": {
                                "h": 150, 
                                "resize": "crop", 
                                "w": 150
                            }
                        }, 
                        "source_status_id": 859047464132685829, 
                        "source_status_id_str": "859047464132685829", 
                        "source_user_id": 96928584, 
                        "source_user_id_str": "96928584", 
                        "type": "photo", 
                        "url": "https://t.co/2c9kSMThbb"
                    }
                ], 
                "symbols": [], 
                "urls": [], 
                "user_mentions": [
                    {
                        "id": 96928584, 
                        "id_str": "96928584", 
                        "indices": [
                            3, 
                            9
                        ], 
                        "name": "中村豪志", 
                        "screen_name": "F_M_U"
                    }
                ]
            }, 
            "extended_entities": {
                "media": [
                    {
                        "display_url": "pic.twitter.com/2c9kSMThbb", 
                        "expanded_url": "https://twitter.com/F_M_U/status/859047464132685829/photo/1", 
                        "id": 859047365570957312, 
                        "id_str": "859047365570957312", 
                        "indices": [
                            57, 
                            80
                        ], 
                        "media_url": "http://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                        "media_url_https": "https://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                        "sizes": {
                            "large": {
                                "h": 418, 
                                "resize": "fit", 
                                "w": 567
                            }, 
                            "medium": {
                                "h": 418, 
                                "resize": "fit", 
                                "w": 567
                            }, 
                            "small": {
                                "h": 418, 
                                "resize": "fit", 
                                "w": 567
                            }, 
                            "thumb": {
                                "h": 150, 
                                "resize": "crop", 
                                "w": 150
                            }
                        }, 
                        "source_status_id": 859047464132685829, 
                        "source_status_id_str": "859047464132685829", 
                        "source_user_id": 96928584, 
                        "source_user_id_str": "96928584", 
                        "type": "photo", 
                        "url": "https://t.co/2c9kSMThbb"
                    }
                ]
            }, 
            "favorite_count": 0, 
            "favorited": false, 
            "geo": null, 
            "id": 907449791973539840, 
            "id_str": "907449791973539840", 
            "in_reply_to_screen_name": null, 
            "in_reply_to_status_id": null, 
            "in_reply_to_status_id_str": null, 
            "in_reply_to_user_id": null, 
            "in_reply_to_user_id_str": null, 
            "is_quote_status": false, 
            "lang": "ja", 
            "metadata": {
                "iso_language_code": "ja", 
                "result_type": "recent"
            }, 
            "place": null, 
            "possibly_sensitive": false, 
            "retweet_count": 181, 
            "retweeted": false, 
            "retweeted_status": {
                "contributors": null, 
                "coordinates": null, 
                "created_at": "Mon May 01 14:10:50 +0000 2017", 
                "entities": {
                    "hashtags": [
                        {
                            "indices": [
                                38, 
                                45
                            ], 
                            "text": "ペリーヌ物語"
                        }
                    ], 
                    "media": [
                        {
                            "display_url": "pic.twitter.com/2c9kSMThbb", 
                            "expanded_url": "https://twitter.com/F_M_U/status/859047464132685829/photo/1", 
                            "id": 859047365570957312, 
                            "id_str": "859047365570957312", 
                            "indices": [
                                46, 
                                69
                            ], 
                            "media_url": "http://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                            "media_url_https": "https://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                            "sizes": {
                                "large": {
                                    "h": 418, 
                                    "resize": "fit", 
                                    "w": 567
                                }, 
                                "medium": {
                                    "h": 418, 
                                    "resize": "fit", 
                                    "w": 567
                                }, 
                                "small": {
                                    "h": 418, 
                                    "resize": "fit", 
                                    "w": 567
                                }, 
                                "thumb": {
                                    "h": 150, 
                                    "resize": "crop", 
                                    "w": 150
                                }
                            }, 
                            "type": "photo", 
                            "url": "https://t.co/2c9kSMThbb"
                        }
                    ], 
                    "symbols": [], 
                    "urls": [], 
                    "user_mentions": []
                }, 
                "extended_entities": {
                    "media": [
                        {
                            "display_url": "pic.twitter.com/2c9kSMThbb", 
                            "expanded_url": "https://twitter.com/F_M_U/status/859047464132685829/photo/1", 
                            "id": 859047365570957312, 
                            "id_str": "859047365570957312", 
                            "indices": [
                                46, 
                                69
                            ], 
                            "media_url": "http://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                            "media_url_https": "https://pbs.twimg.com/media/C-vzBw4XkAA3YU7.jpg", 
                            "sizes": {
                                "large": {
                                    "h": 418, 
                                    "resize": "fit", 
                                    "w": 567
                                }, 
                                "medium": {
                                    "h": 418, 
                                    "resize": "fit", 
                                    "w": 567
                                }, 
                                "small": {
                                    "h": 418, 
                                    "resize": "fit", 
                                    "w": 567
                                }, 
                                "thumb": {
                                    "h": 150, 
                                    "resize": "crop", 
                                    "w": 150
                                }
                            }, 
                            "type": "photo", 
                            "url": "https://t.co/2c9kSMThbb"
                        }
                    ]
                }, 
                "favorite_count": 162, 
                "favorited": false, 
                "geo": null, 
                "id": 859047464132685829, 
                "id_str": "859047464132685829", 
                "in_reply_to_screen_name": null, 
                "in_reply_to_status_id": null, 
                "in_reply_to_status_id_str": null, 
                "in_reply_to_user_id": null, 
                "in_reply_to_user_id_str": null, 
                "is_quote_status": false, 
                "lang": "ja", 
                "metadata": {
                    "iso_language_code": "ja", 
                    "result_type": "recent"
                }, 
                "place": null, 
                "possibly_sensitive": false, 
                "retweet_count": 181, 
                "retweeted": false, 
                "source": "<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>", 
                "text": "ナニワ金融道的な。
ペリーヌの有能さは名作劇場の中でも最高レベルですんや。
#ペリーヌ物語 https://t.co/2c9kSMThbb", 
                "truncated": false, 
                "user": {
                    "contributors_enabled": false, 
                    "created_at": "Tue Dec 15 06:36:20 +0000 2009", 
                    "default_profile": false, 
                    "default_profile_image": false, 
                    "description": "イラスト描いてます。版権絵描かせていただいたりグループ展などの企画に混ぜてもらったり。", 
                    "entities": {
                        "description": {
                            "urls": []
                        }, 
                        "url": {
                            "urls": [
                                {
                                    "display_url": "www1.wisnet.ne.jp/~daydream/", 
                                    "expanded_url": "http://www1.wisnet.ne.jp/~daydream/", 
                                    "indices": [
                                        0, 
                                        22
                                    ], 
                                    "url": "http://t.co/fkiTFHyTzw"
                                }
                            ]
                        }
                    }, 
                    "favourites_count": 954, 
                    "follow_request_sent": false, 
                    "followers_count": 4619, 
                    "following": false, 
                    "friends_count": 315, 
                    "geo_enabled": false, 
                    "has_extended_profile": false, 
                    "id": 96928584, 
                    "id_str": "96928584", 
                    "is_translation_enabled": false, 
                    "is_translator": false, 
                    "lang": "ja", 
                    "listed_count": 196, 
                    "location": "東京都練馬区", 
                    "name": "中村豪志", 
                    "notifications": false, 
                    "profile_background_color": "C0DEED", 
                    "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/729611678/206a7044fb0f2a7dbea7f8e4d7eb279d.jpeg", 
                    "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/729611678/206a7044fb0f2a7dbea7f8e4d7eb279d.jpeg", 
                    "profile_background_tile": true, 
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/96928584/1498661575", 
                    "profile_image_url": "http://pbs.twimg.com/profile_images/876076375399989249/JKamcgCD_normal.jpg", 
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/876076375399989249/JKamcgCD_normal.jpg", 
                    "profile_link_color": "4A913C", 
                    "profile_sidebar_border_color": "FFFFFF", 
                    "profile_sidebar_fill_color": "DDEEF6", 
                    "profile_text_color": "333333", 
                    "profile_use_background_image": true, 
                    "protected": false, 
                    "screen_name": "F_M_U", 
                    "statuses_count": 3089, 
                    "time_zone": "Tokyo", 
                    "translator_type": "none", 
                    "url": "http://t.co/fkiTFHyTzw", 
                    "utc_offset": 32400, 
                    "verified": false
                }
            }, 
            "source": "<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>", 
            "text": "RT @F_M_U: ナニワ金融道的な。
ペリーヌの有能さは名作劇場の中でも最高レベルですんや。
#ペリーヌ物語 https://t.co/2c9kSMThbb", 
            "truncated": false, 
            "user": {
                "contributors_enabled": false, 
                "created_at": "Mon Jul 26 12:53:09 +0000 2010", 
                "default_profile": false, 
                "default_profile_image": false, 
                "description": "昭和のアニソン、Ｊ－ＰＯＰ、フォークソング、古き心の童謡にアニメと声優さんが大好きです。ここ近年は最新のウォークマンが手放せませんが、ラジオの録音はカセットとカセットウォークマンを愛用
。テレビ番組の録画はＨＤＤで済ませてます。最近は気分次第のつぶやきで皆様のツイート見ている事が多いです。
　", 
                "entities": {
                    "description": {
                        "urls": []
                    }
                }, 
                "favourites_count": 1363, 
                "follow_request_sent": false, 
                "followers_count": 191, 
                "following": false, 
                "friends_count": 278, 
                "geo_enabled": true, 
                "has_extended_profile": false, 
                "id": 171053299, 
                "id_str": "171053299", 
                "is_translation_enabled": false, 
                "is_translator": false, 
                "lang": "ja", 
                "listed_count": 16, 
                "location": "大阪府", 
                "name": "亜紀", 
                "notifications": false, 
                "profile_background_color": "B2DFDA", 
                "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/704870133601144832/FZf8MtAH.jpg", 
                "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/704870133601144832/FZf8MtAH.jpg", 
                "profile_background_tile": false, 
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/171053299/1497609876", 
                "profile_image_url": "http://pbs.twimg.com/profile_images/875664621645946880/-YkPzd_6_normal.jpg", 
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/875664621645946880/-YkPzd_6_normal.jpg", 
                "profile_link_color": "93A644", 
                "profile_sidebar_border_color": "000000", 
                "profile_sidebar_fill_color": "000000", 
                "profile_text_color": "000000", 
                "profile_use_background_image": false, 
                "protected": false, 
                "screen_name": "aki_retoro", 
                "statuses_count": 5450, 
                "time_zone": "Hawaii", 
                "translator_type": "none", 
                "url": null, 
                "utc_offset": -36000, 
                "verified": false
            }
        }
    ]
}

```

``` javascript

/*
 * POSTの場合
 */

var Warbler = require(`${__dirname}/sources/main/warbler`);
var request = require("request");

var scheme              = 'https';
var host                = 'api.twitter.com';
var entry_point         = '/1.1/statuses/update.json';
var protocol            = 'POST';
var consumer_key        = '6TrtNCAdrFoxccGuensSQ1a6n';
var consumer_secret     = 'TWWdXzvbsQICL2NotMcIcQrxLDsl7siIwbpaggVU2KcxWk6mgG';
var access_token        = '800787111-eNcVBmBjdn1TTZ4t1nY6vMZBf8CSKB0FhKWBeOzU';
var access_token_secret = 'bNHFjslVpXFN6MB4kZ7GulRQ9ZJ1IbBSztXmgm4Z9a0PE';
var options   = {status:`テスト投稿:${Math.round((new Date()).getTime() / 1000)}`};
var timeout   = 10000;
var timestamp = Math.round((new Date()).getTime() / 1000);

var walber = new Warbler(
    scheme, host, entry_point, protocol, consumer_key
    ,consumer_secret, access_token, access_token_secret
    ,options, timeout );

request.post({
  url: `${walber.getScheme()}://${walber.getHost()}${walber.getEntryPoint()}`,
  qs: walber.getOptions(),
  headers: {
      'Authorization': walber.getAuthString(timestamp, walber.getNonce()),
      'content-type':  'application/x-www-form-urlencoded'
  },
}, function (error, response, body) {
  console.log(body);
});

```

以下がレスポンス結果の例。

```json

{
    "contributors": null, 
    "coordinates": null, 
    "created_at": "Fri Sep 15 02:17:43 +0000 2017", 
    "entities": {
        "hashtags": [], 
        "symbols": [], 
        "urls": [], 
        "user_mentions": []
    }, 
    "favorite_count": 0, 
    "favorited": false, 
    "geo": null, 
    "id": 908515141104177152, 
    "id_str": "908515141104177152", 
    "in_reply_to_screen_name": null, 
    "in_reply_to_status_id": null, 
    "in_reply_to_status_id_str": null, 
    "in_reply_to_user_id": null, 
    "in_reply_to_user_id_str": null, 
    "is_quote_status": false, 
    "lang": "ja", 
    "place": null, 
    "retweet_count": 0, 
    "retweeted": false, 
    "source": "<a href="http://blog.redspice.me/" rel="nofollow">API練習用</a>", 
    "text": "テスト投稿:1505441863", 
    "truncated": false, 
    "user": {
        "contributors_enabled": false, 
        "created_at": "Fri Sep 14 06:21:47 +0000 2012", 
        "default_profile": true, 
        "default_profile_image": false, 
        "description": "ハムスターかわいい！", 
        "entities": {
            "description": {
                "urls": []
            }
        }, 
        "favourites_count": 0, 
        "follow_request_sent": false, 
        "followers_count": 0, 
        "following": false, 
        "friends_count": 0, 
        "geo_enabled": false, 
        "has_extended_profile": false, 
        "id": 822787074, 
        "id_str": "822787074", 
        "is_translation_enabled": false, 
        "is_translator": false, 
        "lang": "ja", 
        "listed_count": 0, 
        "location": "", 
        "name": "一味唐辛子", 
        "notifications": false, 
        "profile_background_color": "C0DEED", 
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png", 
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png", 
        "profile_background_tile": false, 
        "profile_image_url": "http://pbs.twimg.com/profile_images/524369645365522432/yTYaZ10o_normal.png", 
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/524369645365522432/yTYaZ10o_normal.png", 
        "profile_link_color": "1DA1F2", 
        "profile_sidebar_border_color": "C0DEED", 
        "profile_sidebar_fill_color": "DDEEF6", 
        "profile_text_color": "333333", 
        "profile_use_background_image": true, 
        "protected": false, 
        "screen_name": "griefseedEx", 
        "statuses_count": 62, 
        "time_zone": "Osaka", 
        "translator_type": "none", 
        "url": null, 
        "utc_offset": 32400, 
        "verified": false
    }
}

```
