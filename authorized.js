document.addEventListener("DOMContentLoaded", function() {
    // Извлекаем имя пользователя из параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    // Если имя пользователя получено из параметров URL, загружаем данные этого пользователя
    if (username) {
        loadUserData(username);
    } else {
        // Если имя пользователя не получено из параметров URL, выводим сообщение об ошибке
        showMessage("Ошибка: имя пользователя не найдено в параметрах URL");
    }

    // Добавляем обработчик события для кнопки выхода
    document.getElementById("logout-button").addEventListener("click", function() {
        // Перенаправляем пользователя на страницу входа
        window.location.href = "index.html";
    });

    // Добавляем обработчик события для кнопки сохранить
    document.getElementById("save-button").addEventListener("click", function() {
        const coinCounter = parseInt(document.getElementById("coin-counter").textContent);
        saveUserData(username, coinCounter);
    });

    // Добавляем обработчик события для кнопки "Кликни меня"
    document.getElementById("clicker").addEventListener("click", function() {
        let coinCounter = parseInt(document.getElementById("coin-counter").textContent);
        coinCounter += 10;
        document.getElementById("coin-counter").textContent = coinCounter;
    });

    // Добавляем обработчик события для кнопки "Магазин"
    document.getElementById("shop-button").addEventListener("click", function() {
        const shop = document.getElementById("shop");
        // Переключаем отображение магазина
        if (shop.style.display === "none") {
            shop.style.display = "block";
        } else {
            shop.style.display = "none";
        }
    });

    // Добавляем обработчик события для покупки товара в магазине
    const buyButtons = document.querySelectorAll(".buy-item");
    buyButtons.forEach(button => {
        button.addEventListener("click", function() {
            const price = parseInt(button.getAttribute("data-price"));
            let coinCounter = parseInt(document.getElementById("coin-counter").textContent);
            if (coinCounter >= price) {
                coinCounter -= price;
                document.getElementById("coin-counter").textContent = coinCounter;
                showMessage("Товар успешно куплен!");
                // Проверяем, является ли это покупка товаром 1
                if (button.classList.contains('item-1')) {
                    // Увеличиваем количество монет, получаемых при нажатии кнопки "Кликни меня!"
                    const clickerCounter = parseInt(document.getElementById("clicker").getAttribute("data-counter"));
                    document.getElementById("clicker").setAttribute("data-counter", clickerCounter + 1);
                    // Увеличиваем цену товара на 50%
                    button.setAttribute("data-price", Math.round(price * 1.5));
                    // Обновляем текст на кнопке с новой ценой
                    button.textContent = `Купить за ${Math.round(price * 1.5)} монет`;
                }
            } else {
                showMessage("У вас недостаточно монет для покупки!");
            }
        });
    });
});

// Функция для загрузки данных о пользователе и отображения их на странице
function loadUserData(username) {
    fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/search?username=${username}`)
        .then(response => response.json())
        .then(data => {
            const userInfoElement = document.getElementById("user-info");
            userInfoElement.innerHTML = ""; // Очистить содержимое элемента

            if (data.length > 0) {
                const user = data[0];
                userInfoElement.innerHTML += `<p>Привет, ${user.username}!</p>`;
                // Здесь можно добавить код для отображения других данных пользователя

                const coinCounter = user.coins || 0;
                document.getElementById("coin-counter").textContent = coinCounter;
            } else {
                showMessage("Ошибка: пользователь не найден");
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showMessage("Ошибка при загрузке данных пользователя");
        });
}

// Функция для сохранения данных пользователя
async function saveUserData(username, coinCounter) {
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/search?username=${username}`);
        const data = await response.json();
        const user = data[0];
        const putResponse = await fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/username/${user.username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { coins: coinCounter } })
        });
        if (putResponse.ok) {
            showMessage("Данные успешно сохранены!");
        } else {
            showMessage("Ошибка при сохранении данных пользователя");
        }
    } catch (error) {
        console.error('Ошибка при загрузке/сохранении данных пользователя:', error);
        showMessage("Ошибка при загрузке/сохранении данных пользователя");
    }
}

// Функция для отображения сообщений
function showMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}
    