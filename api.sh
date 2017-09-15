#!/bin/bash

# -------------------------------------------- #
# APIへのアクセスをテストするシェルスクリプト
# -------------------------------------------- #

# POST 投稿（-dは「艦これ」をURLエンコードした文字列）
curl 'https://api.twitter.com/1.1/statuses/update.json' \
-H 'application/x-www-form-urlencoded' \
-H 'Authorization: OAuth oauth_consumer_key="9TrtNCAdrFounnGxegsSQ1a6n", oauth_nonce="372cb60308b5f0479cda91149db21022", oauth_signature="lpfZJmTmdxCS3aDxUsuRLkumchw%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1505374547", oauth_token="822787099-eNcVAnBjdn1TTZ4t1nY6vMZDg9HSKB0FhKWBeOyU", oauth_version="1.0", status="%25E8%2589%25A6%25E3%2581%2593%25E3%2582%258C"' \
-X POST \
-d 'status=%E8%89%A6%E3%81%93%E3%82%8C' \
-v

# GET 検索
#curl \
#--verbose \
#--header 'application/x-www-form-urlencoded' \
#--header 'Authorization: OAuth oauth_consumer_key="6TrtNCAdrFozummGuensSQ1a9n", oauth_nonce="df8f204cbc2f4ad257ec3ef397e90f3a", oauth_signature="QtETcBu3BZEcpg51OyAcohIVaOo%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1505372700", oauth_token="833787074-eNcVAnBjdn1TTZ4t1bY6vXXBg8ISKB0FhKWBeOzP", oauth_version="1.0", q="%2523twitter"' \
#'https://api.twitter.com/1.1/search/tweets.json?q=%23twitter'
