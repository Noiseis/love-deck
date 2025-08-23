const deck = document.getElementById('deck');
const shuffleBtn = document.getElementById('shuffleBtn');
const music = document.getElementById('bgMusic');
const heartsContainer = document.getElementById("hearts-container");

// === START: NEW PLAYER DOM ELEMENTS ===
const playerContainer = document.getElementById('player-container');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const playingStatus = document.getElementById('playing-status');
const infoContainer = document.getElementById('info-container');
const defaultAlbumArt = "https://i.postimg.cc/d1yBf2MV/pngegg.png";
// === END: NEW PLAYER DOM ELEMENTS ===


const messageHistory = [];
const imageHistory = [];
const HISTORY_LIMIT = 9; // 3 cards x 3 cycles

function randomPetalColor() {
  const colors = ['#ffc2d1', '#ffdde1', '#ffe3ec', '#fbb1bd', '#ffa8c9'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createFallingPetals(x, y) {
  for (let i = 0; i < 8; i++) {
    const color = randomPetalColor();

    const petal = document.createElement('div');
    petal.classList.add('petal-svg');
    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;

    const size = 12 + Math.random() * 8; 
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.2}px`;

    const angle = -60 + Math.random() * 120;
    const distance = 80 + Math.random() * 60;
    const dx = Math.cos(angle * Math.PI / 180) * distance;
    const dy = Math.sin(angle * Math.PI / 180) * distance;

    petal.style.setProperty('--dx', `${dx}px`);
    petal.style.setProperty('--dy', `${dy + 80}px`);
    petal.style.setProperty('--rot', `${Math.random() * 360}deg`);

    petal.innerHTML = `
      <svg viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0 C14 0, 20 10, 10 30 C0 10, 6 0, 10 0"
              fill="${color}" />
      </svg>`;

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 2500);
  }
}

document.body.addEventListener('click', (e) => {
  createFallingPetals(e.clientX, e.clientY);
});

const messages = [
    "Even silence with you is music 🎵", "Every fight just made us stronger 💪", "To infinity and beyond with you 🚀", "You make my heart skip a beat 💓", "Your smile lights up my world ✨", "With you, every day is a blessing 🌸", "You're my favorite person ❤️", "Holding hands forever 🤝", "We are a love story in motion 🎬", "You are my sunshine on a cloudy day ☀️", "You complete my 🧩", "Every moment with you is a treasure 💎", "You make my heart dance 💃", "You are the missing piece of my ❤️", "You are the peanut butter to my jelly 🥜🍇", "You are my rock in stormy seas 🌊", "You are the reason I believe in love ❤️", "You are my forever and always 💞", "You are the melody to my song 🎶", "You’re the dream I never want to wake up from 🌙💤", "My heart found its home in you 🏡❤️", "Loving you is my favorite adventure 🌍🗺️", "You’re the reason my soul dances 💃🎶", "Forever isn’t long enough with you ⏳💘", "You turn ordinary moments into magic ✨🎩", "My love for you grows with every sunrise 🌅❤️", "You’re my favorite ‘good morning’ and ‘goodnight’ 🌞🌙", "With you, even the little things feel extraordinary ✨", "You’re my happy place in this chaotic world 🧘‍♂️💖", "Your love is my favorite kind of therapy 💆‍♀️❤️", "You’re the sparkle in my sparkle ✨💎", "I fall for you more every single day 🍂💞", "You’re my favorite ‘what if’ that came true 🤯💖", "Your hugs are my safe haven 🤗🏰", "You make my heart do somersaults 🤸‍♂️💓", "You’re the best part of my story 📖❤️", "Loving you feels like breathing—natural and essential 🌬️💘", "You’re my favorite notification 🔔💌", "With you, forever still feels too short ⏳💞", "You’re the calm in my chaos 🌪️❤️", "My heart sings your name 🎤💘", "You’re the magic in my mundane ✨📅", "With you, love feels effortless ⚡💞", "You’re my favorite thought every day 🤔💖", "Your love is my favorite addiction 💉❤️", "You turn my scars into stars 🌟🩹", "You’re my always and my everything ⏳💎", "Your laugh is my favorite melody 🎶😄", "You’re the fire in my soul 🔥❤️", "Loving you is my greatest adventure 🗺️💘", "You’re the answer to prayers I never spoke 🙏💖", "With you, I’ve found forever in a glance 👀⏳", "You’re my favorite ‘what’s next?’ ➡️❤️", "Your love is my favorite kind of gravity 🌍💞", "You’re the rainbow after all my storms 🌈⛈️", "My heart beats in sync with yours 💓🔁", "You’re the peace my soul was searching for ☮️💖", "Every love story is beautiful, but ours is my favorite 📖❤️", "You’re my today, tomorrow, and always 📅💘",
];

let unshownMessages = [...messages];
let lastShownMessageIndex = -1;

const imagePaths = Array.from({ length: 41 }, (_, i) => `images/${i + 1}.avif`);
let cards = []; 

let unshownImages = [...imagePaths];
let lastShownImageIndex = -1;

function generateRandomCards(count = 3) {
  const selectedMessages = [];
  for (let i = 0; i < count; i++) {
    if (unshownMessages.length === 0) {
      unshownMessages = messages.filter((_, idx) => idx !== lastShownMessageIndex);
    }
    const randomIndex = Math.floor(Math.random() * unshownMessages.length);
    const message = unshownMessages[randomIndex];
    lastShownMessageIndex = messages.indexOf(message);
    unshownMessages.splice(randomIndex, 1);
    selectedMessages.push(message);
    messageHistory.push(message);
    while (messageHistory.length > HISTORY_LIMIT) {
      messageHistory.shift();
    }
  }

  const selectedImages = [];
  for (let i = 0; i < count; i++) {
    if (unshownImages.length === 0) {
      unshownImages = imagePaths.filter((_, idx) => idx !== lastShownImageIndex);
    }
    const randomIndex = Math.floor(Math.random() * unshownImages.length);
    const imagePath = unshownImages[randomIndex];
    lastShownImageIndex = imagePaths.indexOf(imagePath);
    unshownImages.splice(randomIndex, 1);
    selectedImages.push(imagePath);
    imageHistory.push(imagePath);
    while (imageHistory.length > HISTORY_LIMIT) {
      imageHistory.shift();
    }
  }

  return selectedMessages.map((message, i) => ({
    message,
    image: selectedImages[i]
  }));
}

function renderCards(animated = true) {
  deck.innerHTML = '';
  cards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    if (animated) {
      card.style.animation = index < 3 ? 'flyInLeft 0.6s ease forwards' : 'flyInRight 0.6s ease forwards';
      card.style.animationDelay = `${index * 0.1}s`;
    } else {
      card.style.opacity = 1;
    }

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❤️ Click</div>
        <div class="card-back">
          <img src="${cardData.image}" alt="Memory Image" />
          <p>${cardData.message}</p>
        </div>
      </div>`;
    
    card.addEventListener('click', () => handleCardClick(card));
    deck.appendChild(card);
  });
}

