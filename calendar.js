document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const saveBookingsBtn = document.getElementById('save-bookings');

    let currentDate = new Date();
    const today = new Date();
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};

    function renderCalendar() {
        calendarBody.innerHTML = '';
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDayOfMonth) {
                    cell.classList.add('empty');
                } else if (date > daysInMonth) {
                    break;
                } else {
                    cell.textContent = date;
                    const dateKey = `${year}-${month + 1}-${date}`;

                    if (isToday(year, month, date)) {
                        cell.classList.add('current-day');
                    }

                    if (bookings[dateKey]) {
                        cell.classList.add('booked');
                        cell.title = `${bookings[dateKey].timeSlot}: ${bookings[dateKey].reason}`;
                    }

                    cell.addEventListener('click', () => selectDate(dateKey, cell));
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function isToday(year, month, day) {
        return (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        );
    }

    function selectDate(dateKey, cell) {
        const timeSlot = prompt('Enter the time slot for booking (e.g., 10 AM - 11 AM):');
        const reason = prompt('Enter the reason for booking:');
        if (timeSlot && reason) {
            bookings[dateKey] = { timeSlot, reason };
            cell.classList.add('booked');
            cell.title = `${timeSlot}: ${reason}`;
            saveBookings();
            renderCalendar();
        }
    }

    function saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    function downloadBookings() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "bookings.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    prevDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        renderCalendar();
    });

    nextDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        renderCalendar();
    });

    saveBookingsBtn.addEventListener('click', downloadBookings);

    renderCalendar();
});
const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
savedBookings.forEach(booking => {
    document.querySelector(`[data-date="${booking.date}"]`).classList.add('booked');
});
let currentDate = new Date();
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateCalendar() {
    let monthYear = document.getElementById('monthYear');
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    
    monthYear.innerHTML = `<strong>${monthNames[month]} ${year}</strong>`;


}

document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();



