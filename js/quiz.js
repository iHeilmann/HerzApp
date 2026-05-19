let score = 0;
let answeredQuestions = {};
const totalQuestions = 10;

const correctAnswers = {
    1:  ["Blau", "Hellblau"],
    2:  ["The Funeral", "Wonderwall"],
    3:  ["How I Met Your Mother", "Game of Thrones"],
    4:  ["Titanic", "Titanic2"],
    5:  ["21.03.1996", "21.03"],
    6:  ["Haare", "Alles"],
    7:  ["Sarkasmus", "Situationskomik"],
    8:  ["Chillen", "Serien"],
    9:  ["Loyal", "Romantisch"],
    10: ["Glück", "Zeit"]
};

const pointsPerCorrect = 2;

function quizAnswer(question, answer, btn) {
    if (answeredQuestions[question]) return;

    answeredQuestions[question] = answer;

    const group = document.querySelector(`[data-question="${question}"]`);
    group.querySelectorAll("button").forEach(b => b.disabled = true);

    btn.style.backgroundColor = correctAnswers[question].includes(answer)
        ? "#4CAF50"
        : "#d9534f";
}

function finishQuiz() {
    const quizResult = document.getElementById("quizResult");
    const restartBtn = document.getElementById("restartBtn");

    score = 0;

    for (let q = 1; q <= totalQuestions; q++)
        if (correctAnswers[q].includes(answeredQuestions[q]))
            score += pointsPerCorrect;

    const maxPoints = totalQuestions * pointsPerCorrect;

    launchAnimation(score);

    const tier = Math.min(5, Math.floor(score / 4));
    quizResult.className = "tier-" + tier;

    let message = "";
    if (score === 20)      message = "🎆 WOW! You know me perfectly! You're incredible! ❤️";
    else if (score >= 18)  message = "Almost perfect! You know me SO well 💕";
    else if (score >= 16)  message = "You know me really well! I'm so proud of you 💖";
    else if (score >= 14)  message = "Really good! Just a few gaps left 😊❤️";
    else if (score >= 12)  message = "Not bad at all! Getting there 😄";
    else if (score >= 10)  message = "Halfway there! We'll keep practicing 💕";
    else if (score >= 8)   message = "A bit more study needed 😄";
    else if (score >= 6)   message = "Hmm… we need more time together 😅❤️";
    else if (score >= 4)   message = "Oh dear… series nights are mandatory now 😅";
    else if (score >= 2)   message = "Did you even try? 😂❤️";
    else                   message = "Zero points?! I forgive you though 😂❤️";

    quizResult.innerHTML = `You scored <b>${score}</b> out of <b>${maxPoints}</b> points!<br><br>${message}`;
    restartBtn.style.display = "inline-block";
}

function restartQuiz() {
    score = 0;
    answeredQuestions = {};

    document.querySelectorAll("#quiz button").forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "";
    });

    document.getElementById("quizResult").innerHTML = "";
    document.getElementById("quizResult").className = "";
    document.getElementById("textBox").innerHTML = "";
    document.getElementById("restartBtn").style.display = "none";

    stopCurrentAudio();
    document.querySelectorAll(".particle").forEach(p => p.remove());

    window.scrollTo({ top: 0, behavior: "smooth" });
}
