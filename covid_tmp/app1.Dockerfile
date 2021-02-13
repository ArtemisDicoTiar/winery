# build stage
FROM node:lts-alpine as build-stage
WORKDIR /covid_tmp_green
COPY package.json ./
RUN npm install --silent
COPY ./ .
RUN npm run build --quiet

# production stage
FROM nginx as production-stage
RUN mkdir /covid_tmp_green
COPY --from=build-stage /covid_tmp_green/dist /covid_tmp_green
COPY ./app1_nginx.conf /etc/nginx/nginx.conf

EXPOSE 18080
CMD ["nginx", "-g", "daemon off;"]