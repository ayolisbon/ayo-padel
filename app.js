const tournamentStart = new Date("2026-09-20T17:00:00+01:00");
const roundDuration = 15 * 60 * 1000;
const totalRounds = 12;

function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return `${hours}h ${minutes}m ${seconds}s`;
}

function updateTournament() {
  const now = new Date();
  const tournamentEnd =
    new Date(tournamentStart.getTime() + totalRounds * roundDuration);

  const roundNumber = document.getElementById("round-number");
  const roundTime = document.getElementById("round-time");
  const countdownLabel = document.getElementById("countdown-label");
  const countdown = document.getElementById("countdown");

  if (now < tournamentStart) {
    roundNumber.textContent = "Tournament starts soon";
    roundTime.textContent = "Sunday · 17:00";
    countdownLabel.textContent = "Tournament starts in";
    countdown.textContent =
      formatCountdown(tournamentStart.getTime() - now.getTime());
    return;
  }

  if (now >= tournamentEnd) {
    roundNumber.textContent = "Tournament finished";
    roundTime.textContent = "Thank you for playing!";
    countdownLabel.textContent = "See you at the next AYO event";
    countdown.textContent = "🎾";
    return;
  }

  const elapsedTime = now.getTime() - tournamentStart.getTime();
  const currentRound = Math.floor(elapsedTime / roundDuration);
  const nextRoundTime =
    tournamentStart.getTime() + (currentRound + 1) * roundDuration;

  const currentRoundStart =
    new Date(tournamentStart.getTime() + currentRound * roundDuration);

  const currentRoundEnd =
    new Date(currentRoundStart.getTime() + roundDuration);

  roundNumber.textContent =
    `Round ${currentRound + 1} of ${totalRounds}`;

  roundTime.textContent =
    `${currentRoundStart.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    })}–${currentRoundEnd.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    })}`;

  countdownLabel.textContent = "Next round in";
  countdown.textContent =
    formatCountdown(nextRoundTime - now.getTime());
}

updateTournament();
setInterval(updateTournament, 1000);
