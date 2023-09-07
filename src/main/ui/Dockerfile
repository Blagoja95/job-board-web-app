FROM node:latest

WORKDIR /usr/src/app

COPY public/ ./public
COPY src/ ./src
COPY package.json ./
COPY package-lock.json ./
COPY tailwind.config.js ./

RUN npm install

CMD ["npm", "start"]