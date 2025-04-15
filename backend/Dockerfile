FROM node:18

WORKDIR /usr/src/app

# Install build tools for native dependencies
RUN apt-get update && apt-get install -y python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and rebuild bcrypt for Linux
RUN npm install --build-from-source bcrypt

# Copy the rest of the application code
COPY . .

EXPOSE 5001

CMD ["node", "server.js"]
