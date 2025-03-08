#!/bin/bash
# Загружаем переменные из .env
export $(grep -v '^#' .env | xargs)

# Функция отправки уведомления в Telegram
send_telegram_message() {
    MESSAGE=$1
    curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_CHAT_ID}&text=${MESSAGE}" > /dev/null
}

# Счётчик сообщений
counter=1
bot_started=false

while true; do
    echo "🔍 Проверка состояния контейнеров..."

    # Проверка, работает ли backend
    if ! docker ps --format '{{.Names}}' | grep -q "${BACKEND_CONTAINER}"; then
        echo "⚠️  Backend упал! Перезапускаю весь стек..."
        send_telegram_message "⚠️ Внимание! Backend упал. Перезапускаю все контейнеры!"
        docker-compose down && docker-compose up -d
    fi

    # Проверка, отвечает ли Telegram-бот
    if curl -s -o /dev/null -w "%{http_code}" "${TELEGRAM_BOT_URL}" | grep -q "200"; then
        if [ "$bot_started" = false ]; then
            echo "✅ Старт бота"
            send_telegram_message "✅ Старт бота"
            bot_started=true
        else
            echo "📩 Сообщение №$counter | бот работает!"
            send_telegram_message "📩 Сообщение №$counter | бот работает!"
            ((counter++))
        fi
    else
        echo "⚠️  Telegram-бот не отвечает! Перезапускаю весь стек..."
        send_telegram_message "⚠️ Внимание! Telegram-бот не отвечает. Перезапускаю все контейнеры!"
        docker-compose down && docker-compose up -d
        bot_started=false
        counter=1
    fi

    sleep 600  # Проверяем раз в 10 минут (600 секунд)
done
