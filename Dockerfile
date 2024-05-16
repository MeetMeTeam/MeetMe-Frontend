# build stage
FROM node:lts-alpine as build-stage
ENV REACT_APP_BASE_API=${REACT_APP_BASE_API}
ENV REACT_APP_BASE_API_SOCKET=${REACT_APP_BASE_API_SOCKET}
ENV REACT_APP_BASE_API_PAYMENT=${REACT_APP_BASE_API_PAYMENT}
ENV DOCKER_IMAGE=${DOCKER_IMAGE}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]