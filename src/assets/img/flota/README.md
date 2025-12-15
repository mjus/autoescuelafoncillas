# Carpeta de Imágenes de la Flota

Esta carpeta contiene todas las imágenes que se muestran en el slider de "Nuestra Flota" en la página "Nosotros".

## Cómo funciona

Las imágenes se cargan **dinámicamente** desde esta carpeta. El sistema detecta automáticamente todas las imágenes (`.jpg`, `.jpeg`, `.png`, `.webp`) y las muestra en el slider.

## Añadir nuevas imágenes

1. **Coloca las nuevas imágenes** en esta carpeta (`src/assets/img/flota/`)
2. **Ejecuta el script** para regenerar la lista:
   ```powershell
   npm run generate-flota
   ```
   O directamente:
   ```powershell
   powershell -ExecutionPolicy Bypass -File generate-flota-images.ps1
   ```
3. **Reinicia el servidor de desarrollo** si está corriendo:
   ```powershell
   npm start
   ```

## Automatización

El script se ejecuta automáticamente:
- **Antes de iniciar** el servidor (`npm start`)
- **Antes de compilar** para producción (`npm run build`)

## Formato de imágenes

- Formatos soportados: `.jpg`, `.jpeg`, `.png`, `.webp`
- No importa el nombre del archivo
- Las imágenes se ordenan alfabéticamente
- Se recomienda usar nombres descriptivos para facilitar la organización

## Nota

El archivo `src/app/pages/nosotros/flota-images.ts` se genera automáticamente. **No lo edites manualmente**, se sobrescribirá la próxima vez que ejecutes el script.

