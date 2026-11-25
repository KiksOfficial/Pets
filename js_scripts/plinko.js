// Rivo Pruus, Gemini aitas

const canvas = document.getElementById("plinkoCanvas");
const ctx = canvas.getContext("2d");
const dropBtn = document.getElementById("dropBallBtn");

// Värvid, mis haakuvad plinko.css paletiga
const COLORS = {
    darkCoral: "#F08080",
    coral: "#F4978E",
    lightCoral: "#F8AD9D",
    peach: "#FBC4AB",
    lightPeach: "#FFDAB9",
    text: "#5c3a35",
    white: "#ffffff"
};

// Füüsika ja mängulaua seaded
const GRAVITY = 0.25;
const BOUNCE = 0.3;
const FRICTION = 0.992;
const PEG_RADIUS = 5;
const BALL_RADIUS = 9;
const SLOT_COUNT = 7;
const SLOT_HEIGHT = 75;
const MULTIPLIERS = ["0.5x", "1x", "2x", "5x", "2x", "1x", "0.5x"];

const pegs = [];
const balls = [];
let lastResult = null;

// Loo Plinko pulkade püramiid
function createPegs() {
    pegs.length = 0;
    const rows = 8;
    const startY = 85;
    const rowGap = 46;
    const colGap = 48;

    for (let row = 0; row < rows; row++) {
        const colsInRow = row + 3;
        const totalWidth = (colsInRow - 1) * colGap;
        const startX = (canvas.width - totalWidth) / 2;
        const y = startY + row * rowGap;

        for (let col = 0; col < colsInRow; col++) {
            pegs.push({
                x: startX + col * colGap,
                y: y,
                radius: PEG_RADIUS
            });
        }
    }
}

// Loo uus pall ülaosast väikese juhusliku nihkega
function spawnBall() {
    const jitter = (Math.random() - 0.5) * 24;
    balls.push({
        x: canvas.width / 2 + jitter,
        y: 28,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0,
        radius: BALL_RADIUS,
        finished: false
    });
}

// Uuenda palli asukohta ja põrkeid
function updateBalls() {
    const slotWidth = canvas.width / SLOT_COUNT;
    const slotTopY = canvas.height - SLOT_HEIGHT;

    for (const ball of balls) {
        if (ball.finished) continue;

        ball.vy += GRAVITY;
        ball.vx *= FRICTION;
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Põrked vasaku ja parema serva vastu
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx = Math.abs(ball.vx) * BOUNCE;
        } else if (ball.x + ball.radius > canvas.width) {
            ball.x = canvas.width - ball.radius;
            ball.vx = -Math.abs(ball.vx) * BOUNCE;
        }

        // Põrked pulkade vastu
        for (const peg of pegs) {
            const dx = ball.x - peg.x;
            const dy = ball.y - peg.y;
            const dist = Math.hypot(dx, dy);
            const minDist = ball.radius + peg.radius;

            if (dist < minDist && dist > 0) {
                const nx = dx / dist;
                const ny = dy / dist;

                // Lükka pall pulga pinnast välja, et see kinni ei jääks
                const overlap = minDist - dist;
                ball.x += nx * overlap;
                ball.y += ny * overlap;

                // Peegelda kiirus piki normaali + väike juhuslikkus
                const dot = ball.vx * nx + ball.vy * ny;
                if (dot < 0) {
                    ball.vx -= (1 + BOUNCE) * dot * nx;
                    ball.vy -= (1 + BOUNCE) * dot * ny;
                    ball.vx += (Math.random() - 0.5) * 0.6;
                }
            }
        }

        // Kontrolli, kas pall jõudis alumistesse pesadesse
        if (ball.y + ball.radius >= slotTopY) {
            ball.y = slotTopY - ball.radius;
            ball.finished = true;

            const slotIndex = Math.min(
                SLOT_COUNT - 1,
                Math.max(0, Math.floor(ball.x / slotWidth))
            );
            lastResult = MULTIPLIERS[slotIndex];
        }
    }
}

// Joonista alumised pesad ja kordajad
function drawSlots() {
    const slotWidth = canvas.width / SLOT_COUNT;
    const slotTopY = canvas.height - SLOT_HEIGHT;

    for (let i = 0; i < SLOT_COUNT; i++) {
        const x = i * slotWidth;
        const isCenter = i === Math.floor(SLOT_COUNT / 2);

        ctx.fillStyle = isCenter ? COLORS.lightCoral : COLORS.peach;
        ctx.fillRect(x + 2, slotTopY, slotWidth - 4, SLOT_HEIGHT - 4);

        ctx.strokeStyle = COLORS.coral;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 2, slotTopY, slotWidth - 4, SLOT_HEIGHT - 4);

        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 15px 'Segoe UI', Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(MULTIPLIERS[i], x + slotWidth / 2, slotTopY + SLOT_HEIGHT / 2);
    }
}

// Joonista pulgad
function drawPegs() {
    for (const peg of pegs) {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.darkCoral;
        ctx.fill();
    }
}

// Joonista pallid
function drawBalls() {
    for (const ball of balls) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.coral;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = COLORS.text;
        ctx.stroke();
    }
}

// Näita viimast tulemust ülaosas
function drawStatus() {
    ctx.fillStyle = COLORS.text;
    ctx.font = "600 15px 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const statusText = lastResult ? `Viimane tabamus: ${lastResult}` : "Vajuta 'proovi õnne'";
    ctx.fillText(statusText, 16, 14);
}

// Peamine animatsioonitsükkel
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStatus();
    drawPegs();
    drawSlots();
    updateBalls();
    drawBalls();

    requestAnimationFrame(loop);
}

dropBtn.addEventListener("click", spawnBall);

createPegs();
loop();