let clickCount = 0;
let autoClickCount = 0;
let autoClickCost = 10;
let autoClickInterval;

// Функция для обновления данных в локальном хранилище
function updateLocalData() {
    const data = {
        username: document.getElementById('username').textContent,
        clickCount: clickCount,
        autoClickCount: autoClickCount,
        autoClickCost: autoClickCost
    };

    localStorage.setItem('gameData', JSON.stringify(data));
}

// Функция для загрузки данных из локального хранилища
function loadLocalData() {
    const localData = JSON.parse(localStorage.getItem('gameData')) || {};

    document.getElementById('username').textContent = `Игрок: ${localData.username || 'Гость'}`;
    clickCount = localData.clickCount || 0;
    autoClickCount = localData.autoClickCount || 0;
    autoClickCost = localData.autoClickCost || 10;

    updateClickCount();
    updateAutoClickCount();
    updateAutoClickCost();

    // Проверяем, активированы ли автоклики
    if (autoClickCount > 0) {
        startAutoClick();
    }
}

// Функция для возобновления автокликов после загрузки страницы
function resumeAutoClick() {
    // Проверяем, активированы ли автоклики
    if (autoClickCount > 0) {
        startAutoClick();
    }
}

function startAutoClick() {
    autoClickInterval = setInterval(function () {
        clickCount += autoClickCount;
        updateClickCount();
        updateLocalData(); // Update data locally
    }, 1000);
}

function stopAutoClick() {
    clearInterval(autoClickInterval);
}

function incrementClickCount() {
    clickCount++;
    updateClickCount();
    updateLocalData(); // Update data locally
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
        updateLocalData(); // Update data locally
    } else {
        alert('Недостаточно монет для покупки автоклика.');
    }
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

// Загрузка данных из локального хранилища при загрузке страницы
loadLocalData();

// Возобновление автокликов после загрузки страницы
resumeAutoClick();
