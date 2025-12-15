# Script PowerShell para generar automáticamente flota-images.ts
$flotaPath = "src\assets\img\flota"
$outputPath = "src\app\pages\nosotros\flota-images.ts"

# Obtener todas las imágenes
$imageFiles = @()
$imageFiles += Get-ChildItem -Path $flotaPath -Filter "*.jpg" -ErrorAction SilentlyContinue | ForEach-Object { $_.Name }
$imageFiles += Get-ChildItem -Path $flotaPath -Filter "*.jpeg" -ErrorAction SilentlyContinue | ForEach-Object { $_.Name }
$imageFiles += Get-ChildItem -Path $flotaPath -Filter "*.png" -ErrorAction SilentlyContinue | ForEach-Object { $_.Name }
$imageFiles += Get-ChildItem -Path $flotaPath -Filter "*.webp" -ErrorAction SilentlyContinue | ForEach-Object { $_.Name }

# Ordenar alfabéticamente y eliminar duplicados
$imageFiles = $imageFiles | Sort-Object -Unique

# Generar las rutas de las imágenes
$imagePaths = @()
foreach ($file in $imageFiles) {
    $imagePaths += "  'assets/img/flota/$file'"
}

# Generar el contenido del archivo TypeScript
$imagePathsString = $imagePaths -join ",`n"

$content = @"
// Este archivo se genera automáticamente por el script generate-flota-images.ps1
// No editar manualmente - se regenera cada vez que se ejecuta el script
// Última actualización: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

export const FLOTA_IMAGES: string[] = [
$imagePathsString
];
"@

# Escribir el archivo
$content | Out-File -FilePath $outputPath -Encoding UTF8

Write-Host "✅ Archivo flota-images.ts generado con $($imageFiles.Count) imágenes:" -ForegroundColor Green
$imageFiles | ForEach-Object { Write-Host "   - $_" }
