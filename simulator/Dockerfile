FROM node:8.11.1

WORKDIR ./

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@1.1.1 -g

COPY . .
# start app
CMD ["npm", "start"]
