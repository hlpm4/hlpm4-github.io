function formatText(inputText) {
    // Месяцы в русском формате
    const months = {
        '01': 'января', '02': 'февраля', '03': 'марта', '04': 'апреля',
        '05': 'мая', '06': 'июня', '07': 'июля', '08': 'августа',
        '09': 'сентября', '10': 'октября', '11': 'ноября', '12': 'декабря'
    };

    // Разбиваем текст на строки
    let lines = inputText.split('\n');
    let formattedLines = [];

    // Функция для форматирования даты
    function formatDate(dateString) {
        let [year, month, day] = dateString.split('-');
        let monthName = months[month];
        return `${parseInt(day, 10)} ${monthName} ${year} —`;
    }

    // Обрабатываем каждую строку
    lines.forEach(line => {
        if (line.trim() === "") {
            formattedLines.push(line); // сохраняем пустые строки
            return;
        }

        let parts = line.split(/\s+/);
        if (parts.length < 4) {
            formattedLines.push(line); // сохраняем строки с менее чем 4 частями
            return;
        }

        let [date, leftValue, _, rightValue] = parts;
        let [year, month, day] = date.split('-');
        let formattedDate = formatDate(date);

        if (leftValue === '0.00') {
            rightValue = rightValue.replace(/\.?0+₽?$/, ''); // удаляем нули и символы рубля в конце
            formattedLines.push(`${formattedDate} ${rightValue} ₽ внесён`);
        } else {
            leftValue = leftValue.replace(/\.?0+₽?$/, ''); // удаляем нули и символы рубля в конце
            formattedLines.push(`${formattedDate} ${leftValue} ₽`);
        }
    });

    return formattedLines.join('\n');
}

// Пример использования функции
document.addEventListener('DOMContentLoaded', function() {
    const formatButton = document.getElementById('formatButton');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    formatButton.addEventListener('click', function() {
        const input = inputText.value;
        const formattedText = formatText(input);
        outputText.textContent = formattedText;
    });
});
