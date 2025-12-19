#!/bin/bash
# ============================================
# 🎯 ИСПРАВЛЕННЫЙ ОПТИМИЗАТОР ДЛЯ GIT
# Не удаляет JPG, создает копии для изменений
# ============================================

DEVICE_SIZES=(640 750 828 1080 1200)
JPG_QUALITY=75
WEBP_QUALITY=50
TEMP_FILE=$(mktemp)

echo "🔄 Оптимизация изображений для seawindtravel.ru"
echo "📏 Максимальный размер: 1200px"

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

# Сохраняем список файлов
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -name "*.webp" > "$TEMP_FILE"
TOTAL_FILES=$(wc -l < "$TEMP_FILE")

echo "📊 Файлов для обработки: $TOTAL_FILES"
echo "ℹ️  JPG не будут удаляться, только оптимизированы"
echo ""

PROCESSED=0
DELETED=0
ERRORS=0
JPG_OPTIMIZED=0
WEBP_CREATED=0

# Основной цикл
while IFS= read -r FILE; do
    DIR=$(dirname "$FILE")
    BASE=$(basename "$FILE")
    NAME="${BASE%.*}"
    EXT="${BASE##*.}"
    EXT_LOWER=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')
    
    echo "📸 $BASE"
    
    # Для JPG файлов создаем временную копию перед изменением
    TEMP_JPG=""
    if [ "$EXT_LOWER" = "jpg" ] || [ "$EXT_LOWER" = "jpeg" ]; then
        TEMP_JPG="${FILE}.tmp"
        cp "$FILE" "$TEMP_JPG" 2>/dev/null
        WORK_FILE="$TEMP_JPG"
    else
        WORK_FILE="$FILE"
    fi
    
    # Получаем ширину
    WIDTH=$(sips -g pixelWidth "$WORK_FILE" 2>/dev/null | tail -1 | awk '{print $2}')
    if [ -z "$WIDTH" ] || ! [[ "$WIDTH" =~ ^[0-9]+$ ]]; then
        echo "  ⚠️  Не удалось определить ширину, использую 1200px"
        WIDTH=1200
    fi
    
    # Целевой размер
    TARGET=$(find_target_size "$WIDTH")
    
    # Итоговый JPG файл
    FINAL_JPG="$DIR/${NAME}.jpg"
    
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
            
        jpeg)
            # Конвертируем .jpeg в .jpg
            if sips -s format jpeg -s formatOptions $JPG_QUALITY "$FILE" --out "$FINAL_JPG" 2>/dev/null; then
                echo "  ✅ JPEG → JPG (${JPG_QUALITY}%)"
                NEEDS_DELETION=true
            else
                echo "  ❌ Ошибка конвертации JPEG"
                SUCCESS=false
            fi
            ;;
            
        jpg)
            # Оптимизируем существующий JPG
            FINAL_JPG="$FILE"
            if [ -n "$TEMP_JPG" ]; then
                WORK_FILE="$TEMP_JPG"
            fi
            # Оптимизируем только качество (размер изменим отдельно)
            sips -s formatOptions $JPG_QUALITY "$WORK_FILE" 2>/dev/null
            echo "  ✅ JPG оптимизирован (${JPG_QUALITY}%)"
            JPG_OPTIMIZED=$((JPG_OPTIMIZED + 1))
            NEEDS_DELETION=false
            ;;
    esac
    
    # Если конвертация успешна
    if [ "$SUCCESS" = true ] && ([ -f "$FINAL_JPG" ] || [ -f "$WORK_FILE" ]); then
        # 2. ИЗМЕНЕНИЕ РАЗМЕРА
        if [ "$WIDTH" -gt "$TARGET" ]; then
            echo "  📐 ${WIDTH}px → ${TARGET}px"
            if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ]; then
                sips --resampleWidth "$TARGET" "$TEMP_JPG" 2>/dev/null
                # Копируем обратно
                mv "$TEMP_JPG" "$FINAL_JPG" 2>/dev/null
            elif [ -f "$FINAL_JPG" ]; then
                sips --resampleWidth "$TARGET" "$FINAL_JPG" 2>/dev/null
            fi
        else
            echo "  ✅ ${WIDTH}px (оставляю как есть)"
        fi
        
        # 3. СОЗДАНИЕ WEBP
        WEBP_FILE="$DIR/${NAME}.webp"
        if command -v cwebp &>/dev/null; then
            # Используем FINAL_JPG если он есть, иначе оригинальный файл
            SOURCE_FOR_WEBP="$FINAL_JPG"
            if [ ! -f "$SOURCE_FOR_WEBP" ] && [ -f "$WORK_FILE" ]; then
                SOURCE_FOR_WEBP="$WORK_FILE"
            fi
            
            if [ -f "$SOURCE_FOR_WEBP" ]; then
                if cwebp -q $WEBP_QUALITY "$SOURCE_FOR_WEBP" -o "$WEBP_FILE" 2>/dev/null; then
                    echo "  ✅ WebP создан (${WEBP_QUALITY}%)"
                    WEBP_CREATED=$((WEBP_CREATED + 1))
                else
                    echo "  ⚠️  WebP не создан (cwebp ошибка)"
                fi
            fi
        else
            echo "  ⚠️  cwebp не установлен, пропускаю создание WebP"
        fi
        
        # 4. УДАЛЕНИЕ ОРИГИНАЛА (только PNG и JPEG, не JPG!)
        if [ "$NEEDS_DELETION" = true ] && [ -f "$FILE" ] && [ "$FILE" != "$FINAL_JPG" ]; then
            if rm "$FILE" 2>/dev/null; then
                echo "  🗑️  Оригинал удалён"
                DELETED=$((DELETED + 1))
            else
                echo "  ⚠️  Не удалось удалить оригинал"
            fi
        fi
        
        # 5. Очистка временных файлов
        if [ -n "$TEMP_JPG" ] && [ -f "$TEMP_JPG" ]; then
            rm "$TEMP_JPG" 2>/dev/null
        fi
        
        PROCESSED=$((PROCESSED + 1))
    else
        echo "  ❌ Ошибка: файл не создан"
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
echo "   🔧 JPG оптимизированы: $JPG_OPTIMIZED"
echo "   🌐 WebP создано: $WEBP_CREATED"
echo "   🗑️  Удалено оригиналов: $DELETED (только PNG/JPEG)"
echo "   ❌ Ошибок: $ERRORS"
echo ""
echo "📁 СОХРАНЕНО В GIT:"
echo "   • Все JPG файлы (изменены на месте)"
echo "   • Все WebP файлы (добавлены новые)"
echo "   • PNG/JPEG удалены (заменены на JPG)"
echo ""
echo "🚀 Готово для Next.js с конфигом:"
echo "   deviceSizes: [640, 750, 828, 1080, 1200]"
echo "   minimumCacheTTL: 31536000"
echo ""
echo "💡 Совет для Git:"
echo "   git add ."
echo "   git commit -m 'Оптимизация изображений: $JPG_OPTIMIZED JPG, $WEBP_CREATED WebP'"
echo "========================================"