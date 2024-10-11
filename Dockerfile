FROM node:16-alpine 

ARG REACT_APP_PORT

WORKDIR /veclim

COPY ./package*.json .
RUN yarn install

COPY . .

EXPOSE ${REACT_APP_PORT}
CMD ["yarn", "start"]
