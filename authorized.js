document.addEventListener("DOMContentLoaded", function() {
    loadUserData();
    
    // Добавляем обработчик события для кнопки выхода
    document.getElementById("logout-button").addEventListener("click", function() {
        // Удаляем информацию о пользователе из localStorage
        localStorage.removeItem("username");
        // Перенаправляем пользователя на страницу входа
        window.location.href = "index.html";
    });

    // Добавляем обработчик события для кнопки сохранить
    document.getElementById("save-button").addEventListener("click", function() {
        const coinCounter = localStorage.getItem("coinCounter");
        const username = localStorage.getItem("username");

        // Проверяем, есть ли данные для сохранения
        if (!coinCounter || !username) {
            console.error('Ошибка: нет данных для сохранения');
            return;
        }

        // Отправляем запрос на обновление данных пользователя
        fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/search?username=${username}`)
            .then(response => response.json())
            .then(data => {
                const currentUser = data.find(user => user.username === username);

                // Проверяем, найден ли пользователь
                if (currentUser) {
                    fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/username/${currentUser.username}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: {
                                coins: coinCounter // Обновляем значение монет
                            }
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log("Значение монет обновлено для пользователя:", username);
                            alert('Данные успешно сохранены!');
                        } else {
                            console.error("Ошибка при обновлении значения монет:", response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('Ошибка при обновлении значения монет:', error);
                    });
                } else {
                    console.error('Пользователь не найден в таблице');
                }
            })
            .catch(error => {
                console.error('Ошибка при поиске пользователя в таблице:', error);
            });
    });

    // Добавляем обработчик события для кнопки "Кликни меня"
    document.getElementById("clicker").addEventListener("click", function() {
        let coinCounter = localStorage.getItem("coinCounter");

        // Проверяем, есть ли счетчик монет в локальном хранилище
        if (!coinCounter) {
            coinCounter = 0;
        }

        // Увеличиваем значение счетчика монет на 10
        coinCounter = parseInt(coinCounter) + 10;

        // Обновляем значение счетчика монет в локальном хранилище
        localStorage.setItem("coinCounter", coinCounter);

        // Обновляем отображение счетчика монет на странице
        document.getElementById("coin-counter").textContent = coinCounter;
    });
});

// Функция для загрузки данных о пользователе и отображения их на странице
function loadUserData() {
    fetch('https://sheetdb.io/api/v1/5o5c5w3gv1h44')
        .then(response => response.json())
        .then(data => {
            const userInfoElement = document.getElementById("user-info");
            userInfoElement.innerHTML = ""; // Очистить содержимое элемента

            const lastUser = data[data.length - 1];

            if (lastUser) {
                const username = lastUser.username;
                // Сохраняем имя пользователя в localStorage
                localStorage.setItem("username", username);
                userInfoElement.innerHTML += `<p>Привет, ${username}!</p>`;
                // Здесь можно добавить код для отображения других данных пользователя

                // Загружаем количество монет из таблицы Google Sheets
                const coinCounter = lastUser.coins || 0;
                // Сохраняем количество монет в локальном хранилище
                localStorage.setItem("coinCounter", coinCounter);
                // Отображаем количество монет на странице
                document.getElementById("coin-counter").textContent = coinCounter;
            } else {
                userInfoElement.innerHTML += `<p>Добро пожаловать!</p>`;
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
