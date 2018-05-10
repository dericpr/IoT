FROM node:8.11.1-alpine

WORKDIR ./

COPY package*.json ./

# install and cache app dependencies
RUN npm install

COPY . .
EXPOSE 4000

CMD ["npm", "start"]
