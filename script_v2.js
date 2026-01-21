document.addEventListener("DOMContentLoaded", () => {

  // ===== วันเวลา =====
  const startDate = new Date("2026-02-06T05:00:00");
  const endDate   = new Date("2026-02-07T17:00:00");

  // ===== element =====
  const messageEl = document.getElementById("message");
  const countdownEl = document.getElementById("countdown");
  const missBtn = document.getElementById("missBtn");
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  const secretBtn = document.getElementById("secretBtn");

  const photoBtn = document.getElementById("photoBtn");
  const photoBox = document.getElementById("photoBox");
  const photo = document.getElementById("photo");
  const photoCaption = document.getElementById("photoCaption");

  // ===== state =====
  let secretShown = false;
  let isPlaying = false;
  let shuffledExtras = [];
  let shuffledPhotos = [];

  // ===== ข้อความ =====
  const extraMessages = [
    "กอดผ่านหน้าจอให้หนึ่งที 🫂",
    "ยิ้มให้ตัวเองเยอะ ๆ หน่อยน้า 🤍",
    "นาวต้องรอเค้านะะ",
    "ถึงตัวไม่อยู่ แต่ใจอยู่กับนาวเสมอ",
    "คิดถึงมากกกกกก 💗"
  ];

  const photos = [
    { src: "photo1.jpg", caption: "อยากไปแอ่วกับนาวอีกกก" },
    { src: "photo2.jpg", caption: "นาวน่ารักมากกกกกก" },
    { src: "photo3.jpg", caption: "หัวใจเราอยู่ใกล้นาวเสมอ" },
    { src: "photo4.jpg", caption: "เราไม่อยู่วัน2วัน นาวอย่าทิ้งเค้านะคิคิ" },
    { src: "photo5.jpg", caption: "คิดถึงนาวสุดๆๆๆเลยยยอยากกอดด" },
    { src: "photo6.jpg", caption: "รักนาวมากๆเลยยยยยยยจุ้บๆๆๆ" }
  ];

  // ===== util =====
  function resetExtras() {
    shuffledExtras = [...extraMessages].sort(() => Math.random() - 0.5);
  }

  function resetPhotos() {
    shuffledPhotos = [...photos].sort(() => Math.random() - 0.5);
  }

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

  // ===== ข้อความหลัก =====
  fetch("messages.json")
    .then(res => res.json())
    .then(messages => updateMessage(messages));

  function updateMessage(messages) {
    const now = new Date();

    if (now < startDate) {
      messageEl.innerText =
        "อีกไม่นานเราจะไปเข้าค่ายนะ 🤍\nไปแค่ 2 วัน เดี๋ยวก็กลับ";
      countdownEl.innerText = "เตรียมตัวคิดถึงกัน 💗";
      return;
    }

    if (now > endDate) {
      messageEl.innerText = "เรากลับมาแล้วนะ 🤍";
      countdownEl.innerText = "ได้กอดกันแล้ว 💕";
      return;
    }

    const dayIndex = Math.floor(
      (new Date(now.setHours(0,0,0,0)) -
       new Date(startDate.setHours(0,0,0,0))) /
      (1000 * 60 * 60 * 24)
    );

    messageEl.innerText = messages[dayIndex] || "คิดถึงนะ 🤍";
    updateCountdown();
  }

  function updateCountdown() {
    const diff = endDate - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    countdownEl.innerText = `อดทนอีก ${days} วันนะ 🤍`;
  }

  // ===== ปุ่มสุ่มข้อความ =====
  if (missBtn) {
    resetExtras();
    missBtn.onclick = () => {
      if (shuffledExtras.length === 0) resetExtras();
      messageEl.innerText = shuffledExtras.pop();
      spawnHearts();
    };
  }

  // ===== ปุ่มเพลง =====
  if (musicBtn && bgMusic) {
    musicBtn.onclick = () => {
      if (!isPlaying) {
        bgMusic.play();
        musicBtn.innerText = "⏸ ปิดเพลง";
      } else {
        bgMusic.pause();
        musicBtn.innerText = "🎵 เปิดเพลง";
      }
      isPlaying = !isPlaying;
    };
  }

  // ===== ปุ่มข้อความลับ =====
  if (secretBtn) {
    secretBtn.onclick = () => {
      if (!secretShown) {
        messageEl.innerText = "ขอบคุณที่เข้ามาในชีวิตเรานะ นาวมีความหมายกับเรามากๆๆเลย เป็นทั้งเซฟโซนทั้งทุกๆอย่างๆในชีวิตเรา ขอบคุณนาวมากๆเลยนะที่อยู่กับเรา เราอาจจะทํานาวเสียความรู้สึก เสียใจไปบ้าง เราขอโทษนะ แต่ก็ขอบคุณนาวมากๆๆเลยที่ยังอยู่กับเรา 2วันนี้ที่เราไม่อยู่ เราคงคิดถึงนาวตลอดเวลา รักน้ะ 🤍";
        secretBtn.innerText = "🤍 อ่านแล้ว";
        secretShown = true;
        spawnHearts();
      }
    };
  }

  // ===== ปุ่มรูป =====
  if (photoBtn && photo && photoCaption && photoBox) {
    resetPhotos();

    photoBtn.onclick = () => {
      if (shuffledPhotos.length === 0) resetPhotos();
      const next = shuffledPhotos.pop();
      photo.src = next.src;
      photoCaption.innerText = next.caption;
      photoBox.style.display = "flex"; photoBox.scrollTop = 0;

      spawnHearts();
    };
  }
  // ===== ปิดรูปเมื่อคลิกพื้นหลัง =====
if (photoBox) {
  photoBox.onclick = () => {
    photoBox.style.display = "none";
  };
}
const hugBtn = document.getElementById("hugBtn");

if (hugBtn) {
  hugBtn.onclick = () => {
    messageEl.innerText =
      "กอดแน่น ๆ ผ่านหน้าจอเลยนะ 🤍\nถึงตัวไม่อยู่ แต่ใจอยู่ตรงนี้เสมอ";
    
    for (let i = 0; i < 15; i++) spawnHearts();

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };
}

const dailyKey = "dailyLoveShown";

function showDailyLove() {
  const today = new Date().toDateString();

  if (localStorage.getItem(dailyKey) === today) {
    messageEl.innerText = "วันนี้เค้าบอกรักไปแล้วน้า 🤍";
    return;
  }

  messageEl.innerText =
    "ข้อความพิเศษของวันนี้ 💗\nไม่ว่าวันนี้จะเจออะไร เค้าอยู่ข้างนาวเสมอ";

  localStorage.setItem(dailyKey, today);
  spawnHearts();
  secretBtn.onclick = showDailyLove;

}




});
