let lyrics = [];
let currentLine = 0;
let isPlaying = false;
let playInterval = null;

const lyricsDisplay = document.getElementById('lyricsDisplay');
const lineCounter = document.getElementById('lineCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');

// Load lyrics from file
async function loadLyrics() {
    try {
        const response = await fetch('lyrics.txt');
        const text = await response.text();
        lyrics = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        displayLine();
    } catch (error) {
        lyricsDisplay.textContent = 'Error loading lyrics';
        console.error('Error loading lyrics:', error);
    }
}

function displayLine() {
    if (lyrics.length === 0) return;

    lyricsDisplay.style.opacity = '0';

    setTimeout(() => {
        lyricsDisplay.textContent = lyrics[currentLine];
        lineCounter.textContent = `Line ${currentLine + 1} of ${lyrics.length}`;
        lyricsDisplay.style.opacity = '1';
    }, 100);

    // Update button states
    prevBtn.disabled = currentLine === 0 && !isPlaying;
    nextBtn.disabled = currentLine === lyrics.length - 1 && !isPlaying;
}

function nextLine() {
    if (currentLine < lyrics.length - 1) {
        currentLine++;
        displayLine();
    } else {
        // Stop playing at end
        stopPlaying();
    }
}

function prevLine() {
    if (currentLine > 0) {
        currentLine--;
        displayLine();
    }
}

function togglePlay() {
    if (isPlaying) {
        stopPlaying();
    } else {
        startPlaying();
    }
}

function startPlaying() {
    isPlaying = true;
    playBtn.textContent = 'Stop';
    playBtn.classList.add('playing');

    // If at the end, start from beginning
    if (currentLine >= lyrics.length - 1) {
        currentLine = 0;
        displayLine();
    }

    // Auto-advance every 2 seconds
    playInterval = setInterval(() => {
        nextLine();
    }, 2000);
}

function stopPlaying() {
    isPlaying = false;
    playBtn.textContent = 'Play';
    playBtn.classList.remove('playing');

    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }
}

// Event listeners
nextBtn.addEventListener('click', () => {
    if (!isPlaying) {
        nextLine();
    }
});

prevBtn.addEventListener('click', () => {
    if (!isPlaying) {
        prevLine();
    }
});

playBtn.addEventListener('click', togglePlay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight' && !isPlaying) {
        nextLine();
    } else if (e.code === 'ArrowLeft' && !isPlaying) {
        prevLine();
    }
});

// Initialize
loadLyrics();
