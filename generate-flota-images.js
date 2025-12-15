// Script Node.js para generar automáticamente flota-images.ts
// Funciona en Windows, Linux y macOS

const fs = require('fs');
const path = require('path');

const flotaPath = path.join('src', 'assets', 'img', 'flota');
const outputPath = path.join('src', 'app', 'pages', 'nosotros', 'flota-images.ts');

// Extensiones de imagen permitidas
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

try {
  // Leer el directorio de flota
  if (!fs.existsSync(flotaPath)) {
    console.warn(`⚠️  Directorio ${flotaPath} no existe. Creando archivo vacío.`);
    const emptyContent = `// Este archivo se genera automáticamente por el script generate-flota-images.js
// No editar manualmente - se regenera cada vez que se ejecuta el script
// Última actualización: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}

export const FLOTA_IMAGES: string[] = [];
`;
    fs.writeFileSync(outputPath, emptyContent, 'utf8');
    console.log('✅ Archivo flota-images.ts generado (vacío)');
    process.exit(0);
  }

  // Obtener todos los archivos del directorio
  const files = fs.readdirSync(flotaPath);
  
  // Filtrar solo archivos de imagen
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  // Ordenar alfabéticamente
  imageFiles.sort();

  // Generar las rutas de las imágenes
  const imagePaths = imageFiles.map(file => `  'assets/img/flota/${file}'`);

  // Generar el contenido del archivo TypeScript
  const content = `// Este archivo se genera automáticamente por el script generate-flota-images.js
// No editar manualmente - se regenera cada vez que se ejecuta el script
// Última actualización: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}

export const FLOTA_IMAGES: string[] = [
${imagePaths.join(',\n')}
];
`;

  // Escribir el archivo
  fs.writeFileSync(outputPath, content, 'utf8');

  console.log(`✅ Archivo flota-images.ts generado con ${imageFiles.length} imágenes:`);
  imageFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
} catch (error) {
  console.error('❌ Error al generar flota-images.ts:', error.message);
  process.exit(1);
}

