const sheetDBUrl = 'https://sheetdb.io/api/v1/4648tmzmrt180';

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверка данных пользователя
    axios.get(`${sheetDBUrl}/search?username=${username}&password=${password}`)
        .then(response => {
            const user = response.data[0];
            if (user) {
                alert('Вход выполнен успешно!');
                // Редирект на game.html или другие действия после успешного входа
              window.location.href = 'Game/game.html';
            } else {
                alert('Неверные имя пользователя или пароль.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    return false; // Чтобы предотвратить отправку формы
}

function openRegistrationForm() {
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function openLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registrationForm').style.display = 'none';
}

function registerUser() {
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;

    // Генерация уникального ID
    const userId = generateUUID();

    // Проверка существования пользователя с таким именем
    axios.get(`${sheetDBUrl}/search?username=${regUsername}`)
        .then(response => {
            const existingUser = response.data && response.data.length > 0 ? response.data[0] : null;
            if (existingUser) {
                alert('Пользователь с таким именем уже существует. Пожалуйста, выберите другое имя.');
            } else {
                // Добавление нового пользователя в таблицу с указанием уникального ID
                axios.post(sheetDBUrl, { data: { id: userId, username: regUsername, password: regPassword } })
                    .then(response => {
                        alert('Регистрация успешна!');
                        // Скрываем форму регистрации
                        document.getElementById('registrationForm').style.display = 'none';
                        // Показываем форму входа
                        document.getElementById('loginForm').style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error adding user:', error);
                        alert('Произошла ошибка при регистрации.');
                    });
            }
        })
        .catch(error => {
            console.error('Error checking existing user:', error);
            alert('Произошла ошибка при проверке существования пользователя.');
        });

    return false; // Чтобы предотвратить отправку формы
}

// Генерация уникального ID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function showLoginForm() {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function showRegistrationForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}
