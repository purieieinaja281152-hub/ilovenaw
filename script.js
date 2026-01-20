const startDate = new Date("2026-02-06T05:00:00");
const endDate   = new Date("2026-02-07T17:00:00");

const messageEl = document.getElementById("message");
const countdownEl = document.getElementById("countdown");
const missBtn = document.getElementById("missBtn");

const extraMessages = [
  "กอดผ่านหน้าจอให้หนึ่งที 🫂",
  "ยิ้มให้ตัวเองหน่อยนะ 🤍",
  "เราภูมิใจในตัวเธอมากจริงๆ",
  "ถึงไม่อยู่ตรงนั้น แต่ใจอยู่กับเธอเสมอ",
  "คิดถึงแบบพูดไม่ออกเลย"
];

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

function setupButton(messages) {
  missBtn.onclick = () => {
    const random =
      extraMessages[Math.floor(Math.random() * extraMessages.length)];
    messageEl.innerText += "\n\n" + random;
  };
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
