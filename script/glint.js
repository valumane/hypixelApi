
const GLINT_FRAME_COUNT = 87;
const GLINT_FRAME_DURATION = 80;

const glintCache = new Map();
let glintFramesPromise;
let glintQueue = Promise.resolve();

function loadGlintImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        if (url.startsWith("http")) {
            img.crossOrigin = "anonymous";
        }

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Image inaccessible : ${url}`));
        img.src = url;
    });
}

// Charge les 87 frames une seule fois
function getGlintFrames() {
    if (!glintFramesPromise) {
        glintFramesPromise = Promise.all(
            Array.from({ length: GLINT_FRAME_COUNT }, (_, i) =>
                loadGlintImage(
                    `./generateGlint/frames/Frame_${String(i + 1).padStart(4, "0")}.png`
                )
            )
        ).catch(err => {
            glintFramesPromise = undefined;
            throw err;
        });
    }

    return glintFramesPromise;
}

// Adaptation de ton applyMask()
function applyGlintMask(itemImg, glintFrame) {
    const w = itemImg.naturalWidth;
    const h = itemImg.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(itemImg, 0, 0);
    const itemPixels = ctx.getImageData(0, 0, w, h).data;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(glintFrame, 0, 0, w, h);

    const glowData = ctx.getImageData(0, 0, w, h);

    for (let i = 0; i < glowData.data.length; i += 4) {
        glowData.data[i + 3] = Math.round(
            glowData.data[i + 3] * itemPixels[i + 3] / 255
        );
    }

    ctx.putImageData(glowData, 0, 0);
    return canvas;
}

// Génération du GIF à partir de la texture
async function createGlintGIF(url) {
    const [itemImg, frames] = await Promise.all([
        loadGlintImage(url),
        getGlintFrames()
    ]);

    const canvas = document.createElement("canvas");
    canvas.width = itemImg.naturalWidth;
    canvas.height = itemImg.naturalHeight;

    const ctx = canvas.getContext("2d");

    const gif = new GIF({
        workers: 2,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
        workerScript: "./generateGlint/gif.worker.js",
        transparent: 0xFF00FF
    });

    for (const frame of frames) {
        ctx.globalCompositeOperation = "source-over";

        // Couleur utilisée pour la transparence du GIF
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(itemImg, 0, 0);

        const maskedGlow = applyGlintMask(itemImg, frame);

        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(maskedGlow, 0, 0);
        ctx.globalCompositeOperation = "source-over";

        gif.addFrame(canvas, {
            copy: true,
            delay: GLINT_FRAME_DURATION
        });
    }

    return new Promise((resolve, reject) => {
        gif.on("finished", blob => {
            resolve(URL.createObjectURL(blob));
        });

        gif.on("abort", () => {
            reject(new Error("Génération GIF interrompue"));
        });

        try {
            gif.render();
        } catch (err) {
            reject(err);
        }
    });
}

// Cache + génération séquentielle pour éviter
// de lancer des dizaines de workers simultanément
function getGlintGIF(url) {
    if (!glintCache.has(url)) {
        const job = glintQueue
            .catch(() => {})
            .then(() => createGlintGIF(url))
            .catch(err => {
                glintCache.delete(url);
                throw err;
            });

        glintQueue = job.catch(() => {});
        glintCache.set(url, job);
    }

    return glintCache.get(url);
}
