/* ====== CONFIG ====== */
// Verificar que dayjs esté disponible
if (typeof dayjs === 'undefined') {
  console.error('dayjs no está cargado');
  alert('Error: La librería dayjs no se cargó correctamente');
} else {
dayjs.locale('es');
}

/* ====== CONSTANTES ====== */
const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/* ====== FESTIVOS ====== */
// Festivos fijos según web oficial del ayuntamiento de Mataró
const FESTIVOS_FIJOS = [
  { dia: 1, mes: 1, nombre: 'Cap d\'Any' },
  { dia: 6, mes: 1, nombre: 'Reis' },
  { dia: 1, mes: 5, nombre: 'Festa del Treball' },
  { dia: 9, mes: 6, nombre: 'Fira a Mataró' },
  { dia: 24, mes: 6, nombre: 'Sant Joan' },
  { dia: 15, mes: 8, nombre: 'L\'Assumpció' },
  { dia: 11, mes: 9, nombre: 'Diada Nacional de Catalunya' },
  { dia: 1, mes: 11, nombre: 'Tots Sants' },
  { dia: 6, mes: 12, nombre: 'Dia de la Constitució' },
  { dia: 8, mes: 12, nombre: 'La Immaculada' },
  { dia: 25, mes: 12, nombre: 'Nadal' },
  { dia: 26, mes: 12, nombre: 'Sant Esteve' }
];

/* ====== FUNCIONES DE CÁLCULO ====== */

/**
 * Calcula el Domingo de Resurrección usando el algoritmo de Meeus/Jones/Butcher
 * @param {number} year - Año
 * @returns {dayjs.Dayjs} Fecha del Domingo de Resurrección
 */
