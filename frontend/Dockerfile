# Этап сборки приложения
FROM node:alpine as build

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

# Копируем файлы с этапа сборки
COPY --from=build /app /app

# Устанавливаем pm2 для управления процессами
RUN npm install -g pm2

EXPOSE 3000

# Запускаем приложение
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]