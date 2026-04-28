# Football Heritage ⚽

Un juego de gestión de clubes de fútbol donde tomas decisiones cruciales como presidente durante generaciones de legados.

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

El juego usa módulos ES6 nativos, por lo que **necesita servirse desde un servidor HTTP** (no funciona abriendo el archivo directamente con `file://`).

### Python (recomendado si ya lo tienes instalado):

```bash
python3 -m http.server 8000
```

Luego abre <http://localhost:8000> en tu navegador.

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
├── index.html              # HTML semántico y limpio
├── manifest.json           # Metadatos PWA básicos
├── css/
│   ├── main.css            # Reset, variables CSS y contenedor #app
│   ├── components.css      # Estilos de componentes (cards, stats, botones…)
│   └── responsive.css      # Media queries para móvil / tablet / desktop
├── js/
│   ├── data.js             # Datos estáticos: cartas, escudos, colores, logros
│   ├── game.js             # Estado del juego y lógica principal
│   ├── ui.js               # Renderizado de pantallas y templates HTML
│   ├── swipe.js            # Sistema de gestos táctiles (Pointer Events)
│   └── main.js             # Punto de entrada: inicialización y orquestación
├── assets/
│   └── .gitkeep            # Carpeta reservada para futuros assets
└── README.md               # Este archivo
```

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