function calcularDomingoResurreccion(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return dayjs(`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
}

/**
 * Calcula el día de las Santas de Mataró (26 julio, trasladado si cae en fin de semana)
 * @param {number} year - Año
 * @returns {dayjs.Dayjs} Fecha del festivo de las Santas
 */
function calcularDiaSantasMataro(year) {
  const diaOficial = dayjs(`${year}-07-26`);
  const diaSemana = diaOficial.day();
  
  // Si cae en fin de semana, trasladar al lunes siguiente
  if (diaSemana === 0 || diaSemana === 6) {
    const diasAñadir = diaSemana === 0 ? 1 : 2;
    return diaOficial.add(diasAñadir, 'day');
  }
  
  return diaOficial;
}

/**
 * Calcula todos los festivos de Mataró para un año específico
 * @param {number} year - Año
 * @returns {string[]} Array de fechas en formato YYYY-MM-DD
 */
function calcularFestivosMataro(year) {
  const festivos = [];
  
  // Agregar festivos fijos
  FESTIVOS_FIJOS.forEach(festivo => {
    festivos.push(`${year}-${String(festivo.mes).padStart(2,'0')}-${String(festivo.dia).padStart(2,'0')}`);
  });
  
  // Agregar festivos variables (Semana Santa)
  const domingoResurreccion = calcularDomingoResurreccion(year);
  const viernesSanto = domingoResurreccion.subtract(2, 'day');
  const lunesPascua = domingoResurreccion.add(1, 'day');
  
  festivos.push(viernesSanto.format('YYYY-MM-DD'));
  festivos.push(lunesPascua.format('YYYY-MM-DD'));
  
  // Agregar Santas de Mataró
  const santasMataro = calcularDiaSantasMataro(year);
  festivos.push(santasMataro.format('YYYY-MM-DD'));
  
  return festivos.sort();
}

/* ====== CACHE Y GESTIÓN DE FESTIVOS ====== */
const FESTIVOS_CACHE = new Map();

/**
 * Obtiene los festivos para un año (con cache)
 * @param {number} year - Año
 * @returns {string[]} Array de fechas de festivos
 */
function obtenerFestivosMataro(year) {
  if (!FESTIVOS_CACHE.has(year)) {
    FESTIVOS_CACHE.set(year, calcularFestivosMataro(year));
  }
  return FESTIVOS_CACHE.get(year);
}

/* ====== CÁLCULO DE HORAS ====== */

/**
 * Calcula las horas esperadas para un mes específico
 * @param {number} year - Año
 * @param {number} month - Mes
 * @param {number} t1 - Horas tramo 1 laborable
 * @param {number} t2 - Horas tramo 2 laborable
 * @param {boolean} incluirFestivos - Si incluir festivos/fines de semana
 * @param {number} f1 - Horas tramo 1 festivo
 * @param {number} f2 - Horas tramo 2 festivo
 * @returns {Object} Resultado del cálculo
 */
function calcularHorasMes(year, month, t1, t2, incluirFestivos, f1, f2) {
  const festivosMes = obtenerFestivosMataro(year);
  let esperadas = 0;
  let diasLaborables = 0;
  let diasFestivos = 0;

  const inicio = dayjs(`${year}-${String(month).padStart(2,'0')}-01`);
  const fin = inicio.endOf('month');
  const diasEnMes = fin.date();

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const fechaActual = dayjs(`${year}-${String(month).padStart(2,'0')}-${String(dia).padStart(2,'0')}`);
    const iso = fechaActual.format('YYYY-MM-DD');
    const esFestivo = festivosMes.includes(iso);
    const esFinSem = fechaActual.day() === 0 || fechaActual.day() === 6;

    if (!incluirFestivos && (esFestivo || esFinSem)) {
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

  return { esperadas, diasLaborables, diasFestivos };
}

/* ====== UTILIDADES ====== */

/**
 * Valida que todos los elementos del formulario existan
 * @returns {boolean} True si todos los elementos existen
 */
function validarElementos() {
  const elementos = ['year', 'month', 'total-hours', 'tramo1', 'tramo2', 'incluyeFestivos', 'festivo1', 'festivo2', 'form', 'resultado'];
  const elementosFaltantes = elementos.filter(id => !document.getElementById(id));
  
  if (elementosFaltantes.length > 0) {
    console.error('Elementos faltantes:', elementosFaltantes);
    alert('Error: Faltan elementos del formulario');
    return false;
  }
  return true;
}

/**
 * Obtiene y valida los valores del formulario
 * @returns {Object|null} Valores del formulario o null si hay error
 */
function obtenerValoresFormulario() {
  const year = parseInt(document.getElementById('year').value);
  const month = parseInt(document.getElementById('month').value);
  const total = parseFloat(document.getElementById('total-hours').value);
  const t1 = parseFloat(document.getElementById('tramo1').value);
  const t2 = parseFloat(document.getElementById('tramo2').value);
  const incluirFestivos = document.getElementById('incluyeFestivos').checked;
  const f1 = incluirFestivos ? parseFloat(document.getElementById('festivo1').value) : 0;
  const f2 = incluirFestivos ? parseFloat(document.getElementById('festivo2').value) : 0;

  if (isNaN(year) || isNaN(month) || isNaN(total) || isNaN(t1) || isNaN(t2)) {
    alert('Por favor, completa todos los campos correctamente');
    return null;
  }

  return { year, month, total, t1, t2, incluirFestivos, f1, f2 };
}

/**
 * Muestra el resultado del cálculo
 * @param {Object} resultado - Resultado del cálculo
 * @param {number} total - Horas totales asignadas
 */
function mostrarResultado(resultado, total) {
  const { esperadas, diasLaborables, diasFestivos } = resultado;
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
}

/* ====== INICIALIZACIÓN ====== */
document.addEventListener('DOMContentLoaded', () => {
  if (!validarElementos()) return;

  // Rellenar años
  const selYear = document.getElementById('year');
  const yActual = dayjs().year();
  [yActual, yActual + 1].forEach(y => {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    selYear.appendChild(opt);
  });

  // Seleccionar año actual por defecto
  selYear.value = yActual;

  // Resetear todos los campos al cargar la página
  document.getElementById('month').value = '';
  document.getElementById('total-hours').value = '';
  document.getElementById('tramo1').value = '0';
  document.getElementById('tramo2').value = '0';
  document.getElementById('incluyeFestivos').checked = false;
  document.getElementById('festivo1').value = '0';
  document.getElementById('festivo2').value = '0';
  
  // Ocultar sección de festivos inicialmente
  document.getElementById('horarioFestivo').classList.add('hidden');
  
  // Ocultar resultado si existe
  document.getElementById('resultado').classList.add('hidden');

  // Mostrar/ocultar horario festivo
  const checkFest = document.getElementById('incluyeFestivos');
  const divFest = document.getElementById('horarioFestivo');
  checkFest.addEventListener('change', () => divFest.classList.toggle('hidden', !checkFest.checked));

  // Manejar envío del formulario
  document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();

    const valores = obtenerValoresFormulario();
    if (!valores) return;

    const { year, month, total, t1, t2, incluirFestivos, f1, f2 } = valores;
    const resultado = calcularHorasMes(year, month, t1, t2, incluirFestivos, f1, f2);
    
    mostrarResultado(resultado, total);
  });
});