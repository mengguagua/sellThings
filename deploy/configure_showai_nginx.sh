#!/usr/bin/env bash
set -euo pipefail

NGINX_CONF="/root/nginx/nginx-1.26.1/conf/nginx.conf"
BACKUP="/root/nginx/nginx-1.26.1/conf/nginx.conf.sellthings.bak.$(date +%Y%m%d%H%M%S)"

cp "$NGINX_CONF" "$BACKUP"

if ! grep -q "location /sellthings/" "$NGINX_CONF"; then
  awk '
    BEGIN {
      in_otaku = 0
      inserted = 0
    }
    /server_name[[:space:]]+otaku\.gaocc\.cc;/ {
      in_otaku = 1
    }
    in_otaku && !inserted && /^[[:space:]]*location[[:space:]]+\/[[:space:]]*\{/ {
      print "        location = /sellthings {"
      print "            return 301 /sellthings/;"
      print "        }"
      print ""
      print "        location /sellthings/ {"
      print "            root /root;"
      print "            index index.html;"
      print "            try_files $uri $uri/ /sellthings/index.html;"
      print "        }"
      print ""
      inserted = 1
    }
    { print }
  ' "$NGINX_CONF" > "$NGINX_CONF.tmp"
  mv "$NGINX_CONF.tmp" "$NGINX_CONF"
fi

/root/nginx/nginx-1.26.1/sbin/nginx -t
/root/nginx/nginx-1.26.1/sbin/nginx -s reload
