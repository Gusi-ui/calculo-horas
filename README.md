# Calculadora de Balance Mensual - Mataró

🚀 **Demo en vivo:** [https://gusi-ui.github.io/calculo-horas/](https://gusi-ui.github.io/calculo-horas/)

Una aplicación web para calcular el balance de horas mensuales, considerando días laborables, festivos y fines de semana con diferentes horarios.

## ✨ Características

- **Cálculo automático** de horas esperadas por mes
- **Festivos dinámicos** de Mataró calculados automáticamente para cualquier año
- **Horarios diferenciados** para días laborables y festivos/fines de semana
- **Interfaz moderna** y responsive
- **Validación de datos** en tiempo real
- **Resultados detallados** con desglose de días
- **Cache inteligente** para optimizar el rendimiento
- **Fuente oficial** basada en la web del ayuntamiento de Mataró

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
- ✅ **Festivos dinámicos**: Cálculo automático de festivos para cualquier año (2024, 2025, 2026, etc.)
- ✅ **Santas de Mataró**: Lógica específica para el día de las Santas (26 julio, trasladado si cae en fin de semana)
- ✅ **Festivos corregidos**: Incluido 8 de diciembre (La Immaculada) según web oficial del ayuntamiento

### Archivos de Prueba
- ✅ **test.html**: Prueba básica del cálculo
- ✅ **test_completo.html**: Suite completa de tests para validar diferentes escenarios
- ✅ **test_festivos.html**: Test específico para validar el cálculo dinámico de festivos

## 📋 Cómo Usar

1. **Selecciona el año** (cualquier año, no solo 2024-2025)
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

## 🔄 Festivos Dinámicos

### 📋 Fuente Oficial
Los festivos se basan en la información oficial del ayuntamiento de Mataró:
- **Web oficial**: [https://www.mataro.cat/ca/la-ciutat/festius-locals](https://www.mataro.cat/ca/la-ciutat/festius-locals)

### Cálculo Automático
Los festivos se calculan dinámicamente para cualquier año usando:

- **Festivos fijos**: Mismo día todos los años (1 enero, 6 enero, 1 mayo, etc.)
- **Semana Santa**: Calculada usando el algoritmo de Meeus/Jones/Butcher
- **Santas de Mataró**: 26 de julio, trasladado al lunes si cae en fin de semana

### Festivos Incluidos (Según Web Oficial)
- **1 y 6 de enero**: Cap d'Any y Reis
- **Semana Santa**: Viernes Santo y Lunes de Pascua (variables)
- **1 de mayo**: Festa del Treball
- **9 de junio**: Fira a Mataró
- **24 de junio**: Sant Joan
- **26 de julio**: Santas de Mataró (trasladado al lunes si cae en sábado/domingo)
- **15 de agosto**: L'Assumpció
- **11 de septiembre**: Diada Nacional de Catalunya
- **1 de noviembre**: Tots Sants
- **6 y 8 de diciembre**: Dia de la Constitució y La Immaculada
- **25 y 26 de diciembre**: Nadal y Sant Esteve

### 🏛️ Santas de Mataró - Lógica Específica
El día de las Santas de Mataró tiene una lógica especial:
- **Día oficial**: 26 de julio
- **Si cae en sábado**: Se traslada al lunes 28 de julio
- **Si cae en domingo**: Se traslada al lunes 27 de julio
- **Si cae en día laborable**: Se mantiene el 26 de julio

**Ejemplos:**
- **2024**: 26 julio cae en viernes → Festivo: 26 julio
- **2025**: 26 julio cae en sábado → Festivo: 28 julio (trasladado)
- **2026**: 26 julio cae en domingo → Festivo: 27 julio (trasladado)

## 📁 Estructura del Proyecto

```
gitpru/
├── index.html                    # Página principal
├── script.js                     # Lógica JavaScript con festivos dinámicos
├── styles.css                    # Estilos CSS
├── test.html                     # Prueba básica
├── test_completo.html            # Suite de tests
├── test_festivos.html            # Test de festivos dinámicos
├── festivos_web_ayuntamiento.md  # Documentación para carga desde web
├── README.md                     # Documentación
└── LICENSE                       # Licencia
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
- **Test festivos**: [http://localhost:8000/test_festivos.html](http://localhost:8000/test_festivos.html)

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript ES6+**: Lógica de cálculo con festivos dinámicos
- **Day.js**: Manejo de fechas
- **Algoritmo de Meeus/Jones/Butcher**: Cálculo de Semana Santa
- **Inter Font**: Tipografía moderna

## 🔮 Futuras Mejoras

- **Carga desde web**: Implementar carga automática de festivos desde la web del ayuntamiento
- **API del ayuntamiento**: Si se dispone de una API oficial
- **Notificaciones**: Alertas de cambios en los festivos oficiales
- **Múltiples ciudades**: Extender a otras ciudades de Catalunya

## 📄 Licencia

Ver archivo [LICENSE](LICENSE). 