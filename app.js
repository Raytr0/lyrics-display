let lyrics = [];
let currentLine = 0;
let isPlaying = false;
let playInterval = null;

const lyricsDisplay = document.getElementById('lyricsDisplay');
const lineCounter = document.getElementById('lineCounter');
const progressFill = document.querySelector('.progress-fill');
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

function updateProgress() {
    const progress = ((currentLine + 1) / lyrics.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function displayLine() {
    if (lyrics.length === 0) return;

    // Fade out
    lyricsDisplay.classList.remove('fade-in');
    lyricsDisplay.classList.add('fade-out');

    setTimeout(() => {
        // Update content while hidden
        lyricsDisplay.textContent = lyrics[currentLine];
        lineCounter.textContent = `Line ${currentLine + 1} of ${lyrics.length}`;
        updateProgress();

        // Fade in
        lyricsDisplay.classList.remove('fade-out');
        lyricsDisplay.classList.add('fade-in');
    }, 250);

    updateButtonStates();
}

function updateButtonStates() {
    const atStart = currentLine === 0;
    const atEnd = currentLine === lyrics.length - 1;

    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
}

function nextLine() {
    if (currentLine < lyrics.length - 1) {
        currentLine++;
        displayLine();
    } else {
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
    playBtn.textContent = 'Pause';
    playBtn.classList.add('playing');

    // If at the end, start from beginning
    if (currentLine >= lyrics.length - 1) {
        currentLine = 0;
        displayLine();
    }

    // Enable navigation while playing
    prevBtn.disabled = false;
    nextBtn.disabled = false;

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

    updateButtonStates();
}

// Event listeners
nextBtn.addEventListener('click', nextLine);
prevBtn.addEventListener('click', prevLine);
playBtn.addEventListener('click', togglePlay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight') {
        nextLine();
    } else if (e.code === 'ArrowLeft') {
        prevLine();
    }
});

// Initialize
loadLyrics();
