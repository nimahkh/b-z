FROM node:20 as build

# Set the working directory in the container
WORKDIR /usr/src/frontend/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Expose port 80 to the outside once the container has launched
EXPOSE 5177

CMD ["npm", "run", "dev"]
