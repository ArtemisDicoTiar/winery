FROM nginx as production-stage
MAINTAINER John Kim <mw18074@bristol.ac.uk>

ADD ./proxy_nginx.conf /usr/local/nginx/conf/nginx.conf

# volume
VOLUME /usr/local/nginx/conf/conf.d

WORKDIR /usr/local/nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
