FROM node:20-alpine

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "start"]