FROM node:slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
Run cd /usr/src/app/
Run npm cache clean -f
Run npm install
Run node --version

# Bundle app source
COPY . /usr/src/app/

EXPOSE 4500
CMD [ "npm", "run", "dev" ]