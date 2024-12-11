#Use a lightweight Node.js base image
FROM node:18-alpine

#Set the working directory inside the container
WORKDIR /app

#Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY . ./

#Install production dependencies
RUN npm install

# Construire l'application
RUN npm run build

#Copy the rest of the application source code
COPY . .

#Expose the application port
EXPOSE 3000

#Define the command to run your app
CMD ["npm", "start"]
