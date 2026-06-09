# Image optimization script for Palafoxiana redesign
# Requires: ImageMagick (magick command) or use online tools

$assetsDir = "C:\COSAS\PROYECTOS\Palafoxiana\palafoxiana-redesign\assets"
$outputDir = "C:\COSAS\PROYECTOS\Palafoxiana\palafoxiana-redesign\assets\optimized"

# Create output directory
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# Target max dimensions and quality
$maxWidth = 1200
$maxHeight = 1600
$quality = 80

# Files to optimize (the huge gallery images)
$largeImages = @(
    "MG_2220.jpg", "MG_2221.jpg", "MG_2224.jpg", "MG_2234.jpg", "MG_2235.jpg",
    "MG_2237.jpg", "MG_2278.jpg", "MG_2283.jpg", "MG_2285.jpg", "MG_2286.jpg",
    "MG_2298.jpg", "MG_2304.jpg", "MG_2306.jpg", "MG_2308.jpg", "MG_2309.jpg",
    "MG_2310.jpg", "MG_2337.jpg", "MG_2338.jpg", "MG_2346.jpg", "MG_2348.jpg"
)

# Also optimize other large images
$otherLarge = @(
    "frenteinterior450x300_obxdad.jpg",  # 2.6 MB
    "interior_1.webp",                     # 10.7 MB
    "liber_chronicarum.jpg",               # 1 MB
    "libros_hq.jpg",                       # 326 KB
    "puerta_hq.jpg",                       # 738 KB
    "quijote_1605.jpg",                    # 761 KB
    "vesalius_fabrica.jpg"                 # 572 KB
)

Write-Host "Optimizing large gallery images..." -ForegroundColor Cyan
foreach ($img in $largeImages) {
    $inputPath = Join-Path $assetsDir $img
    $outputPath = Join-Path $outputDir $img
    if (Test-Path $inputPath) {
        Write-Host "Processing $img..." -ForegroundColor Yellow
        # Using ImageMagick: magick input.jpg -resize 1200x1600\> -quality 80 -strip output.jpg
        magick $inputPath -resize "${maxWidth}x${maxHeight}>" -quality $quality -strip $outputPath
        $origSize = (Get-Item $inputPath).Length / 1MB
        $newSize = (Get-Item $outputPath).Length / 1KB
        Write-Host "  $img: $([math]::Round($origSize,1)) MB -> $([math]::Round($newSize,0)) KB" -ForegroundColor Green
    }
}

Write-Host "`nOptimizing other large images..." -ForegroundColor Cyan
foreach ($img in $otherLarge) {
    $inputPath = Join-Path $assetsDir $img
    $outputPath = Join-Path $outputDir $img
    if (Test-Path $inputPath) {
        Write-Host "Processing $img..." -ForegroundColor Yellow
        magick $inputPath -resize "${maxWidth}x${maxHeight}>" -quality $quality -strip $outputPath
        $origSize = (Get-Item $inputPath).Length / 1MB
        $newSize = (Get-Item $outputPath).Length / 1KB
        Write-Host "  $img: $([math]::Round($origSize,1)) MB -> $([math]::Round($newSize,0)) KB" -ForegroundColor Green
    }
}

Write-Host "`nDone! Optimized images in: $outputDir" -ForegroundColor Cyan
Write-Host "Replace originals in assets/ with optimized versions from assets/optimized/" -ForegroundColor Yellow