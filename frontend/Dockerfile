# Этап сборки приложения
FROM node:alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Этап с Nginx
FROM nginx:stable-alpine

# Копируем статические файлы из сборки
COPY --from=build /app/.next /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем стандартный порт для Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]