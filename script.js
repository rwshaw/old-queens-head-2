const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');

function getNextWednesday5pm() {
    const now = new Date();
    const result = new Date();
    result.setUTCHours(17, 0, 0, 0);

    let dayOfWeek = now.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let wednesday = 3;
    let daysUntilWednesday = (wednesday - dayOfWeek + 7) % 7;

    if (daysUntilWednesday === 0 && now.getUTCHours() >= 17) {
        daysUntilWednesday = 7;
    }
    
    result.setUTCDate(now.getUTCDate() + daysUntilWednesday);

    return result;
}


function updateCountdown() {
    const now = new Date();
    const nowUTC = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const dayOfWeek = nowUTC.getUTCDay();
    const hour = nowUTC.getUTCHours();

    if (dayOfWeek === 3 && hour >= 17) { // Wednesday 5pm GMT onwards
        countdownElement.classList.add('hidden');
        messageElement.classList.remove('hidden');
    } else {
        countdownElement.classList.remove('hidden');
        messageElement.classList.add('hidden');

        const nextWednesday = getNextWednesday5pm();
        const diff = nextWednesday - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