function handleCardClick(clickedCard) {
  const currentlyFlipped = document.querySelector('.card.flipped');
  if (currentlyFlipped && currentlyFlipped !== clickedCard) {
    currentlyFlipped.classList.remove('flipped');
    setTimeout(() => {
      clickedCard.classList.add('flipped');
    }, 400);
  } else {
    clickedCard.classList.toggle('flipped');
  }
}

function shuffleCards() {
  const cardsDOM = [...document.querySelectorAll('.card')];
  cardsDOM.forEach((card, index) => {
    card.classList.remove('flipped');
    card.style.animation = `flyUp 0.4s ease forwards`;
    card.style.animationDelay = `${index * 0.05}s`;
  });

  setTimeout(() => {
    cards = generateRandomCards(3);
    renderCards(true);
  }, 500);
}

const musicFiles = Array.from({ length: 30 }, (_, i) => `music/love${i + 1}.mp3`);
let musicStarted = false;
let unplayedSongs = [...musicFiles];
let lastPlayedSongIndex = -1;

function playRandomSong() {
  if (unplayedSongs.length === 0) {
    unplayedSongs = musicFiles.filter((_, idx) => idx !== lastPlayedSongIndex);
  }

  const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
  const songPath = unplayedSongs[randomIndex];
  lastPlayedSongIndex = musicFiles.indexOf(songPath);
  unplayedSongs.splice(randomIndex, 1);

  music.src = songPath;
  updatePlayerUI(songPath); 

  music.load();
  music.volume = 1;
  music.play().catch(err => console.log("Autoplay blocked:", err));
}
function fadeOutAndShuffleMusic() {
  const fadeDuration = 1000;
  const steps = 10;
  let vol = music.volume;
  const fade = setInterval(() => {
    vol -= (1 / steps);
    if (vol <= 0) {
      clearInterval(fade);
      music.pause();
      playRandomSong();
    } else {
      music.volume = vol;
    }
  }, fadeDuration / steps);
}

function startMusicOnFirstClick() {
  document.body.addEventListener("click", function handler() {
    if (!musicStarted) {
      playRandomSong();
      musicStarted = true;
    }
    document.body.removeEventListener("click", handler);
  });
}

// ... (Rest of your existing functions like startHeartSpawning, launchHearts etc. remain here)
function startHeartSpawning() {
  setInterval(() => launchHearts(), 400);
}

// REPLACE your old launchHearts function with this one
function launchHearts() {
  const svgHeart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgHeart.setAttribute("viewBox", "0 0 24 24");
  svgHeart.classList.add("heart-svg");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", randomColor());
  path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");

  svgHeart.appendChild(path);

  // --- These crucial styles position the heart correctly ---
  svgHeart.style.position = "absolute";
  svgHeart.style.left = `${Math.random() * 100}vw`; // Use 'vw' for viewport width
  svgHeart.style.bottom = "-30px"; // Start just below the screen
  svgHeart.style.width = "24px";
  svgHeart.style.height = "24px";
  // --- End of crucial styles ---

  const duration = 4 + Math.random() * 4; // A slightly longer, more graceful animation
  svgHeart.style.animation = `floatUp ${duration}s linear forwards`;
  heartsContainer.appendChild(svgHeart);

  // Clean up the heart from the DOM after its animation is complete
  setTimeout(() => {
    svgHeart.remove();
  }, duration * 1000);
}
function randomColor() {
  const colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#ff3366', '#ff6699'];
  return colors[Math.floor(Math.random() * colors.length)];
}


