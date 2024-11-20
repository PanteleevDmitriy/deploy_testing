# Этап сборки приложения
FROM node:alpine as build

WORKDIR /app  # Устанавливаем рабочую директорию для сборки
COPY package.json package-lock.json ./
RUN npm install

COPY . .  # Копируем оставшиеся файлы

RUN npm run build

# Этап выполнения
FROM node:alpine

WORKDIR /app  # Устанавливаем рабочую директорию для контейнера

# Копируем файлы из этапа сборки
COPY --from=build /app /app

# Устанавливаем pm2 для управления процессами
RUN npm install -g pm2

EXPOSE 3000

# Запускаем приложение
CMD ["pm2-runtime", "npm", "--", "run", "start"]
