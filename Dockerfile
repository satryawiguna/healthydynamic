FROM node:16.14.0-alpine3.15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install --silent

COPY . /usr/src/app

EXPOSE 8669

CMD ["npm", "start"]