# Stage 1: Compile TypeScript into JavaScript
FROM node:20 AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# RUN ls -la # List directory, stage 1
CMD [ "ls", "-la"] # Run the ls command, stage 1
RUN npm run compile-ts # Use the compile-ts script to compile TypeScript
RUN ls -la  # List directory, stage 1 


# Stage 2: Setup the final image with only the compiled JavaScript and necessary runtime dependencies
FROM node:20 AS setup-final-image
WORKDIR /usr/src/app
# RUN ls -la # List directory, stage 2
RUN pwd # Print working directory, stage 2
COPY --from=build-stage /usr/src/app/dist ./dist
RUN ls -la # List directory after copy, stage 2
COPY package*.json ./
RUN npm install --only=production # Install only production dependencies
EXPOSE 3000
# RUN ls -la # List contents, stage 2 
CMD [ "ls", "-la"] # Run the ls command, stage 2
CMD ["node", "dist/index.js"] # Run the compiled app







# # Use an official Node runtime as a parent image
# FROM node:20

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (or yarn.lock)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Bundle app source inside the Docker image
# COPY . .

# # Your app binds to port 3000, so use the EXPOSE instruction
# EXPOSE 3000

# # Define the command to run your app
# CMD [ "node", "app.js" ]
