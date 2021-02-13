# build stage
FROM node:lts-alpine as build-stage
WORKDIR /covid_tmp_blue
COPY package.json ./
RUN npm install --silent
COPY ./ .
RUN npm run build --quiet

# production stage
FROM nginx as production-stage
RUN mkdir /covid_tmp_blue
COPY --from=build-stage /covid_tmp_blue/dist /covid_tmp_blue
COPY ./app2_nginx.conf /etc/nginx/nginx.conf

EXPOSE 18081
CMD ["nginx", "-g", "daemon off;"]