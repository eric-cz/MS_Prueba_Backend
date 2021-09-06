FROM node:alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9030

CMD [ "node", "index.js" ]