// === START: NEW MUSIC PLAYER LOGIC ===

function updatePlayerUI(songPath) {
    fetch(songPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            window.jsmediatags.read(blob, {
                onSuccess: (tag) => {
                    const tags = tag.tags;
                    songTitle.textContent = tags.title || songPath.split('/').pop().replace(/\.mp3/i, '');
                    playingStatus.textContent = tags.artist || "Now Playing";
                    checkTitleOverflow();
                    if (tags.picture) {
                        const { data, format } = tags.picture;
                        let base64String = "";
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                        }
                        albumArt.src = `data:${format};base64,${window.btoa(base64String)}`;
                    } else {
                        albumArt.src = defaultAlbumArt;
                    }
                },
                onError: (error) => {
                    console.warn('Could not read metadata:', error);
                    songTitle.textContent = songPath.split('/').pop().replace(/\.mp3/i, '');
                    playingStatus.textContent = "Now Playing";
                    albumArt.src = defaultAlbumArt;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching song for metadata:', error);
            songTitle.textContent = songPath.split('/').pop().replace(/\.mp3/i, '');
            playingStatus.textContent = "Error loading song";
            albumArt.src = defaultAlbumArt;
        });
}


function checkTitleOverflow() {
    setTimeout(() => {
        if (songTitle.scrollWidth > songTitle.parentElement.clientWidth) {
            songTitle.classList.add('marquee');
        } else {
            songTitle.classList.remove('marquee');
        }
    }, 100);
}

function updatePlayerTheme(imgElement) {
    const canvas = document.createElement('canvas');
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    try {
        const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const primaryColor = getDominantColor(pixelData);
        const textColor = getReadableTextColor(primaryColor);
        const gradient = `linear-gradient(110deg, rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, 0.7), rgba(${primaryColor.r - 20}, ${primaryColor.g - 20}, ${primaryColor.b - 20}, 0.7))`;
        
        infoContainer.style.background = gradient;
        songTitle.style.color = textColor;
        playingStatus.style.color = textColor;
    } catch (e) {
        console.error("Theming error (likely CORS):", e);
        infoContainer.style.background = '';
        songTitle.style.color = '';
        playingStatus.style.color = '';
    }
}

function getDominantColor(data) {
    const colorCounts = {};
    let maxCount = 0;
    let dominantColor = { r: 252, g: 142, b: 172 }; // Default to pink
    for (let i = 0; i < data.length; i += 20) { // Sample pixels for performance
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const key = `${r},${g},${b}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
        if (colorCounts[key] > maxCount) {
            maxCount = colorCounts[key];
            dominantColor = { r, g, b };
        }
    }
    return dominantColor;
}

function getReadableTextColor(backgroundRgb) {
    const yiq = ((backgroundRgb.r * 299) + (backgroundRgb.g * 587) + (backgroundRgb.b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
}

albumArt.onload = () => {
    if (albumArt.src.startsWith('data:')) {
        updatePlayerTheme(albumArt);
    } else {
        infoContainer.style.background = '';
        songTitle.style.color = '';
        playingStatus.style.color = '';
    }
};

music.addEventListener('play', () => {
    albumArt.classList.remove('paused');
    albumArt.classList.add('album-art-rotating');
});

music.addEventListener('pause', () => {
    albumArt.classList.add('paused');
});

music.addEventListener("ended", playRandomSong);

shuffleBtn.addEventListener("click", shuffleCards);

const nextMusicBtn = document.getElementById("nextMusicBtn");
nextMusicBtn.addEventListener("click", fadeOutAndShuffleMusic);

// === END: NEW MUSIC PLAYER LOGIC ===

// Initial Setup
cards = generateRandomCards(3);
renderCards(true);
startMusicOnFirstClick();
startHeartSpawning();
// Add this to the end of the file
// ADD THIS NEW, MORE ROBUST HOVER LOGIC
const hoverTrigger = document.getElementById('hover-trigger');
let hidePlayerTimeout; // Timer to manage hiding

// A function to show the player and cancel any pending hide actions
function showPlayer() {
  clearTimeout(hidePlayerTimeout);
  if (musicStarted) {
    playerContainer.classList.add('active');
  }
}

// A function that waits a moment before hiding the player
function hidePlayer() {
  hidePlayerTimeout = setTimeout(() => {
    playerContainer.classList.remove('active');
  }, 300); // 300ms delay before hiding
}

// Attach the functions to the events for both the trigger and the player
hoverTrigger.addEventListener('mouseenter', showPlayer);
playerContainer.addEventListener('mouseenter', showPlayer);

hoverTrigger.addEventListener('mouseleave', hidePlayer);
playerContainer.addEventListener('mouseleave', hidePlayer);