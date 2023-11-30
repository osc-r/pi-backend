FROM node:18-alpine AS builder

WORKDIR /server
COPY . .
RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]