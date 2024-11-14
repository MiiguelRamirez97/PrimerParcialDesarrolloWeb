FROM node:22
WORKDIR /myapp
COPY src/package*.json .
RUN npm install
COPY  src/ ./
CMD [ "node", "app.js"]