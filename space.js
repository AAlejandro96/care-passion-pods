// ===========================
// Pixel-art sunrise background
// ===========================
(function () {
    const canvas = document.getElementById("spaceCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    let width = 0;
    let height = 0;
    let pixel = 6;
    let stars = [];
    let rockets = [];
    let clouds = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        pixel = Math.max(4, Math.min(8, Math.round(Math.min(width, height) / 150)));
        buildScene();
    }

    function buildScene() {
        stars = [];
        for (let i = 0; i < 80; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.55,
                s: Math.random() * 2 + 1,
                a: Math.random() * 0.8 + 0.2,
                t: Math.random() * 1000,
            });
        }

        rockets = [];
        const rocketCount = Math.max(8, Math.min(16, Math.round(width / 110)));
        for (let i = 0; i < rocketCount; i++) {
            rockets.push({
                x: (i / rocketCount) * width + (Math.random() * 0.08 - 0.04) * width,
                y: height * (0.22 + Math.random() * 0.46),
                scale: 1.3 + Math.random() * 1.8,
                trail: 10 + Math.random() * 12,
                drift: (Math.random() - 0.5) * 0.4,
            });
        }

        clouds = [
            { x: width * 0.16, y: height * 0.22, scale: 1.2 },
            { x: width * 0.68, y: height * 0.18, scale: 1.4 },
            { x: width * 0.82, y: height * 0.27, scale: 1.1 },
            { x: width * 0.46, y: height * 0.31, scale: 0.85 }
        ];
    }

    function rect(x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    function drawCloud(x, y, scale) {
        const block = Math.max(2, Math.round(pixel * 1.2 * scale));
        const data = [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ];
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                if (data[row][col]) {
                    rect(x + col * block, y + row * block, block, block, "#e9d98d");
                }
            }
        }
    }

    function drawStar(x, y, s, a) {
        const size = s * 2;
        const alpha = Math.max(0.2, Math.min(1, a));
        rect(x, y, size, size, `rgba(255,255,255,${alpha})`);
        if (size > 2) {
            rect(x - size, y + size / 2, size * 3, size, `rgba(255,255,255,${alpha * 0.5})`);
            rect(x + size / 2, y - size, size, size * 3, `rgba(255,255,255,${alpha * 0.5})`);
        }
    }

    function drawRocket(x, y, scale) {
        const s = Math.max(2, Math.round(pixel * scale));

        // trail
        for (let i = 0; i < 12; i++) {
            const yy = y + i * s * 2;
            const alpha = Math.max(0, 1 - i / 12);
            rect(x - s * 0.5, yy, s, s * 1.3, `rgba(255,255,255,${alpha})`);
        }

        // body
        rect(x - s, y + s * 3, s * 2, s * 6, "#081b2f");
        rect(x - s * 0.8, y + s * 3, s * 1.6, s * 3, "#dfe9ff");
        rect(x - s * 0.3, y + s * 1.2, s * 0.6, s * 1.8, "#dfe9ff");
        rect(x - s * 0.6, y + s * 9, s * 1.2, s * 1.5, "#0d2c53");
        rect(x - s * 0.9, y + s * 8.8, s * 0.5, s * 1.8, "#0d2c53");
        rect(x + s * 0.4, y + s * 8.8, s * 0.5, s * 1.8, "#0d2c53");
        rect(x - s * 0.7, y + s * 1.5, s * 0.3, s * 0.8, "#f0f7ff");
        rect(x + s * 0.4, y + s * 1.5, s * 0.3, s * 0.8, "#f0f7ff");

        // windows and fins
        rect(x - s * 0.5, y + s * 4.2, s, s, "#dfe9ff");
        rect(x - s * 0.3, y + s * 5.5, s * 0.6, s * 0.8, "#dfe9ff");
        rect(x - s * 1.2, y + s * 6.5, s * 0.6, s * 1.5, "#081b2f");
        rect(x + s * 0.6, y + s * 6.5, s * 0.6, s * 1.5, "#081b2f");

        // flame
        rect(x - s * 0.4, y + s * 10.7, s * 0.8, s * 1.5, "#f7e07d");
        rect(x - s * 0.2, y + s * 12.0, s * 0.4, s * 1.2, "#f9b24b");
    }

    function drawSun() {
        const horizon = height * 0.7;
        const sunRadius = Math.max(90, width * 0.15);
        const cx = width * 0.5;
        const cy = horizon + 8;

        for (let y = -sunRadius; y <= sunRadius; y += pixel) {
            for (let x = -sunRadius; x <= sunRadius; x += pixel) {
                const dist = Math.hypot(x, y);
                if (dist < sunRadius) {
                    const glow = 1 - dist / sunRadius;
                    const tone = 200 + Math.floor(glow * 40);
                    rect(cx + x, cy + y, pixel, pixel, `rgba(${tone}, ${tone - 10}, ${140}, ${0.7 + glow * 0.3})`);
                }
            }
        }

        ctx.fillStyle = "#f2edb2";
        ctx.fillRect(cx - sunRadius * 0.8, cy - sunRadius * 0.4, sunRadius * 1.6, sunRadius * 0.8);
        ctx.fillRect(cx - sunRadius * 0.5, cy - sunRadius * 0.2, sunRadius, sunRadius * 0.4);
    }

    function drawHorizon() {
        const horizon = height * 0.7;
        const landTop = horizon + 12;

        for (let y = landTop; y < height; y += pixel) {
            const intensity = Math.min(1, (y - landTop) / (height - landTop));
            const color = `rgb(${30 + intensity * 35}, ${40 + intensity * 32}, ${80 + intensity * 30})`;
            rect(0, y, width, pixel, color);
        }

        for (let i = 0; i < 18; i++) {
            const x = i * (width / 18);
            const base = height * 0.9;
            const peak = base - (i % 3) * 18 - 18;
            rect(x, peak, 24, base - peak, "#0b2348");
            rect(x + 8, peak - 18, 10, 18, "#0b2348");
            rect(x + 4, peak - 36, 18, 18, "#0b2348");
        }
    }

    function drawSky() {
        const sky = "#0e2f7a";
        rect(0, 0, width, height, sky);

        for (const star of stars) {
            const pulse = 0.4 + Math.sin((performance.now() * 0.0015) + star.t) * 0.5;
            drawStar(star.x, star.y, star.s, star.a * (0.4 + pulse));
        }

        for (const cloud of clouds) {
            drawCloud(cloud.x, cloud.y, cloud.scale);
        }

        drawSun();
    }

    function renderScene(time) {
        drawSky();

        for (const rocket of rockets) {
            const x = rocket.x + Math.sin(time * 0.0006 + rocket.x * 0.01) * 10;
            const y = rocket.y + Math.cos(time * 0.0008 + rocket.y * 0.02) * 6;
            drawRocket(x, y, rocket.scale);
        }

        drawHorizon();
    }

    function animate(time) {
        renderScene(time);
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(animate);
})();
