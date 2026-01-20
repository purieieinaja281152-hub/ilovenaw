const startDate = new Date("2026-01-25"); // วันแรกที่เข้าค่าย
const endDate = new Date("2026-02-05");   // วันกลับ

fetch("messages.json")
  .then(res => res.json())
  .then(messages => {
    const today = new Date();
    const diffTime = today - startDate;
    const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (dayIndex >= 0 && dayIndex < messages.length) {
      document.getElementById("message").innerText = messages[dayIndex];
    } else {
      document.getElementById("message").innerText = "เรายังคิดถึงเธอเสมอ 🤍";
    }
  });

const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = endDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  countdownEl.innerText = `เหลืออีก ${days} วัน เราจะได้เจอกัน`;
}

updateCountdown();
