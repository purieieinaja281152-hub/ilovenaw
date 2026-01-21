window.onload = () => {
const startDate = new Date("2026-02-06T05:00:00");
const endDate   = new Date("2026-02-07T17:00:00");

const messageEl = document.getElementById("message");
const countdownEl = document.getElementById("countdown");
const missBtn = document.getElementById("missBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const secretBtn = document.getElementById("secretBtn");
let secretShown = false;
secretBtn.onclick = () => {
  if (!secretShown) {
    messageEl.innerText =
      "จริง ๆ เรารักนาววมากกว่าที่พูดออกไปอีกก 🤍";
    secretBtn.innerText = "🤍 อ่านแล้ว";
    secretShown = true;

    spawnHearts();
  }
};


let isPlaying = false;

const extraMessages = [
  "กอดผ่านหน้าจอให้หนึ่งที 🫂",
  "ยิ้มให้ตัวเองเย้อๆหน่อยน้าา 🤍",
  "นาวต้องรอเค้าน้าาา",
  "ถึงเราจะไม่อยู่ แต่ใจเราอยู่กับกับเสมอ",
  "คิดถึงมากกกกกกๆๆ กไก่ล้านตัว"
];

const photos = [
  {
    src: "photo1.jpg",
    caption: "อยากไปแอ่วกับนาวอีกกกกคิดถึงนาวววว"
  },
  {
    src: "photo2.jpg",
    caption: "นาวน่ารักมากกกกก คิดถึงงงงงงงงง"
  },
  {
    src: "photo3.jpg",
    caption: "ถึงตัวเราไม่ได้อยู่ใกล้กัน แต่หัวใจเราอยู่ใกล้นาวตลอดดดคิคิ"
  },
  {
    src: "photo4.jpg",
    caption: "เราไม่อยู่แค่วันสองวัน อย่าทิ้งเค้านะที่รัก"
  },
  {
    src: "photo5.jpg",
    caption: "มีความสุขที่ได้อยู่กับนาววววว"
  },
  {
    src: "photo6.jpg",
    caption: "รักนาวที่สุดเลยยยยยยย"
  },
];


let shuffledExtras = [];


fetch("messages.json")
  .then(res => res.json())
  .then(messages => {
    updateMessage(messages);
    setupButton(messages);
  });

function updateMessage(messages) {
  const now = new Date();

  if (now < startDate) {
    messageEl.innerText = "อีกไม่นานเราจะไปเข้าค่ายนะ 🤍\nเราไปแค่ 2 วัน เดี๋ยวก็กลับแล้ว";
    countdownEl.innerText = "เตรียมตัวคิดถึงกันได้เลย 💗";
    return;
  }

  if (now > endDate) {
    messageEl.innerText = "เรากลับมาแล้วนะ 🤍\nคิดถึงมากจริงๆ";
    countdownEl.innerText = "วันนี้เราได้เจอกันแล้ว 💕";
    return;
  }

  const dayIndex = Math.floor(
    (now.setHours(0,0,0,0) - new Date(startDate).setHours(0,0,0,0)) /
    (1000 * 60 * 60 * 24)
  );

  messageEl.innerText = messages[dayIndex] || "เราคิดถึงเธออยู่นะ 🤍";

  if (Math.random() < 0.5) {
    messageEl.innerText += "\n\n" +
      extraMessages[Math.floor(Math.random() * extraMessages.length)];
  }

  updateCountdown();
}

function updateCountdown() {
  const diff = endDate - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  countdownEl.innerText = `อดทนอีก ${days} วันนะ เดี๋ยวเราก็กลับไปกอดแล้ว 🤍`;
}

function setupButton() {
  resetExtras();

  missBtn.onclick = () => {
    if (shuffledExtras.length === 0) {
      resetExtras();
    }

    const next = shuffledExtras.pop();
    messageEl.innerText = next;

    messageEl.classList.remove("fade");
    void messageEl.offsetWidth;
    messageEl.classList.add("fade");

    spawnHearts();
  };
}

function resetExtras() {
  shuffledExtras = [...extraMessages]
    .sort(() => Math.random() - 0.5);
}


/* หัวใจลอย */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}, 1400);

function spawnHearts() {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}

musicBtn.onclick = () => {
  if (!isPlaying) {
    bgMusic.play();
    musicBtn.innerText = "⏸ ปิดเพลง";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicBtn.innerText = "🎵 เปิดเพลง";
    isPlaying = false;
  }
};

const photoBtn = document.getElementById("photoBtn");
const photoBox = document.getElementById("photoBox");
const photo = document.getElementById("photo");
const photoCaption = document.getElementById("photoCaption");

photoBtn.onclick = () => {
  const random = photos[Math.floor(Math.random() * photos.length)];

  photo.src = random.src;
  photoCaption.innerText = random.caption;
  photoBox.style.display = "block";

  spawnHearts();
};
};
