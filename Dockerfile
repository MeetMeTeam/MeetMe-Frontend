FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install --production
RUN apk --no-cache add --virtual .build-deps \
        build-base \
    && apk del .build-deps
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
