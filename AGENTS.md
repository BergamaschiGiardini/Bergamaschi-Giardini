# Istruzioni Codex specifiche del repository

Compilare questo file una volta per progetto. Inserire soltanto regole tecniche e operative specifiche del repository, senza ripetere l'AGENTS.md globale o i brief.

## Brief Google Docs

- Cartella del sito sotto `SITI WEB`: https://drive.google.com/drive/folders/1bT2HMncbXVfZTEZG7aGPYS9N8_Rjy9go
- Fonte di verità dei brief: https://docs.google.com/document/d/1QG9eyqHQBtPMOnUgfjeXXEdGk0lV-lyZOB1Y9-452gM/edit
- SITE_BRIEF: https://docs.google.com/document/d/11TIR5fn7jFM1B65wPmp4nRbgq0VAFg0Cl5zlw7QLwkA/edit
- PAGE_BRIEF e SECTION_BRIEF: https://drive.google.com/drive/folders/1Gpe6g43-5vnnlqSp0sk-lLjZJcjqCNtU
- REGISTRO_REFERENCE_E_ASSET: https://docs.google.com/document/d/1JtMTYQU5qOmxLOk_pflv9SzeEmIxpPtiyM6WgNxTvXo/edit
- Codex legge soltanto i Google Docs indicati dal prompt o da questo elenco.
- Codex non crea, modifica, rinomina, sposta o elimina Google Docs.
- Codex legge solo i Docs della cartella del sito indicata; non accede a brief di altri siti.
- Lo stato `APPROVATO` dei brief e la disponibilità di reference/materiali sono precondizioni per l'implementazione.

## Stack

- Linguaggi / framework: sito statico multipagina in HTML5 e CSS3, con dati strutturati Schema.org in JSON-LD inline; nessun framework e nessun JavaScript applicativo presenti.
- Package manager: Non presente.
- Versioni rilevanti: Non presenti nel repository.

## Comandi

- Installazione dipendenze: Non presente.
- Avvio locale: VS Code Live Server configurato sulla porta `5501` in `.vscode/settings.json`; comando CLI non presente.
- Build: Non presente.
- Lint: Non presente.
- Test: Non presente.
- Preview: VS Code Live Server sulla porta `5501`; comando CLI non presente.

## Struttura del progetto

- Entry point: `index.html`.
- Pagine: home in `index.html`; 6 pagine di secondo livello in `Rank2/`; 9 pagine di terzo livello in `Rank3/`.
- Componenti condivisi: nessun sistema di componenti o template; navbar, hero, pulsanti, sezioni di contatto e footer usano classi condivise ma hanno markup ripetuto nei file HTML.
- Stili / design token: `css/style.css` contiene reset, variabili CSS in `:root`, tipografia e componenti globali; i fogli `css/contatti.css`, `css/style-irrigazione.css`, `css/potature-treeclimbing.css`, `css/prato.css`, `css/provincia-bergamo.css` e `css/style-rank2.css` sono dedicati alle pagine Rank2; `css/style-rank3.css` è condiviso dalle pagine Rank3.
- Asset: immagini, logo, favicon e Web App Manifest in `img/`; fotografie delle pagine interne in `img/rank2/`.
- Brief: Non presenti nel repository; i link del blocco “Brief Google Docs” non sono compilati.

## Convenzioni tecniche

- Naming: nomi pagina prevalentemente in kebab-case; preservare l'eccezione case-sensitive `Rank2/provincia-Bergamo.html`. Le classi CSS seguono prevalentemente la forma BEM `blocco__elemento--modificatore`, con alcune classi legacy in italiano.
- Organizzazione CSS: ogni pagina carica prima `/css/style.css` e poi, quando previsto, un foglio specifico; mantenere questo ordine per la cascata. Le pagine Rank3 condividono `/css/style-rank3.css`.
- Breakpoint: il CSS globale usa `1280px`, `1080px`, `920px`, `720px`, `460px` e `360px`, oltre a `prefers-reduced-motion`; i fogli pagina aggiungono `1100px` e `900px` e riutilizzano `920px`, `720px` e `460px` secondo necessità.
- Componenti da riutilizzare: token di `:root` e classi globali `site-navbar`, `hero`, `btn`, `service-card`, `contact` e `footer`; il markup condiviso resta duplicato nelle singole pagine.
- Regole accessibilità / SEO specifiche: mantenere un solo `h1` per pagina, landmark semantici, testi `alt`, etichette `aria-*`, meta viewport e description, favicon/manifest e JSON-LD. Le pagine Rank3 includono anche URL canonical; `robots.txt` rimanda a `sitemap.xml`.

## Elementi delicati

- File da non riscrivere: `AGENTS.md.backup-*`.
- Comportamenti da preservare: navigazione e collegamenti root-relative (`/...`), dropdown servizi gestito in CSS, layout responsive, CTA `tel:`/`mailto:`, iframe e link di Google Maps, e coerenza manuale di navbar/footer tra tutte le pagine.
- Dipendenze o integrazioni: Google Fonts (`Inter` e `Playfair Display`) importati da `fonts.googleapis.com`; Google Maps; link esterni a Instagram, Facebook, TermsFeed e Iubenda; GitHub come remote Git.
- Limitazioni note: non sono presenti automazioni di build, lint o test, JavaScript applicativo, form o template condivisi. L'asset `/img/aree-servite-bergamo-giardiniere.jpg` è assente ma viene referenziato da cinque fogli CSS.

## Pubblicazione

- Hosting: GitHub Pages, indicato in `img/README.txt`, con dominio personalizzato `bergamaschi-giardini.com` definito in `CNAME`.
- Branch di pubblicazione: Da definire; nessuna configurazione presente identifica il branch di pubblicazione.
- Comando o procedura: Non presente.

Non eseguire commit, push o pubblicazione salvo richiesta esplicita.
