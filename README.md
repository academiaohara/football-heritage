# Football Heritage ⚽

Una sátira de corrupción futbolística donde tomas decisiones cruciales como presidente durante generaciones de legados.

## Descripción

Gestiona tu club de fútbol a través de múltiples legados de presidentes. Toma decisiones difíciles que afectan las finanzas, la prensa, el vestuario y el poder político del club. ¿Podrás llevar a tu club a la gloria europea?

## Características

- **100 cartas** de eventos únicos, cada una con dos opciones
- **Sistema de swipe / drag** interactivo (toca o arrastra las cartas)
- **4 estadísticas** a gestionar: Dinero 💰, Prensa 📣, Vestuario ⚽ y Poder 👑
- **Sistema de legados** con múltiples presidentes
- **10 logros** desbloqueables
- **Motes / apodos** ganados por legado
- **Escudos** personalizables: 4 diseños × 6 esquemas de color
- Compatible con **PC y dispositivos móviles**
- Guardado automático del progreso en `localStorage`

## Cómo ejecutar

El juego es un archivo HTML standalone que funciona directamente en el navegador. Sin embargo, para evitar problemas con rutas locales se recomienda servir desde un servidor HTTP.

### Python (recomendado si ya lo tienes instalado):

```bash
python3 -m http.server 8000
```

Luego abre <http://localhost:8000> en tu navegador (verás la landing page con el botón **JUGAR**).

### Node.js / npx:

```bash
npx serve .
```

### VS Code:

Instala la extensión **Live Server** y haz clic en *Go Live* en la barra de estado.

## Controles

| Acción | PC | Móvil |
|---|---|---|
| Opción A (derecha) | Arrastrar la carta a la derecha o botón derecho | Deslizar a la derecha |
| Opción B (izquierda) | Arrastrar la carta a la izquierda o botón izquierdo | Deslizar a la izquierda |

## Estructura del proyecto

```
/
├── index.html              # Landing page con botón "JUGAR"
├── football_heritage.html  # Juego completo standalone (archivo principal)
├── manifest.json           # Metadatos PWA básicos
├── README.md               # Este archivo
├── GUIA.md                 # Guía detallada del juego
├── css/                    # Archivos modulares (para desarrollo futuro)
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/                     # Archivos modulares (para desarrollo futuro)
│   ├── data.js
│   ├── game.js
│   ├── ui.js
│   ├── swipe.js
│   └── main.js
└── assets/
    └── .gitkeep            # Carpeta reservada para futuros assets
```

> **Nota:** Los archivos en `css/` y `js/` son una versión modular en desarrollo. El juego funcional y completo es `football_heritage.html`.

## GitHub Pages

El proyecto está disponible en: <https://academiaohara.github.io/football-heritage/>

## Arquitectura de módulos

```
data.js  (sin dependencias)
   ↑
game.js  (importa data.js; registra un callback de render para evitar
   ↑      dependencias circulares con ui.js)
   ↑
ui.js    (importa data.js y game.js; importa attachSwipeListeners de swipe.js)
   ↑
swipe.js (importa DRAG y choose de game.js)
   ↑
main.js  (importa ui.js y game.js; registra el callback; expone funciones a window)
```

## Tecnologías utilizadas

- **HTML5** semántico
- **CSS3** con Custom Properties (variables) y Grid Layout
- **JavaScript ES6+** — módulos nativos (`import` / `export`)
- **Pointer Events API** para gestos táctiles y drag unificado
- `localStorage` para persistencia del progreso
- Sin frameworks ni dependencias externas

## Compatibilidad

| Navegador | Versión mínima |
|---|---|
| Chrome / Edge | 61+ |
| Firefox | 60+ |
| Safari | 10.1+ |
| iOS Safari | 10.3+ |
| Android Chrome | 61+ |
