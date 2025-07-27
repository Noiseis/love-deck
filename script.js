const deck = document.getElementById('deck');
const shuffleBtn = document.getElementById('shuffleBtn');
const music = document.getElementById('bgMusic');

const heartsContainer = document.getElementById("hearts-container");
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
  "Even silence with you is music 🎵",
  "Every fight just made us stronger 💪",
  "To infinity and beyond with you 🚀",
  "You make my heart skip a beat 💓",
  "Your smile lights up my world ✨",
  "With you, every day is a blessing 🌸",
  "You're my favorite person ❤️",
  "Holding hands forever 🤝",
  "We are a love story in motion 🎬",
  "You are my sunshine on a cloudy day ☀️",
  "You complete my 🧩",
  "Every moment with you is a treasure 💎",
  "You make my heart dance 💃",
  "You are the missing piece of my ❤️",
  "You are the peanut butter to my jelly 🥜🍇",
  "You are my rock in stormy seas 🌊",
  "You are the reason I believe in love ❤️",
  "You are my forever and always 💞",
  "You are the melody to my song 🎶",
  "You’re the dream I never want to wake up from 🌙💤",
  "My heart found its home in you 🏡❤️",
  "Loving you is my favorite adventure 🌍🗺️",
  "You’re the reason my soul dances 💃🎶",
  "Forever isn’t long enough with you ⏳💘",
  "You turn ordinary moments into magic ✨🎩",
  "My love for you grows with every sunrise 🌅❤️",
  "You’re my favorite ‘good morning’ and ‘goodnight’ 🌞🌙",
  "With you, even the little things feel extraordinary ✨",
  "You’re my happy place in this chaotic world 🧘‍♂️💖",
  "Your love is my favorite kind of therapy 💆‍♀️❤️",
  "You’re the sparkle in my sparkle ✨💎",
  "I fall for you more every single day 🍂💞",
  "You’re my favorite ‘what if’ that came true 🤯💖",
  "Your hugs are my safe haven 🤗🏰",
  "You make my heart do somersaults 🤸‍♂️💓",
  "You’re the best part of my story 📖❤️",
  "Loving you feels like breathing—natural and essential 🌬️💘",
  "You’re my favorite notification 🔔💌",
  "With you, forever still feels too short ⏳💞"
];

const imagePaths = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg",
    "images/13.jpg",
    "images/14.jpg",
    "images/15.jpg",
    "images/16.jpg",
    "images/17.jpg",
    "images/18.jpg",
    "images/19.jpg",
    "images/20.jpg",
    "images/21.jpg",
    "images/22.jpg",
    "images/23.jpg",
    "images/24.jpg",
    "images/25.jpg",
    "images/26.jpg",
    "images/27.jpg",
    "images/28.jpg",

    "images/29.jpg",
    "images/30.jpg",
    "images/31.jpg",
    "images/32.jpg",
    "images/33.jpg",
    "images/34.jpg",
    "images/35.jpg",
    "images/36.jpg",
    "images/37.jpg",
    "images/38.jpg",
    "images/39.jpg",
    "images/40.jpg",
    "images/41.jpg",
    "images/42.jpg"
];

let cards = []; // leave this empty — we will fill it later

