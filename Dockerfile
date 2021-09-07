FROM node:alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test

EXPOSE 9030

CMD [ "node", "index.js" ]