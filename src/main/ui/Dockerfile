FROM node:latest

LABEL maintainer="Boris Blagojević <boris.blagojevicc@hotmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY tailwind.config.js ./

RUN npm install nodemon --save-dev

COPY . ./

CMD ["nodemon", "--exec", "npm", "start"]