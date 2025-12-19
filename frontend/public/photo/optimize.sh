#!/bin/bash
# ============================================
# 🎯 ОПТИМИЗАТОР С ПРИВЕДЕНИЕМ К .jpg В НИЖНЕМ РЕГИСТРЕ
# Все файлы: .JPG, .JPEG, .jpeg → .jpg
# ============================================

DEVICE_SIZES=(640 750 828 1080 1200)
JPG_QUALITY=75
WEBP_QUALITY=50
TEMP_FILE=$(mktemp)

echo "🔄 Оптимизация изображений для seawindtravel.ru"
echo "📏 Максимальный размер: 1200px"
echo "🔄 Все расширения приводятся к .jpg (нижний регистр)"

# Функция: найти ближайший меньший или равный размер
find_target_size() {
    local width=$1
    
    if [ "$width" -gt 1200 ]; then
        echo "1200"
        return
    fi
    
    local target=640
    
    for size in "${DEVICE_SIZES[@]}"; do
        if [ "$width" -ge "$size" ]; then
            target="$size"
        else
            break
        fi
    done
    
    echo "$target"
}

# Функция для uppercase (совместимость с bash 3.2)
to_upper() {
    echo "$1" | tr '[:lower:]' '[:upper:]'
}

# Сохраняем список файлов
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -name "*.webp" > "$TEMP_FILE"
TOTAL_FILES=$(wc -l < "$TEMP_FILE")

echo "📊 Файлов для обработки: $TOTAL_FILES"
echo "ℹ️  Все файлы будут переименованы в .jpg (нижний регистр)"
echo ""

PROCESSED=0
DELETED=0
ERRORS=0
JPG_OPTIMIZED=0
WEBP_CREATED=0
RENAMED=0

