FROM node:lts-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM fholzer/nginx-brotli:mainline-latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "deamon off"]