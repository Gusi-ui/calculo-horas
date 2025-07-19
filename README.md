# Calculadora de Balance Mensual - Mataró

🚀 **Demo en vivo:** [https://gusi-ui.github.io/calculo-horas/](https://gusi-ui.github.io/calculo-horas/)

Una aplicación web para calcular el balance de horas mensuales, considerando días laborables, festivos y fines de semana con diferentes horarios.

## ✨ Características

- **Cálculo automático** de horas esperadas por mes
- **Gestión de festivos** de Mataró (2024-2025)
- **Horarios diferenciados** para días laborables y festivos/fines de semana
- **Interfaz moderna** y responsive
- **Validación de datos** en tiempo real
- **Resultados detallados** con desglose de días

## 🛠️ Mejoras Implementadas

### Correcciones de Bugs
- ✅ **Corregido bucle de cálculo**: Solucionado problema con `isSameOrBefore()` que causaba errores
- ✅ **Validación de datos**: Agregada validación para evitar valores NaN
- ✅ **Estilos CSS faltantes**: Añadidos estilos para clases `exceso` y `déficit`

### Mejoras de Funcionalidad
- ✅ **Bucle optimizado**: Cambiado de `while` a `for` para mayor estabilidad
- ✅ **Logs de debug**: Agregados logs para facilitar el debugging
- ✅ **Manejo de errores**: Mejorado el manejo de errores y validaciones
- ✅ **Información detallada**: Resultados incluyen conteo de días laborables y festivos

### Archivos de Prueba
- ✅ **test.html**: Prueba básica del cálculo
- ✅ **test_completo.html**: Suite completa de tests para validar diferentes escenarios

## 📋 Cómo Usar

1. **Selecciona el año** (2024 o 2025)
2. **Elige el mes** a calcular
3. **Ingresa las horas totales** asignadas al mes
4. **Configura el horario diario laborable** (L-V):
   - Tramo 1 (horas)
   - Tramo 2 (horas)
5. **Opcional**: Marca "Incluir festivos y fines de semana" para configurar:
   - Horario de festivos/fines de semana
6. **Haz clic en "Calcular balance"**

## 🎯 Lógica de Cálculo

La aplicación maneja correctamente:

- **Días laborables** (L-V): Horario normal (Tramo 1 + Tramo 2)
- **Festivos oficiales**: Horario festivo (Festivo 1 + Festivo 2)
- **Fines de semana**: Horario festivo (Festivo 1 + Festivo 2)
- **Festivos en días laborables**: Se aplica horario festivo, no laborable
- **Exclusión opcional**: Puedes excluir festivos/fines de semana del cálculo

## 📁 Estructura del Proyecto

```
gitpru/
├── index.html          # Página principal
├── script.js           # Lógica JavaScript
├── styles.css          # Estilos CSS
├── test.html           # Prueba básica
├── test_completo.html  # Suite de tests
├── README.md           # Documentación
└── LICENSE             # Licencia
```

## 🚀 Cómo ejecutar localmente

1. Asegúrate de tener Python 3 instalado
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta:
   ```sh
   python3 -m http.server 8000
   ```
4. Abre tu navegador en [http://localhost:8000](http://localhost:8000)

## 🧪 Testing

Para ejecutar las pruebas:
- **Test básico**: [http://localhost:8000/test.html](http://localhost:8000/test.html)
- **Test completo**: [http://localhost:8000/test_completo.html](http://localhost:8000/test_completo.html)

## 📊 Festivos Incluidos

### 2024
- 1 y 6 de enero, 29 de marzo, 1 de abril, 1 de mayo
- 24 de junio, 15 de agosto, 11 de septiembre
- 12 de octubre, 1 de noviembre, 6, 25 y 26 de diciembre

### 2025
- 1 y 6 de enero, 18 y 21 de abril, 1 de mayo
- 24 de junio, 28 de julio, 15 de agosto, 11 de septiembre
- 12 de octubre, 1 de noviembre, 6, 25 y 26 de diciembre

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript ES6+**: Lógica de cálculo
- **Day.js**: Manejo de fechas
- **Inter Font**: Tipografía moderna

## 📄 Licencia

Ver archivo [LICENSE](LICENSE). 