# Основной цикл
while IFS= read -r FILE; do
    DIR=$(dirname "$FILE")
    BASE=$(basename "$FILE")
    NAME="${BASE%.*}"
    EXT="${BASE##*.}"
    EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')
    
    echo "📸 $BASE"
    
    # Определяем итоговое имя файла (всегда .jpg в нижнем регистре)
    FINAL_JPG="$DIR/${NAME}.jpg"
    
    # Если имя файла уже в правильном формате и не менялось
    if [ "$EXT" = "jpg" ] && [ "$FILE" = "$FINAL_JPG" ]; then
        # Файл уже в правильном формате, работаем с ним напрямую
        WORK_FILE="$FILE"
        TEMP_JPG=""
        echo "  ✅ Уже в формате .jpg"
    else
        # Нужно переименовать/конвертировать
        WORK_FILE="$FINAL_JPG"
        TEMP_JPG="${FINAL_JPG}.tmp"
        
        # Создаем временную копию для работы
        if ! cp "$FILE" "$TEMP_JPG" 2>/dev/null; then
            echo "  ❌ Не удалось создать временную копию"
            ERRORS=$((ERRORS + 1))
            echo ""
            continue
        fi
        
        echo "  🔄 $EXT → .jpg"
        RENAMED=$((RENAMED + 1))
    fi
    
    # Получаем ширину из рабочего файла
    if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ]; then
        WIDTH_FILE="$TEMP_JPG"
    else
        WIDTH_FILE="$WORK_FILE"
    fi
    
    WIDTH=$(sips -g pixelWidth "$WIDTH_FILE" 2>/dev/null | tail -1 | awk '{print $2}')
    if [ -z "$WIDTH" ] || ! [[ "$WIDTH" =~ ^[0-9]+$ ]]; then
        echo "  ⚠️  Не удалось определить ширину, использую 1200px"
        WIDTH=1200
    fi
    
    # Целевой размер
    TARGET=$(find_target_size "$WIDTH")
    
    SUCCESS=true
    NEEDS_DELETION=false
    
    # 1. ОБРАБОТКА РАЗНЫХ ФОРМАТОВ
    case "$EXT_LOWER" in
        png)
            if sips -s format jpeg -s formatOptions $JPG_QUALITY "$FILE" --out "$FINAL_JPG" 2>/dev/null; then
                echo "  ✅ PNG → JPG (${JPG_QUALITY}%)"
                NEEDS_DELETION=true
            else
                echo "  ❌ Ошибка конвертации PNG"
                SUCCESS=false
            fi
            ;;
            
        jpeg|jpg)
            # Все JPG/JPEG приводятся к .jpg
            if [ "$FILE" != "$FINAL_JPG" ]; then
                # Если это .jpeg или .JPG → конвертируем в .jpg
                EXT_UPPER=$(to_upper "$EXT")
                if sips -s format jpeg -s formatOptions $JPG_QUALITY "$FILE" --out "$FINAL_JPG" 2>/dev/null; then
                    echo "  ✅ $EXT_UPPER → .jpg (${JPG_QUALITY}%)"
                    NEEDS_DELETION=true
                else
                    echo "  ❌ Ошибка конвертации $EXT"
                    SUCCESS=false
                fi
            else
                # Уже .jpg, оптимизируем на месте
                if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ]; then
                    # Работаем с временной копией
                    sips -s formatOptions $JPG_QUALITY "$TEMP_JPG" 2>/dev/null
                else
                    # Работаем напрямую
                    sips -s formatOptions $JPG_QUALITY "$FINAL_JPG" 2>/dev/null
                fi
                echo "  ✅ JPG оптимизирован (${JPG_QUALITY}%)"
                JPG_OPTIMIZED=$((JPG_OPTIMIZED + 1))
                NEEDS_DELETION=false
            fi
            ;;
    esac
    
    # Если конвертация успешна
    if [ "$SUCCESS" = true ]; then
        # Определяем файл для дальнейшей обработки
        if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ]; then
            PROCESS_FILE="$TEMP_JPG"
        elif [ -f "$FINAL_JPG" ]; then
            PROCESS_FILE="$FINAL_JPG"
        else
            PROCESS_FILE="$FILE"
        fi
        
        # 2. ИЗМЕНЕНИЕ РАЗМЕРА (если нужно)
        if [ "$WIDTH" -gt "$TARGET" ]; then
            echo "  📐 ${WIDTH}px → ${TARGET}px"
            if [ -f "$PROCESS_FILE" ]; then
                sips --resampleWidth "$TARGET" "$PROCESS_FILE" 2>/dev/null
            fi
        else
            echo "  ✅ ${WIDTH}px (оставляю как есть)"
        fi
        
        # 3. СОЗДАНИЕ WEBP
        WEBP_FILE="$DIR/${NAME}.webp"
        if command -v cwebp &>/dev/null; then
            # Используем PROCESS_FILE для создания WebP
            if [ -f "$PROCESS_FILE" ]; then
                if cwebp -q $WEBP_QUALITY "$PROCESS_FILE" -o "$WEBP_FILE" 2>/dev/null; then
                    echo "  ✅ WebP создан (${WEBP_QUALITY}%)"
                    WEBP_CREATED=$((WEBP_CREATED + 1))
                else
                    echo "  ⚠️  WebP не создан (cwebp ошибка)"
                fi
            fi
        else
            echo "  ⚠️  cwebp не установлен, пропускаю создание WebP"
        fi
        
        # 4. УДАЛЕНИЕ ОРИГИНАЛА (если это не тот же файл)
        if [ "$NEEDS_DELETION" = true ] && [ -f "$FILE" ] && [ "$FILE" != "$FINAL_JPG" ]; then
            if rm "$FILE" 2>/dev/null; then
                echo "  🗑️  Оригинал удалён"
                DELETED=$((DELETED + 1))
            else
                echo "  ⚠️  Не удалось удалить оригинал"
            fi
        fi
        
        # 5. Если работали с временным файлом - перемещаем его на место
        if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ] && [ "$TEMP_JPG" != "$FINAL_JPG" ]; then
            mv "$TEMP_JPG" "$FINAL_JPG" 2>/dev/null
        fi
        
        # 6. Очистка временных файлов
        if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ] && [ "$TEMP_JPG" != "$FINAL_JPG" ]; then
            rm "$TEMP_JPG" 2>/dev/null
        fi
        
        PROCESSED=$((PROCESSED + 1))
    else
        echo "  ❌ Ошибка обработки"
        ERRORS=$((ERRORS + 1))
        # Очистка временных файлов при ошибке
        if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ]; then
            rm "$TEMP_JPG" 2>/dev/null
        fi
    fi
    
    echo ""
    
done < "$TEMP_FILE"

rm "$TEMP_FILE"

echo "========================================"
echo "🎉 ОПТИМИЗАЦИЯ ЗАВЕРШЕНА"
echo "========================================"
echo ""
echo "📊 РЕЗУЛЬТАТЫ:"
echo "   ✅ Обработано: $PROCESSED файлов"
echo "   🔄 Переименовано в .jpg: $RENAMED"
echo "   🔧 JPG оптимизированы: $JPG_OPTIMIZED"
echo "   🌐 WebP создано: $WEBP_CREATED"
echo "   🗑️  Удалено оригиналов: $DELETED (PNG/JPEG/JPG)"
echo "   ❌ Ошибок: $ERRORS"
echo ""
echo "📁 ВСЕ ФАЙЛЫ ТЕПЕРЬ В ФОРМАТЕ:"
echo "   • Все изображения: имя.jpg (нижний регистр)"
echo "   • WebP версии: имя.webp"
echo ""
echo "🔍 Проверка форматов:"
echo "   find . -name \"*.JPG\" -o -name \"*.JPEG\" -o -name \"*.jpeg\""
echo ""
echo "🚀 Готово для Next.js с конфигом:"
echo "   deviceSizes: [640, 750, 828, 1080, 1200]"
echo "   minimumCacheTTL: 31536000"
echo ""
echo "💡 Для проверки:"
echo "   # Проверить остались ли файлы не в .jpg"
echo "   find . -type f \\( -iname \"*.JPG\" -o -iname \"*.JPEG\" -o -iname \"*.jpeg\" \\)"
echo "========================================"