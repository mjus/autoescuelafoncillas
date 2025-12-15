// Script para generar automáticamente el archivo flota-images.ts con todas las imágenes
import * as fs from 'fs';
import * as path from 'path';

const flotaPath = path.join(__dirname, 'src', 'assets', 'img', 'flota');
const outputPath = path.join(__dirname, 'src', 'app', 'pages', 'nosotros', 'flota-images.ts');

try {
  // Leer todos los archivos de imagen de la carpeta
  const files = fs.readdirSync(flotaPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  ).sort();

  // Generar el contenido del archivo TypeScript
  const imagePaths = imageFiles.map(file => 
    `  'assets/img/flota/${file}'`
  ).join(',\n');

  const content = `// Este archivo se genera automáticamente por el script generate-flota-images.ts
// No editar manualmente - se regenera cada vez que se ejecuta el script
// Última actualización: ${new Date().toLocaleString()}

export const FLOTA_IMAGES: string[] = [
${imagePaths}
];
`;

  // Escribir el archivo
  fs.writeFileSync(outputPath, content, 'utf8');
  
  console.log(`✅ Archivo flota-images.ts generado con ${imageFiles.length} imágenes:`);
  imageFiles.forEach(file => console.log(`   - ${file}`));
} catch (error) {
  console.error('❌ Error al generar flota-images.ts:', error);
  process.exit(1);
}


