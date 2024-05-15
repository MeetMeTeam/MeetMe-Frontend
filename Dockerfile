# Use .dockerignore to exclude unnecessary files and directories

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

# Copy built application from build stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
