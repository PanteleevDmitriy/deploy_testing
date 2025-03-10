#!/bin/bash

# Загружаем переменные из .env
export $(grep -v '^#' .env | xargs)

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

while true; do
    echo "🔍 Начало проверки бота..."

    # Проверка переменных окружения перед каждым циклом
    if [[ -z "$BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" ]]; then
        echo "❌ Ошибка: одна из переменных окружения не загружена!"
        send_telegram_message "❌ Ошибка: переменные окружения не загружены. Проверь .env!"
        exit 1
    fi

    echo "✅ Переменные из окружения загружены"

    # Проверка работоспособности бота
    if check_bot; then
        echo "📩 Сообщение №$counter | Бот работает!"
        send_telegram_message "📩 Сообщение №$counter | Бот работает!"
        ((counter++))
    else
        echo "⚠️ Бот не отвечает! Перезапуск контейнеров..."
        send_telegram_message "⚠️ Бот недоступен. Перезапускаю контейнеры!"
        
        docker-compose down
        
        # Задержка в 10 секунд перед запуском
        echo "⏳ Ожидание 10 секунд перед запуском контейнеров..."
        sleep 10  
        
        docker-compose up -d
        counter=1
    fi

    echo "⏳ Ожидание 10 минут перед следующей проверкой..."
    sleep 600  # Проверяем раз в 10 минут (600 секунд)
done
