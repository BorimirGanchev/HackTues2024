FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ENV JWT_SECRET="your_secret" \
    MONGO_URI="mongodb+srv://KURO:KURO@task-manager.8d8g6sk.mongodb.net/GYM?retryWrites=true&w=majority"


EXPOSE 8080

CMD ["npm", "run", "start_ts_dev"]
