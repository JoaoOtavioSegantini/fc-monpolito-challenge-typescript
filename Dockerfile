FROM node:19.8.1-alpine

COPY ./.docker/entrypoint.sh /docker-entrypoint.sh

WORKDIR /node/app

RUN mkdir -p /node/app/node_modules

RUN chown -R node:node /node/app/node_modules

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]

