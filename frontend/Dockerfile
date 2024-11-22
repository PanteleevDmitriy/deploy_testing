# Этап сборки приложения
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Копируем оставшиеся файлы
COPY . .  

RUN npm run build

# Этап выполнения
FROM node:alpine

WORKDIR /app

# Копируем только необходимые файлы
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/package.json /app/package-lock.json /app/
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules

# Устанавливаем pm2 для управления процессами
RUN npm install -g pm2

EXPOSE 3000

# Запускаем приложение
CMD ["pm2-runtime", "npm", "--", "run", "start"]
