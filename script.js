/* ====== CONFIG ====== */
// Verificar que dayjs esté disponible
if (typeof dayjs === 'undefined') {
  console.error('dayjs no está cargado');
  alert('Error: La librería dayjs no se cargó correctamente');
} else {
  console.log('dayjs cargado correctamente');
  dayjs.locale('es');
}

/* Festivos Mataró 2024-2025 */
const MATARO_FESTIVOS = {
  2024:["2024-01-01","2024-01-06","2024-03-29","2024-04-01","2024-05-01",
        "2024-06-24","2024-08-15","2024-09-11","2024-10-12","2024-11-01",
        "2024-12-06","2024-12-25","2024-12-26"],
  2025:["2025-01-01","2025-01-06","2025-04-18","2025-04-21","2025-05-01",
        "2025-06-24","2025-07-28","2025-08-15","2025-09-11","2025-10-12",
        "2025-11-01","2025-12-06","2025-12-25","2025-12-26"]
};

/* ====== Ejecutar todo cuando el DOM esté listo ====== */
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, inicializando...');
  
  // Verificar que todos los elementos necesarios existan
  const elementos = ['year', 'month', 'total-hours', 'tramo1', 'tramo2', 'incluyeFestivos', 'festivo1', 'festivo2', 'form', 'resultado'];
  const elementosFaltantes = elementos.filter(id => !document.getElementById(id));
  
  if (elementosFaltantes.length > 0) {
    console.error('Elementos faltantes:', elementosFaltantes);
    alert('Error: Faltan elementos del formulario');
    return;
  }
  
  console.log('Todos los elementos encontrados');
  
  /* Rellenar años */
  const selYear = document.getElementById('year');
  const yActual = dayjs().year();
  [yActual, yActual+1].forEach(y=>{
    const opt = document.createElement('option');
    opt.value = y; opt.textContent = y;
    selYear.appendChild(opt);
  });
  console.log('Años cargados:', yActual, yActual+1);

  /* Mostrar/ocultar horario festivo */
  const checkFest = document.getElementById('incluyeFestivos');
  const divFest   = document.getElementById('horarioFestivo');
  checkFest.addEventListener('change', ()=> divFest.classList.toggle('hidden', !checkFest.checked));

  /* Cálculo */
  document.getElementById('form').addEventListener('submit', e=>{
    e.preventDefault();
    console.log('Formulario enviado, calculando...');

    // Obtener valores del formulario
    const year   = parseInt(selYear.value);
    const month  = parseInt(document.getElementById('month').value);
    const total  = parseFloat(document.getElementById('total-hours').value);
    const t1     = parseFloat(document.getElementById('tramo1').value);
    const t2     = parseFloat(document.getElementById('tramo2').value);
    const incl   = checkFest.checked;
    const f1     = incl ? parseFloat(document.getElementById('festivo1').value) : 0;
    const f2     = incl ? parseFloat(document.getElementById('festivo2').value) : 0;

    console.log('Valores obtenidos:', { year, month, total, t1, t2, incl, f1, f2 });

    // Validar datos
    if (isNaN(year) || isNaN(month) || isNaN(total) || isNaN(t1) || isNaN(t2)) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }

    const festivosMes = MATARO_FESTIVOS[year] || [];
    console.log('Festivos del año:', festivosMes);
    
    let esperadas = 0;
    let diasLaborables = 0;
    let diasFestivos = 0;

    const inicio = dayjs(`${year}-${String(month).padStart(2,'0')}-01`);
    const fin    = inicio.endOf('month');
    
    console.log('Período de cálculo:', inicio.format('YYYY-MM-DD'), 'a', fin.format('YYYY-MM-DD'));

    // Recorrer todos los días del mes usando un bucle for tradicional
    const diasEnMes = fin.date();
    console.log('Días en el mes:', diasEnMes);
    
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fechaActual = dayjs(`${year}-${String(month).padStart(2,'0')}-${String(dia).padStart(2,'0')}`);
      const iso = fechaActual.format('YYYY-MM-DD');
      const esFestivo = festivosMes.includes(iso);
      const esFinSem  = fechaActual.day() === 0 || fechaActual.day() === 6;

      console.log(`Día ${dia}: ${iso} - Festivo: ${esFestivo}, FinSem: ${esFinSem}`);

      if (!incl && (esFestivo || esFinSem)) {
        // No incluir festivos/fines de semana
        continue;
      }

      const horas = (esFestivo || esFinSem) ? (f1 + f2) : (t1 + t2);
      esperadas += horas;
      
      if (esFestivo || esFinSem) {
        diasFestivos++;
      } else {
        diasLaborables++;
      }
    }

    console.log('Resultados:', { esperadas, diasLaborables, diasFestivos });

    const diff = total - esperadas;
    const clase = diff >= 0 ? 'exceso' : 'déficit';
    const resultadoDiv = document.getElementById('resultado');
    
    resultadoDiv.innerHTML = `
      <h2>Balance del Mes</h2>
      <p>Horas que debería trabajar: <strong>${esperadas.toFixed(2)}</strong></p>
      <p>Horas asignadas: <strong>${total}</strong></p>
      <p>Diferencia: <strong class="${clase}">${diff.toFixed(2)} h (${clase})</strong></p>
      <p><small>Días laborables: ${diasLaborables} | Días festivos/fines de semana: ${diasFestivos}</small></p>
    `;
    
    resultadoDiv.classList.remove('hidden');
    console.log('Resultado mostrado');
  });
});