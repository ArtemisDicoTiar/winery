# build stage
FROM node:lts-alpine as build-stage
WORKDIR /covid_tmp
COPY package.json ./
RUN npm install --silent
COPY ./ .
RUN npm run build --quiet

# production stage
FROM nginx as production-stage
RUN mkdir /covid_tmp
COPY --from=build-stage ./covid_tmp/dist /covid_tmp
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]