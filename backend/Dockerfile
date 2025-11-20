FROM node:20-alpine3.18

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]