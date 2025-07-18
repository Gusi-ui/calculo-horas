// Lista de festivos 2025 (ajusta según tu país/región)
const HOLIDAYS = [
    "2025-01-01", "2025-01-06", "2025-04-18", "2025-05-01", 
    "2025-08-15", "2025-10-12", "2025-11-01", "2025-12-06", "2025-12-25"
];

document.getElementById('calculator-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = document.getElementById('user').value;
    const startDate = dayjs(document.getElementById('start-date').value);
    const endDate = dayjs(document.getElementById('end-date').value);
    const hoursPerDay = parseInt(document.getElementById('hours-per-day').value);
    const includeHolidays = document.getElementById('include-holidays').checked;

    let workingDays = 0;
    let holidayDays = 0;

    for (let d = startDate; d.isSameOrBefore(endDate); d = d.add(1, 'day')) {
        const isWeekend = d.day() === 0 || d.day() === 6; // 0 = Domingo, 6 = Sábado
        const isHoliday = HOLIDAYS.includes(d.format('YYYY-MM-DD'));

        if (isWeekend) continue; // Ignorar fines de semana (ajusta si trabajan)

        if (isHoliday) {
            if (includeHolidays) holidayDays++;
        } else {
            workingDays++;
        }
    }

    const totalWorkingHours = workingDays * hoursPerDay;
    const totalHolidayHours = holidayDays * hoursPerDay;

    document.getElementById('result').innerHTML = `
        <h2>Resultado para ${user}</h2>
        <p>Horas laborables: ${totalWorkingHours} (${workingDays} días)</p>
        <p>Horas festivos: ${totalHolidayHours} (${holidayDays} días)</p>
        <p><strong>Total horas:</strong> ${totalWorkingHours + totalHolidayHours}</p>
    `;
});