FROM node:8-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node
RUN npm update && npm install -g nodemon create-react-app yarn

ENV NODE_ENV=production
ENV HOME=/home/node

WORKDIR $HOME/app