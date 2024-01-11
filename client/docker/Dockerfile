FROM node:18.12.1

WORKDIR /usr/src/app

COPY ../ ./

RUN npm i

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "serve" ]