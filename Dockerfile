# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Rebuild bcrypt for the correct environment
RUN npm rebuild bcrypt --build-from-source

# Expose the port your app runs on
EXPOSE 5003

# Command to run your app
CMD ["npm", "run", "dev"]
