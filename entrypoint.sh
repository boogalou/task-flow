#!/usr/bin/env sh

# Get SSL-certs
certbot certonly --staging --webroot --webroot-path=/usr/share/nginx/html --non-interactive --agree-tos --no-eff-email -m $ADMIN_EMAIL -d $SITE_DOMAIN -d $SITE_DOMAIN_WWW

# Config Nginx
envsubst '$SSL_CERT_PATH $SSL_CERT_KEY_PATH $ORIGIN_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Run cron for autoupdate certs
echo "0 0 * * * certbot renew --quiet" > /etc/crontabs/root
crond

# Run Nginx
nginx -g "daemon off;"
