const HOLIDAYS = [
    "2025-01-01","2025-01-06","2025-04-18","2025-05-01",
    "2025-08-15","2025-10-12","2025-11-01","2025-12-06","2025-12-25"
  ];
  
  const form = document.getElementById('calculator-form');
  const resultBox = document.getElementById('result');
  
  form.addEventListener('submit', e => {
    e.preventDefault();
  
    const user = document.getElementById('user').value.trim();
    const start = dayjs(document.getElementById('start-date').value);
    const end   = dayjs(document.getElementById('end-date').value);
    const hoursPerDay = +document.getElementById('hours-per-day').value;
    const includeHolidays = document.getElementById('include-holidays').checked;
  
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) {
      alert('Las fechas no son válidas.');
      return;
    }
  
    let laborables = 0, festivos = 0;
  
    for (let d = start; d.isSameOrBefore(end); d = d.add(1, 'day')) {
      const isWeekend = d.day() === 0 || d.day() === 6;
      const isHoliday = HOLIDAYS.includes(d.format('YYYY-MM-DD'));
  
      if (isWeekend) continue;
  
      if (isHoliday && includeHolidays) festivos++;
      else if (!isHoliday) laborables++;
    }
  
    const totalLaborable = laborables * hoursPerDay;
    const totalFestivo   = festivos * hoursPerDay;
  
    resultBox.innerHTML = `
      <h2>Resumen para ${user}</h2>
      <p><strong>Horas laborables:</strong> ${totalLaborable} (${laborables} días)</p>
      <p><strong>Horas festivos:</strong> ${totalFestivo} (${festivos} días)</p>
      <p><strong>Total horas:</strong> ${totalLaborable + totalFestivo}</p>
    `;
    resultBox.classList.remove('hidden');
  });