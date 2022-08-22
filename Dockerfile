FROM node:18.7.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY . /app

RUN yarn install

CMD ["npm", "run", "start"]
