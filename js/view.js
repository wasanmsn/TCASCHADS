function toggleCollapsible(event) {
    const target = event.currentTarget;
    const parent = target.parentNode;
    parent.classList.toggle('active');
    const arrow = document.getElementById('arrow')
    if (arrow.style.transform === "scaleY(-1)") {
        arrow.style.transform = "scaleY(1)"

    } else {
        arrow.style.transform = "scaleY(-1)"

    }
}
// Set the target time to 75 hours from now
const targetTime = new Date().getTime() + 75 * 60 * 60 * 1000;
function formatThaiDate(date) {
    const monthMapping = [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ];
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthMapping[date.getMonth()];
    const year = date.getFullYear() % 100;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds} น.`;
    return formattedDate;
  }
// Update the timer every second
const timerInterval = setInterval(() => {
    // Calculate the remaining time
    const currentTime = new Date().getTime();
    const timeLeft = targetTime - currentTime;

    // Convert the remaining time to hours, minutes, and seconds
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

    // Update the HTML content
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    // Stop the timer when it reaches 0
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
    }
}, 1000);
document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('.radio-div');
    const form = document.getElementById('radio-form');
    const selectedContentDiv = document.getElementById('selected-content');

    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            radioButtons.forEach(function (otherRadioButton) {
                const otherGridDisplay = otherRadioButton.closest('.grid-display');
                if (otherRadioButton.checked) {
                    otherGridDisplay.style.borderColor = '#00AFC1';
                    otherGridDisplay.classList.add('checked');
                    otherGridDisplay.style.setProperty('--after-bg-color', '#00AFC1');
                } else {
                    otherGridDisplay.style.borderColor = '#f95b5b';
                    otherGridDisplay.classList.remove('checked');
                    otherGridDisplay.style.setProperty('--after-bg-color', '#f95b5b');
                }
            });
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const checkedRadioButton = document.querySelector('.radio-div:checked');
        const mainInfo = document.getElementById("main-info");
        const additionalInfoDiv = document.getElementById('additional-info');
        const dateTime = document.getElementById("date");
        if (checkedRadioButton) {
            const listItem = checkedRadioButton.closest('.grid-display');
            const contentDiv = listItem.querySelector('div[style="text-align: left;"]');
            const imgDiv = listItem.querySelector('.img-top-right');
            selectedContentDiv.innerHTML = contentDiv.outerHTML + imgDiv.outerHTML;
            selectedContentDiv.style.display = 'block';
            additionalInfoDiv.style.display = 'block';
            const currentDate = new Date();
            const thaiDateString = formatThaiDate(currentDate);
            dateTime.innerHTML = thaiDateString;

            mainInfo.style.display = 'none';
        }
    });
    ``



});
