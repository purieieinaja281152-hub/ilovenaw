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
    { src: "photo2.jpg", caption: "นาวน่ารักมาก คิดถึงสุด ๆ" },
    { src: "photo3.jpg", caption: "หัวใจเราอยู่ใกล้นาวเสมอ" }
  ];

  // ===== util =====
  function resetExtras() {
    shuffledExtras = [...extraMessages].sort(() => Math.random() - 0.5);
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
      (now.setHours(0,0,0,0) - startDate.setHours(0,0,0,0)) /
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

  // ===== ปุ่ม =====
  if (missBtn) {
    resetExtras();
    missBtn.onclick = () => {
      if (shuffledExtras.length === 0) resetExtras();
      messageEl.innerText = shuffledExtras.pop();
      spawnHearts();
    };
  }

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

  if (secretBtn) {
    secretBtn.onclick = () => {
      
      if (!secretShown) {
        messageEl.innerText = "เรารักนาวมากกว่าที่พูดออกไปอีก 🤍";
        secretBtn.innerText = "🤍 อ่านแล้ว";
        secretShown = true;
        spawnHearts();
      }
    };
  }

  if (photoBtn) {
    photoBtn.onclick = () => {
      photoBox.onclick = () => {
  photoBox.style.display = "none";
};

      const r = photos[Math.floor(Math.random() * photos.length)];
      photo.src = r.src;
      photoCaption.innerText = r.caption;
      photoBox.style.display = "block";
      spawnHearts();
    };
  }

});
