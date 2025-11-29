import React, { useState, useCallback } from 'react';

/**
 * Компонент текстового поля только для чтения с кнопкой "Скопировать".
 * Управляется полностью из родительского компонента через пропс 'value'.
 */
const ReadOnlyClipboardInput = ({ caption, value }) => {
    // Состояние для отображения сообщения о статусе копирования
    const default_ico = 'copy'
    const [copyStatus, setCopyStatus] = useState(default_ico);

    // Функция для копирования текста в буфер обмена
    const handleCopy = useCallback(async () => {
        try {
            // Используем переданное значение из пропсов
            await navigator.clipboard.writeText(value);
            setCopyStatus('ok');
        } catch (err) {
            setCopyStatus('error');
            console.error('❌ Ошибка копирования. Проверьте права доступа.', err);
        }

        // Сброс сообщения через 2 секунды
        setTimeout(() => {
            setCopyStatus(default_ico);
        }, 2000);
    }, [value]); // Зависит только от 'value'

    return (
        <div className='flex_row_left_center'>
            {caption}
            <input type="text" value={value} readOnly />

            <button onClick={handleCopy}  >
                <img src={`./btn/${copyStatus}.svg`} width={16} height={16} alt="" />
            </button>

        </div>
    );
};

export default ReadOnlyClipboardInput;