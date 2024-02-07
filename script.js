document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Проверяем, чтобы оба поля были заполнены
    if (!username || !password) {
        showMessage("Введите имя пользователя и пароль");
        return;
    }

    // Проверяем, чтобы длина пароля была не менее 6 символов
    if (password.length < 6) {
        showMessage("Пароль должен содержать не менее 6 символов");
        return;
    }

    // Проверяем, существует ли уже пользователь с таким именем
    fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/search?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                showMessage("Пользователь с таким именем уже существует");
            } else {
                // Отправляем запрос на регистрацию пользователя
                fetch('https://sheetdb.io/api/v1/5o5c5w3gv1h44', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            username: username,
                            password: password
                        }
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Ответ сервера:", data);
                    showMessage("Пользователь успешно зарегистрирован!");
                })
                .catch(error => {
                    console.error('Ошибка при регистрации пользователя:', error);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка при проверке существования пользователя:', error);
        });
});

document.getElementById("login-button").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Проверяем, чтобы оба поля были заполнены
    if (!username || !password) {
        showMessage("Введите имя пользователя и пароль");
        return;
    }

    // Отправляем запрос на проверку существования пользователя
    fetch(`https://sheetdb.io/api/v1/5o5c5w3gv1h44/search?username=${username}&password=${password}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                showMessage("Вход выполнен успешно!");
                window.location.href = `authorized.html?username=${username}`; // Переход на страницу для авторизированных пользователей с передачей имени пользователя через параметры URL
            } else {
                showMessage("Неверное имя пользователя или пароль!");
            }
        })
        .catch(error => {
            console.error('Ошибка при проверке пользователя:', error);
        });
});

function showMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}
