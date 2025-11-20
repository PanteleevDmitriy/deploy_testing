# Этап сборки приложения
FROM node:20-alpine3.18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Копируем оставшиеся файлы
COPY . .
RUN npm run build

# Этап выполнения
FROM node:20-alpine3.18

WORKDIR /app

# Копируем файлы
COPY --from=build /app ./

# Устанавливаем pm2 для управления процессами
RUN npm install -g pm2

# Запускаем приложение
CMD ["pm2-runtime", "npm", "--", "run", "start"]
