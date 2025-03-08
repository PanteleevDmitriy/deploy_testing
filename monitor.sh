#!/bin/bash

# Загружаем переменные из .env
export $(grep -v '^#' .env | xargs)

# Проверка загрузки переменных
echo "🔍 DEBUG: Проверка загруженных переменных окружения..."
echo "   - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}"
echo "   - BACKEND_CONTAINER=${BACKEND_CONTAINER}"
echo "   - TELEGRAM_BOT_URL=${TELEGRAM_BOT_URL}"
echo "   - BOT_TOKEN=${BOT_TOKEN}"
echo "-----------------------------------------"

# Функция отправки уведомления в Telegram
send_telegram_message() {
    MESSAGE=$1
    echo "📨 Отправка сообщения в Telegram: \"$MESSAGE\""
    curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_CHAT_ID}&text=${MESSAGE}" > /dev/null
}

# Счётчик сообщений
counter=1
bot_started=false

while true; do
    echo "🔍 Начало проверки контейнеров..."

    # Проверка переменных окружения перед каждым циклом
    if [[ -z "$BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" || -z "$TELEGRAM_BOT_URL" || -z "$BACKEND_CONTAINER" ]]; then
        echo "❌ Ошибка: одна из переменных окружения не загружена!"
        send_telegram_message "❌ Ошибка: переменные окружения не загружены. Проверь .env!"
        exit 1
    fi

    # Проверка, запущен ли backend-контейнер
    echo "🔄 Проверка состояния контейнера $BACKEND_CONTAINER..."
    if ! docker ps --format '{{.Names}}' | grep -q "^${BACKEND_CONTAINER}$"; then
        echo "⚠️  Backend-контейнер $BACKEND_CONTAINER не работает! Перезапуск..."
        send_telegram_message "⚠️ Backend-контейнер не работает. Перезапускаю!"
        docker-compose down && docker-compose up -d
    else
        echo "✅ Контейнер $BACKEND_CONTAINER работает."
    fi

    # Проверка доступности Telegram-бота
    echo "🔄 Проверка ответа от Telegram-бота..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TELEGRAM_BOT_URL}")

    echo "ℹ️  HTTP-код ответа: $HTTP_CODE"

    if [[ "$HTTP_CODE" == "200" ]]; then
        if [ "$bot_started" = false ]; then
            echo "✅ Бот успешно запущен!"
            send_telegram_message "✅ Бот успешно запущен!"
            bot_started=true
        else
            echo "📩 Сообщение №$counter | Бот работает!"
            send_telegram_message "📩 Сообщение №$counter | Бот работает!"
            ((counter++))
        fi
    else
        echo "⚠️  Telegram-бот не отвечает (код $HTTP_CODE)! Перезапуск..."
        send_telegram_message "⚠️ Бот недоступен (код $HTTP_CODE). Перезапускаю контейнеры!"
        docker-compose down && docker-compose up -d
        bot_started=false
        counter=1
    fi

    echo "⏳ Ожидание 10 минут перед следующей проверкой..."
    sleep 600  # Проверяем раз в 10 минут (600 секунд)
done
