FROM node:16-alpine3.14

WORKDIR /app

COPY /package*.json /app/

RUN npm install --save

COPY . .

EXPOSE 7000

CMD ["npm","start"]