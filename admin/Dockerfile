FROM node:18-slim

WORKDIR /app

COPY package*.json ./

ENV NPM_CONFIG_OPTIONAL=true

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]