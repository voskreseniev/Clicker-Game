let clickCount = 0;
let autoClickCount = 0;
let autoClickCost = 10;
let autoClickInterval;

function startAutoClick() {
    autoClickInterval = setInterval(function () {
        clickCount += autoClickCount;
        updateClickCount();
    }, 1000);
}

function stopAutoClick() {
    clearInterval(autoClickInterval);
}

function incrementClickCount() {
    clickCount++;
    updateClickCount();
}

function updateClickCount() {
    document.getElementById('clickCount').innerText = clickCount;
}

function buyAutoClick() {
    if (clickCount >= autoClickCost) {
        clickCount -= autoClickCost;
        autoClickCount++;
        autoClickCost = Math.ceil(autoClickCost * 1.5);
        updateClickCount();
        updateAutoClickCount();
        updateAutoClickCost();
        enableUpgradeButton();
        startAutoClick();
    } else {
        alert('Недостаточно монет для покупки автоклика.');
    }
}
const sheetDBUrl = 'https://sheetdb.io/api/v1/4648tmzmrt180';

function loginUser() {
    const usernameInput = document.getElementById('username');
    const username = document.getElementById('usernameInput').value; // Получаем введенное имя из формы входа

    // Проверка данных пользователя
    axios.get(`${sheetDBUrl}/search?username=${username}`)
        .then(response => {
            const user = response.data[0];
            if (user) {
                alert('Вход выполнен успешно!');

                // Отображаем имя игрока в блоке
                usernameInput.textContent = `Игрок: ${username}`;

                // Редирект на game.html или другие действия после успешного входа
                window.location.href = 'game.html';
            } else {
                alert('Неверное имя пользователя или пароль.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    return false; // Чтобы предотвратить отправку формы
}


function upgradeAutoClick() {
    const upgradeCost = calculateUpgradeCost();
    if (clickCount >= upgradeCost) {
        clickCount -= upgradeCost;
        autoClickCount++;
        updateClickCount();
        updateAutoClickCount();
        enableUpgradeButton();
    } else {
        alert('Недостаточно монет для улучшения автоклика.');
    }
}

function calculateUpgradeCost() {
    return Math.ceil(10 * Math.pow(1.2, autoClickCount));
}

function updateAutoClickCount() {
    document.getElementById('autoClickCount').innerText = autoClickCount;
}

function updateAutoClickCost() {
    document.getElementById('autoClickCost').innerText = autoClickCost;
}

function enableUpgradeButton() {
    const upgradeButton = document.getElementById('upgradeAutoClickButton');
    upgradeButton.disabled = false;
}
