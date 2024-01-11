FROM node:18.12.1

WORKDIR /usr/src/app

COPY ../ ./

RUN npm i

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]