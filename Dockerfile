FROM nginx:1.15.2-alpine

COPY frontend/dist /var/www
COPY admin/dist /var/www/admin
COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
ENTRYPOINT ["nginx","-g","daemon off;"]
