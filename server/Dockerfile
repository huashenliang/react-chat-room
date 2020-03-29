FROM node:11-alpine

RUN mkdir /server

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm",  "start"]




# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 5000
# CMD ["nginx", "-g", "daemon off;"]