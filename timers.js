// Funkcja do zapisywania i odczytywania wartości z lokalnego magazynu
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Funkcja do aktualizowania licznika odwiedzin
function updateVisitCounter() {
    let visitCounter = getFromLocalStorage('visitCounter') || 0;

    // Sprawdź, czy jest to nowa sesja
    const lastVisitTime = sessionStorage.getItem('lastVisitTime');
    const currentTime = new Date().getTime();
    const sessionDuration = 10 * 60 * 1000; // 10 minut

    if (!lastVisitTime || currentTime - lastVisitTime > sessionDuration) {
        visitCounter++;
        saveToLocalStorage('visitCounter', visitCounter);
    }

    sessionStorage.setItem('lastVisitTime', currentTime);
    document.getElementById('visitCounter').innerText = visitCounter;
}

// Funkcja do aktualizowania czasu spędzonego na stronie
function updatePageTime() {
    let pageTime = getFromLocalStorage('pageTime') || 0;
    pageTime += 1; // Zakładamy, że czas jest w sekundach
    saveToLocalStorage('pageTime', pageTime);
    document.getElementById('pageTime').innerText = formatTime(pageTime);
}

// Funkcja do formatowania czasu w formacie hh:mm:ss
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Aktualizacja licznika odwiedzin i czasu co sekundę
setInterval(updatePageTime, 1000);

// Funkcja do aktualizowania zegara i daty
function updateTime() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    clockElement.innerText = now.toLocaleTimeString();
    dateElement.innerText = now.toLocaleDateString();
}

// Aktualizacja zegara i daty co sekundę
setInterval(updateTime, 1000);

// Wywołanie funkcji aktualizujących odwiedziny i czas po załadowaniu strony
window.onload = function () {
    updateVisitCounter();
    updateTime(); // Aktualizuj zegar i datę natychmiast po załadowaniu strony
};