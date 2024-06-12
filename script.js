const currentHour = new Date().getHours();
const body = document.body;
const dayClassName = 'day-bg';
const nightClassName = 'night-bg';
if (currentHour >= 6 && currentHour < 18) { 
  body.classList.add(dayClassName);
  body.classList.remove(nightClassName);
} else {
  body.classList.add(nightClassName);
  body.classList.remove(dayClassName);
}
function applyDayNightMode() {
    const currentHour = new Date().getHours();
    const body = document.body;
  
    if (currentHour >= 6 && currentHour < 18) {
      // Daytime (6:00 AM to 5:59 PM)
      body.classList.remove('night');
      body.classList.add('day');
    } else {
      // Nighttime (6:00 PM to 5:59 AM)
      body.classList.remove('day');
      body.classList.add('night');
    }
  }
  window.addEventListener('load', applyDayNightMode);
  const toggleButton = document.getElementById('dayNightToggle');

  toggleButton.addEventListener('click', function () {
    const body = document.body;
    if (body.classList.contains('day')) {
      body.classList.remove('day');
      body.classList.add('night');
    } else {
      body.classList.remove('night');
      body.classList.add('day');
    }
  });
  function updateClock() {
    const clockElement = document.getElementById("clock");
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    clockElement.textContent = "Current Time: " + timeString;
}

// Call the updateClock function initially
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);