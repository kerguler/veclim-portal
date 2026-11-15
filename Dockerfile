FROM node:20-alpine 

ARG REACT_APP_PORT

WORKDIR /veclim

COPY ./package*.json .
RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE ${REACT_APP_PORT}
CMD ["npm", "start"]
