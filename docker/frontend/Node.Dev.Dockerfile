FROM node:latest

LABEL maintainer="Boris Blagojević <boris.blagojevicc@hotmail.com>"

WORKDIR /app

COPY ./app/web/package*.json ./
COPY ./app/web/tailwind.config.js ./

RUN npm install

COPY ./app/web ./

CMD ["npm", "start"]