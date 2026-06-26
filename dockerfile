FROM node:20-alpine as Frontend-file

COPY ./frontend app
WORKDIR /app
RUN npm install
RUN npm run build

FROM node:20-alpine 

COPY ./backend app
WORKDIR /app
RUN npm install

COPY --from=Frontend-file /app/dist /app/public

CMD ["node", "server.js"]


