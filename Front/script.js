// Генерируем уникальный идентификатор пользователя при первом посещении сайта
if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', generateUniqueId());
}

// Отображаем уникальный идентификатор пользователя
document.getElementById('uniqueId').innerText = localStorage.getItem('userId');

// Загружаем имя пользователя из Local Storage
var savedUsername = localStorage.getItem('username');
if (savedUsername) {
    document.getElementById('username').innerText = savedUsername;
}

// Загружаем количество монет из Local Storage
var savedCount = localStorage.getItem('userPoints');
if (savedCount) {
    document.getElementById('count').innerText = savedCount;
}

function generateUniqueId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

function changeUsername() {
    var newUsername = prompt("Введите новое имя пользователя:");
    if (newUsername !== null && newUsername !== "") {
        localStorage.setItem('username', newUsername);
        document.getElementById("username").innerText = newUsername;
    }
}

// Обработка клика на кнопке "Кликни меня!"
document.getElementById('clicker').addEventListener('click', function () {
    var currentCount = parseInt(document.getElementById('count').innerText);
    currentCount++;
    document.getElementById('count').innerText = currentCount;

    // Сохраняем прогресс пользователя
    localStorage.setItem('userPoints', currentCount.toString());
});
