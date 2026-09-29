# Mapas de Textura Paleogeográfica (Equirrectangulares 2048×1024)

Este directorio aloja las texturas paleogeográficas utilizadas para representar los diferentes hitos geológicos de la deriva continental.

## Especificaciones Técnicas Recomendadas
- **Formato:** WebP (recomendado por compresión y fidelidad) o PNG.
- **Resolución:** 2048 × 1024 píxeles (proporción 2:1 equirrectangular / Plate Carrée).
- **Mapeo:** 
  - Margen superior: +90° Latitud (Polo Norte).
  - Margen inferior: -90° Latitud (Polo Sur).
  - Centro horizontal (U = 0.5): 0° Longitud (Meridiano de Greenwich / Ecuador central).
  - Borde izquierdo (U = 0.0): -180° Longitud (Oeste).
  - Borde derecho (U = 1.0): +180° Longitud (Este).

## Nombres de Archivo Configurados por Periodo
- `0ma_present.webp` - Presente (0 Ma)
- `20ma_miocene.webp` - Mioceno (20 Ma)
- `50ma_eocene.webp` - Eoceno (50 Ma)
- `66ma_kpg.webp` - Límite K-Pg (66 Ma)
- `105ma_cretaceous.webp` - Cretácico Medio (105 Ma)
- `150ma_jurassic.webp` - Jurásico Tardío (150 Ma)
- `200ma_triassic.webp` - Triásico Tardío (200 Ma)
- `250ma_permian.webp` - Límite Pérmico-Triásico (250 Ma)
- `300ma_carboniferous.webp` - Carbonífero Tardío (300 Ma)
- `375ma_devonian.webp` - Devónico Tardío (375 Ma)
- `430ma_silurian.webp` - Silúrico Medio (430 Ma)
- `470ma_ordovician.webp` - Ordovícico Medio (470 Ma)
- `540ma_cambrian.webp` - Cámbrico Temprano (540 Ma)
- `600ma_ediacaran.webp` - Ediacárico Tardío (600 Ma)
- `750ma_cryogenian.webp` - Criogénico / Tierra Bola de Nieve (750 Ma)

## Motor de Respaldo Procedural Automático
Si algún archivo de imagen no se encuentra en este directorio (o mientras se descargan mapas externos como PALEOMAP de C. Scotese), la aplicación **generará automáticamente en memoria** una textura equirrectangular fotorrealista basada en las configuraciones paleogeográficas de cada era (supercontinentes Pangea, Gondwana, Rodinia, fracturas oceánicas, biomas del Carbonífero, glaciaciones del Criogénico, etc.), garantizando que la aplicación sea **100% funcional inmediatamente y offline**.