function getRandomUniqueItems(arr, count, history = [], historyLimit = 9) {
  const available = arr.filter(item => !history.includes(item));
  const result = [];

  const pool = available.length >= count ? available : arr; // fallback if too few available
  const used = new Set();

  while (result.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    const item = pool[index];
    if (!used.has(item)) {
      result.push(item);
      used.add(item);
    }
  }

  // Update history and keep size within limit
  history.push(...result);
  while (history.length > historyLimit) {
    history.shift();
  }

  return result;
}
function generateRandomCards(count = 3) {
  const selectedMessages = getRandomUniqueItems(messages, count, messageHistory, HISTORY_LIMIT);
  const selectedImages = getRandomUniqueItems(imagePaths, count, imageHistory, HISTORY_LIMIT);

  const generated = [];

  for (let i = 0; i < count; i++) {
    generated.push({
      message: selectedMessages[i],
      image: selectedImages[i]
    });
  }

  return generated;
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
      </div>
    `;
    
    // Attach a simpler click handler
    card.addEventListener('click', () => handleCardClick(card));

    deck.appendChild(card);
  });
}

// A much simpler click handler that just flips the card
function handleCardClick(clickedCard) {
  // Find if any other card is already flipped
  const currentlyFlipped = document.querySelector('.card.flipped');

  // If there's another card flipped and it's not the one clicked
  if (currentlyFlipped && currentlyFlipped !== clickedCard) {
    currentlyFlipped.classList.remove('flipped');

    // Wait for the flip back animation before flipping the new one
    setTimeout(() => {
      clickedCard.classList.add('flipped');
    }, 400); // 400ms matches your CSS transition
  } else {
    // Toggle flip normally
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
    cards = generateRandomCards(3); // get a new random set
    renderCards(true);
  }, 500);
}


// 🎵 Music Player
const musicFiles = [
  "music/love1.mp3",
  "music/love2.mp3",
  "music/love3.mp3",
  "music/love4.mp3",
    "music/love5.mp3",
    "music/love6.mp3",
    "music/love7.mp3",
    "music/love8.mp3",
    "music/love9.mp3",
    "music/love10.mp3",
    "music/love11.mp3",
    "music/love12.mp3",
    "music/love13.mp3",
    "music/love14.mp3",
    "music/love15.mp3",
    "music/love16.mp3",
    "music/love17.mp3",
    "music/love18.mp3",
    "music/love19.mp3",
    "music/love20.mp3",
    "music/love21.mp3",
    "music/love22.mp3",
    "music/love23.mp3",
    "music/love24.mp3",
    "music/love25.mp3",
    "music/love26.mp3",
    "music/love27.mp3",
    "music/love28.mp3"

];
let musicStarted = false;
let lastPlayedIndex = -1;

function playRandomSong() {
  let idx;
  do {
    idx = Math.floor(Math.random() * musicFiles.length);
  } while (musicFiles.length > 1 && idx === lastPlayedIndex); // avoid repeat

  lastPlayedIndex = idx;
  music.src = musicFiles[idx];
  music.load();
  music.volume = 1;
  music.play().catch(err => {
    console.log("Autoplay blocked:", err);
  });
}


function fadeOutAndShuffleMusic() {
  const fadeDuration = 1000;
  const steps = 10;
  const stepTime = fadeDuration / steps;
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
  }, stepTime);
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

function startHeartSpawning() {
  heartInterval = setInterval(() => launchHearts(), 400);
}

function launchHearts() {
  const svgHeart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgHeart.setAttribute("viewBox", "0 0 24 24");
  svgHeart.classList.add("heart-svg");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", randomColor());
  path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 \
  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 \
  14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 \
  6.86-8.55 11.54L12 21.35z");

  svgHeart.appendChild(path);
  svgHeart.style.position = "absolute";
  svgHeart.style.left = `${Math.random() * 100}%`;
  svgHeart.style.bottom = "0px";
  svgHeart.style.width = "24px";
  svgHeart.style.height = "24px";
  svgHeart.style.zIndex = "1000";

  const duration = 2 + Math.random() * 2;
  svgHeart.style.animation = `floatUp ${duration}s linear forwards`;
  heartsContainer.appendChild(svgHeart);

  setTimeout(() => {
    svgHeart.classList.add("fade-out");
    setTimeout(() => svgHeart.remove(), 2000);
  }, duration * 1000);
}

function fadeOutCelebrations() {
  document.querySelectorAll('.heart-svg').forEach(heart => {
    heart.classList.add("fade-out");
    setTimeout(() => heart.remove(), 2000);
  });
}

function randomColor() {
  const colors = ['#ff4d6d', '#ff85a1', '#ffb3c1', '#ff3366', '#ff6699'];
  return colors[Math.floor(Math.random() * colors.length)];
}

music.addEventListener("ended", playRandomSong);

shuffleBtn.addEventListener("click", () => {
  shuffleCards();

});
const nextMusicBtn = document.getElementById("nextMusicBtn");
nextMusicBtn.addEventListener("click", () => {
  fadeOutAndShuffleMusic();
});

cards = generateRandomCards(3);
renderCards(true);

startMusicOnFirstClick();
startHeartSpawning();
