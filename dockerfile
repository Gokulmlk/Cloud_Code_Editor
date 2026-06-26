FROM node:20-elpine 
COPY ./backend .
RUN npm install
CMD ["node", "server.js"]