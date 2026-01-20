const startDate = new Date("2026-02-06T05:00:00");
const endDate   = new Date("2026-02-07T17:00:00");

const messageEl = document.getElementById("message");
const countdownEl = document.getElementById("countdown");

fetch("messages.json")
  .then(res => res.json())
  .then(messages => {
    const now = new Date();

    if (now < startDate) {
      messageEl.innerText = "อีกไม่นานเราจะไปเข้าค่ายนะ 🤍";
    } else if (now >= startDate && now <= endDate) {
      const dayIndex = Math.floor(
        (now.setHours(0,0,0,0) - startDate.setHours(0,0,0,0)) /
        (1000 * 60 * 60 * 24)
      );

      messageEl.innerText =
        messages[dayIndex] || "เราคิดถึงเธออยู่นะ 🤍";
    } else {
      messageEl.innerText = "เรากลับมาแล้ว คิดถึงมาก 🤍";
    }
  });

function updateCountdown() {
  const now = new Date();

  if (now < startDate) {
    countdownEl.innerText = "เราไปแค่ 2 วัน เดี๋ยวก็กลับแล้วนะ 🤍";
    return;
  }

  if (now > endDate) {
    countdownEl.innerText = "วันนี้เราได้เจอกันแล้ว 🤍";
    return;
  }

  const diff = endDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  countdownEl.innerText =
    `อดทนอีก ${days} วันนะ เดี๋ยวเราก็กลับไปกอดแล้ว 🤍`;
}

updateCountdown();
