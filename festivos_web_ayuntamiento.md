# Carga de Festivos desde Web del Ayuntamiento

## 📋 Fuente Oficial
- **URL**: https://www.mataro.cat/ca/la-ciutat/festius-locals
- **Descripción**: Página oficial del ayuntamiento de Mataró con los festivos locales

## 🔧 Implementación Actual

Actualmente los festivos se calculan dinámicamente basándose en la información oficial del ayuntamiento, pero se mantienen hardcodeados en el código.

## 🚀 Implementación Futura desde Web

### Opción 1: Web Scraping (Requiere Backend)

```javascript
// Función para cargar festivos desde la web del ayuntamiento
async function cargarFestivosDesdeWeb(year) {
  try {
    // Requiere un proxy CORS o backend
    const response = await fetch(`/api/festivos-mataro?year=${year}`);
    const festivos = await response.json();
    return festivos;
  } catch (error) {
    console.warn('No se pudo cargar desde web, usando cálculo local:', error);
    return calcularFestivosMataro(year);
  }
}
```

### Opción 2: API del Ayuntamiento (Ideal)

Si el ayuntamiento proporciona una API:
```javascript
async function cargarFestivosDesdeAPI(year) {
  try {
    const response = await fetch(`https://api.mataro.cat/festivos/${year}`);
    const festivos = await response.json();
    return festivos;
  } catch (error) {
    return calcularFestivosMataro(year);
  }
}
```

### Opción 3: Web Scraping con Backend

```python
# Ejemplo en Python (Flask)
from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/festivos-mataro/<int:year>')
def get_festivos(year):
    url = f"https://www.mataro.cat/ca/la-ciutat/festius-locals"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Parsear la tabla de festivos
    festivos = []
    # ... lógica de parsing
    
    return jsonify(festivos)

if __name__ == '__main__':
    app.run()
```

## 📊 Estructura de Datos Esperada

```json
{
  "year": 2025,
  "festivos": [
    {
      "fecha": "2025-01-01",
      "nombre": "Cap d'Any",
      "tipo": "fijo"
    },
    {
      "fecha": "2025-07-28",
      "nombre": "Santas de Mataró",
      "tipo": "trasladado",
      "fecha_original": "2025-07-26"
    }
  ]
}
```

## 🔄 Ventajas de la Carga desde Web

1. **Siempre actualizado**: Los festivos se mantienen sincronizados con la web oficial
2. **Sin mantenimiento**: No hay que actualizar manualmente el código
3. **Precisión**: Garantiza que los festivos son exactamente los oficiales
4. **Flexibilidad**: Permite cambios de última hora en los festivos

## ⚠️ Consideraciones

### Limitaciones Técnicas
- **CORS**: Los navegadores no permiten hacer requests directos a otros dominios
- **Rate Limiting**: El ayuntamiento puede limitar las peticiones
- **Cambios en la web**: Si cambia la estructura de la página, se rompe el scraping

### Soluciones
1. **Backend Proxy**: Crear un servidor que haga las peticiones
2. **Cache**: Guardar los festivos en cache para evitar peticiones constantes
3. **Fallback**: Mantener el cálculo local como respaldo

## 🛠️ Implementación Recomendada

### Fase 1: Preparación
```javascript
// Función híbrida que intenta web, fallback a cálculo local
async function obtenerFestivosMataro(year) {
  // 1. Intentar cargar desde cache
  if (FESTIVOS_CACHE[year]) {
    return FESTIVOS_CACHE[year];
  }
  
  // 2. Intentar cargar desde web
  try {
    const festivos = await cargarFestivosDesdeWeb(year);
    FESTIVOS_CACHE[year] = festivos;
    return festivos;
  } catch (error) {
    // 3. Fallback a cálculo local
    const festivos = calcularFestivosMataro(year);
    FESTIVOS_CACHE[year] = festivos;
    return festivos;
  }
}
```

### Fase 2: Backend
- Crear un endpoint `/api/festivos-mataro/:year`
- Implementar web scraping en el servidor
- Agregar cache y rate limiting

### Fase 3: Optimización
- Cache inteligente (TTL basado en año)
- Notificaciones de cambios
- Logs de errores y fallbacks

## 📝 Notas

- Los festivos actuales están basados en la información oficial del ayuntamiento
- Se incluye el 8 de diciembre (La Immaculada) que faltaba
- Se mantiene la lógica específica de las Santas de Mataró
- El sistema es robusto y funciona offline como fallback 