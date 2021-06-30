# packing loading
FROM node:lts-alpine as loader
WORKDIR /covid_tmp
COPY package.json ./
RUN npm install --silent

# Django application image build
FROM loader AS builder
WORKDIR /covid_tmp
COPY --from=loader /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY . .
RUN npm run build --quiet

# production stage
FROM nginx as deployer
RUN mkdir /covid_tmp
COPY --from=builder ./covid_tmp/dist /covid_tmp
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]