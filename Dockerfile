# syntax=docker/dockerfile:1
FROM node:24-alpine
# Create app directory and copy package files
WORKDIR /app
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy the app source
COPY . .
# Just for testing
RUN echo "Creating a Docker image by Phu Phung"
# the command to execute the app
CMD [ "npm", "start" ]