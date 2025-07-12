# Use an official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only necessary files
COPY package*.json ./
COPY server.js .
COPY products.json ./

# Install dependencies
RUN npm install

# Expose the port your Express server uses
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
