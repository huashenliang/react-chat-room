# FROM node:11-alpine

# RUN mkdir /server

# WORKDIR /server

# COPY . .

# RUN npm install

# EXPOSE 5000

# CMD ["npm",  "start"]

# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4
# Set the working directory to /api
WORKDIR /api
# copy package.json into the container at /api
COPY package*.json /api/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . /api/
# Make port 80 available to the world outside this container
EXPOSE 80
# Run the app when the container launches
CMD ["npm", "start"]


FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

