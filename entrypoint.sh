#!/bin/sh

nginx -g 'daemon off;' &

echo "Waiting for certificates from Let's Encrypt..."
while [ ! -f /etc/letsencrypt/live/$SITE_DOMAIN/fullchain.pem ]; do
    sleep 5
done

echo "Certificates received, update Nginx configuration..."

envsubst '$SSL_CERT_PATH $SSL_CERT_KEY_PATH $ORIGIN_URL $ADMIN_EMAIL $SITE_DOMAIN $SITE_DOMAIN_WWW' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx -s reload

tail -f /dev/null