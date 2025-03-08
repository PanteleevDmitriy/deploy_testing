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

# Функция проверки работоспособности бота через отправку тестового сообщения
check_bot() {
    TEST_MESSAGE="🛠️ Тестовая проверка бота..."
    RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${TELEGRAM_CHAT_ID}&text=${TEST_MESSAGE}")
    
    if echo "$RESPONSE" | grep -q '"ok":true'; then
        echo "✅ Бот успешно ответил!"
        return 0
    else
        echo "⚠️ Бот не отвечает! Перезапуск контейнеров..."
        return 1
    fi
}

# Счётчик сообщений
counter=1
bot_started=false

while true; do
    echo "🔍 Начало проверки контейнеров..."

    # Проверка переменных окружения перед каждым циклом
    if [[ -z "$BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" || -z "$BACKEND_CONTAINER" ]]; then
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
        bot_started=false
        counter=1
    else
        echo "✅ Контейнер $BACKEND_CONTAINER работает."
        
        # Проверка работоспособности бота через отправку тестового сообщения
        if check_bot; then
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
            echo "⚠️ Бот не отвечает! Перезапуск контейнеров..."
            send_telegram_message "⚠️ Бот недоступен. Перезапускаю контейнеры!"
            docker-compose down && docker-compose up -d
            bot_started=false
            counter=1
        fi
    fi

    echo "⏳ Ожидание 10 минут перед следующей проверкой..."
    sleep 600  # Проверяем раз в 10 минут (600 секунд)
done
