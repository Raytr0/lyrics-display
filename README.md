# Lyrics Display

A simple, elegant web application for displaying song lyrics one line at a time with playback controls.

## Features

- **One-line display** - Shows lyrics individually for easy reading
- **Playback controls** - Play/Pause, Next, and Previous buttons
- **Auto-advance** - Automatically progresses through lyrics every 2 seconds
- **Progress bar** - Visual indicator of current position in the song
- **Line counter** - Shows "Line X of Y" for navigation reference
- **Keyboard shortcuts** - Fully usable without a mouse
  - `Space` - Play/Pause toggle
  - `←` - Previous line
  - `→` - Next line
- **Responsive design** - Works on desktop and mobile devices
- **Accessible** - ARIA labels and keyboard-navigable

## Getting Started

### Prerequisites

- A modern web browser
- A local web server (required for loading lyrics.txt)

### Running the App

1. Open a terminal in this directory
2. Start a local server:

```bash
# Python 3
python -m http.server

# Or with Node.js
npx serve
```

3. Open `http://localhost:8000` in your browser

## Project Structure

```
lyrics-display/
├── index.html      # Main HTML structure
├── style.css      # Styling and animations
├── app.js         # Application logic
├── lyrics.txt     # Song lyrics (plain text, one line per lyric)
└── README.md      # This file
```

## Customization

### Adding Your Own Lyrics

Edit `lyrics.txt` with your song lyrics. Each line in the file becomes one display line.

### Changing the Song Title

Edit the `<h1 class="song-title">` element in `index.html`.

## Technology

- Plain HTML5, CSS3, and JavaScript
- No frameworks or dependencies
- Google Fonts (Playfair Display, Source Sans 3)

## License

MIT
