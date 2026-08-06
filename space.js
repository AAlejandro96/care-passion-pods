// ===========================
// Space Background Animation
// ===========================
(function () {
    const canvas = document.getElementById("spaceCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    let width = 0;
    let height = 0;
    let pixelSize = 8;
    let cols = 0;
    let rows = 0;
    let stars = [];
    let rockets = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        pixelSize = Math.max(6, Math.min(12, Math.floor(width / 120)));
        cols = Math.ceil(width / pixelSize);
        rows = Math.ceil(height / pixelSize);
        generateStars();
        generateRockets();
    }

    window.addEventListener("resize", resize);
    resize();

    function generateStars() {
        stars = [];
        const count = Math.floor(cols * rows * 0.015);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.floor(Math.random() * cols),
                y: Math.floor(Math.random() * rows * 0.45),
                alpha: Math.random() * 0.4 + 0.5,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.03 + 0.02,
            });
        }
    }

    function generateRockets() {
        rockets = [];
        const count = Math.max(3, Math.floor(width / 260));
        for (let i = 0; i < count; i++) {
            rockets.push({
                x: Math.random() * width,
                y: height * 0.75 + Math.random() * height * 0.18,
                speed: Math.random() * 0.6 + 0.6,
                size: Math.floor(pixelSize * (1.2 + Math.random() * 0.8)),
                offset: Math.random() * 40,
            });
        }
    }

    function drawPixel(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }

    function drawBackground() {
        const horizon = Math.floor(rows * 0.68);
        for (let y = 0; y < rows; y++) {
            let color;
            if (y < horizon - 2) {
                color = `rgb(${12 + y * 2}, ${18 + y * 2}, ${40 + y * 2})`;
            } else if (y < horizon) {
                color = `rgb(${110 + (y - horizon + 2) * 20}, ${70 + (y - horizon + 2) * 18}, ${40 + (y - horizon + 2) * 12})`;
            } else {
                color = `rgb(${22 + (y - horizon) * 5}, ${26 + (y - horizon) * 7}, ${48 + (y - horizon) * 10})`;
            }
            drawPixel(0, y, color);
            for (let i = 1; i < cols; i++) drawPixel(i, y, color);
        }

        const sunX = Math.floor(cols * 0.5);
        const sunY = Math.floor(horizon - 4);
        const sunRadius = 6;
        for (let dy = -sunRadius; dy <= sunRadius; dy++) {
            for (let dx = -sunRadius; dx <= sunRadius; dx++) {
                if (Math.abs(dx) + Math.abs(dy) <= sunRadius) {
                    const light = 255 - Math.abs(dy) * 6;
                    drawPixel(sunX + dx, sunY + dy, `rgb(${light}, ${180 - Math.abs(dx) * 4}, ${80})`);
                }
            }
        }

        for (let band = horizon; band < horizon + 4; band++) {
            for (let x = 2; x < cols - 2; x += 8) {
                drawPixel(x + (band % 2), band, `rgb(80, 46, 74)`);
            }
        }
    }

    function drawStars(time) {
        for (const star of stars) {
            const alpha = Math.max(0.3, Math.min(1, star.alpha + Math.sin(time * star.speed + star.phase) * 0.25));
            const gray = Math.floor(220 + alpha * 35);
            drawPixel(star.x, star.y, `rgba(${gray}, ${gray}, 255, ${alpha})`);
        }
    }

    function drawRockets(time) {
        for (const rocket of rockets) {
            rocket.x -= rocket.speed;
            rocket.y -= rocket.speed * 0.32;
            rocket.y += Math.sin((time + rocket.offset) * 0.002) * 0.18;
            if (rocket.x < -rocket.size || rocket.y < -rocket.size) {
                rocket.x = width + rocket.size;
                rocket.y = height * 0.75 + Math.random() * height * 0.18;
            }
            const px = Math.round(rocket.x / pixelSize);
            const py = Math.round(rocket.y / pixelSize);
            drawPixel(px, py - 2, "#ffffff");
            drawPixel(px, py - 1, "#ffffff");
            drawPixel(px, py, "#ff4f4f");
            drawPixel(px, py + 1, "#ff8a3f");
            drawPixel(px, py + 2, "#ffbf5f");
            drawPixel(px - 1, py + 1, "#ff8a3f");
            drawPixel(px + 1, py + 1, "#ff8a3f");
            drawPixel(px - 1, py + 3, "#ff9044");
            drawPixel(px, py + 3, "#ff5f3f");
            drawPixel(px + 1, py + 3, "#ff9044");
            drawPixel(px - 1, py + 4, "#ff5f3f");
            drawPixel(px, py + 4, "#fc3f2f");
            drawPixel(px + 1, py + 4, "#ff5f3f");
        }
    }

    function animate(time) {
        time = time || 0;
        ctx.clearRect(0, 0, width, height);
        drawBackground();
        drawStars(time);
        drawRockets(time);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();
