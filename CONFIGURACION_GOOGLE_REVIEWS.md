# Configuración de Google Reviews

## Pasos para conectar los testimonios a Google Reviews

### 1. Obtener tu Google Places API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Places API (New)** o **Places API (legacy)**
4. Ve a "Credenciales" y crea una nueva API Key
5. Copia tu API Key

### 2. Obtener tu Place ID

1. Ve a [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Busca tu negocio "Autoescuela Foncillas"
3. Copia el Place ID que aparece

O también puedes:
- Ir a [Google Maps](https://www.google.com/maps)
- Buscar tu negocio
- Hacer clic en tu negocio
- En la URL verás algo como: `.../place/Autoescuela+Foncillas/@42.xxx,-1.xxx,17z/data=...`
- O busca en el código fuente de la página el Place ID

### 3. Configurar el archivo

Abre el archivo `js/google-reviews.js` y reemplaza:

```javascript
const GOOGLE_CONFIG = {
    API_KEY: 'TU_API_KEY_AQUI', // Reemplaza con tu API Key
    PLACE_ID: 'TU_PLACE_ID_AQUI' // Reemplaza con tu Place ID
};
```

### 4. Restricciones de API Key (Recomendado)

Para mayor seguridad, restringe tu API Key:

1. Ve a Google Cloud Console > Credenciales
2. Haz clic en tu API Key
3. En "Restricciones de aplicación":
   - Selecciona "Sitios web HTTP"
   - Agrega tu dominio (ej: `autoescuelafoncillas.es`)
4. En "Restricciones de API":
   - Selecciona "Restringir clave"
   - Marca solo "Places API" o "Places API (New)"

### 5. Verificar funcionamiento

1. Abre `index.html` en tu navegador
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores
4. Los testimonios deberían cargarse automáticamente desde Google Reviews

### Notas importantes

- **Límites de la API**: Google Places API tiene límites de uso. El plan gratuito incluye $200 USD de crédito mensual.
- **CORS**: Si tienes problemas de CORS, necesitarás usar un proxy o configurar tu servidor para permitir las solicitudes.
- **Fallback**: Si la API no funciona, el sitio mostrará los testimonios por defecto que están en el HTML.

### Solución de problemas

**Error: "API key not valid"**
- Verifica que tu API Key sea correcta
- Asegúrate de que la Places API esté habilitada

**Error: "CORS policy"**
- Necesitas usar un servidor web (no solo abrir el archivo HTML)
- O configura un proxy para las solicitudes

**No se muestran reseñas**
- Verifica que tu negocio tenga reseñas en Google
- Verifica que el Place ID sea correcto
- Revisa la consola del navegador para ver errores

### Alternativa: Widget de Google Reviews

Si prefieres no usar la API, puedes usar el widget oficial de Google:

```html
<!-- Widget de Google Reviews -->
<script src="https://apis.google.com/js/platform.js" async defer></script>
<div class="g-review" data-reviewid="TU_REVIEW_ID"></div>
```

Pero esto requiere que tengas un Google My Business configurado y que compartas el enlace de reseña.

