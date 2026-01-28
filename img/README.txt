Metti questi file nella cartella /img del repo (GitHub Pages):

- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- favicon-48x48.png
- favicon-96x96.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- site.webmanifest

Poi aggiungi nell' <head> di ogni pagina:

<link rel="icon" href="/img/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/img/site.webmanifest">

Nota: ho creato due basi:
- base-monogram.png (consigliata per favicon, leggibile anche a 16px)
- base-full.png (logo intero, se la vuoi usare per altro)
