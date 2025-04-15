# # Step 1: Use the official Node.js image to build the app
# FROM node:18 AS build

# # Set working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json for dependency installation
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Step 2: Use nginx to serve the built files
# FROM nginx:alpine AS production

# # Copy built files from the previous stage to nginx's default public directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom nginx configuration (optional)
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start nginx server
# CMD ["nginx", "-g", "daemon off;"]



# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage - use Node.js to serve
FROM node:18-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]