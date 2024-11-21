# Этап сборки приложения
FROM node:alpine AS build

COPY package.json package-lock.json ./
RUN npm install

# Копируем оставшиеся файлы
COPY . .  

RUN npm run build

# Этап выполнения
FROM node:alpine

# Копируем файлы из этапа сборки
# COPY --from=build . .

# Копирование собранного проекта
COPY --from=build /.next ./.next
COPY --from=build /public ./public
COPY --from=build /package*.json ./

# Устанавливаем pm2 для управления процессами
RUN npm install -g pm2

EXPOSE 3000

# Запускаем приложение
CMD ["pm2-runtime", "npm", "--", "run", "start"]
