import { renderBanner } from "../renderers/bannerRenderer.js";

export const getBannerSVG = (req, res) => {
    try {
        const { username, theme } = req.query;
        const svg = renderBanner(username || "Developer", theme);

        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);
    } catch (err) {
        console.error("Banner Error:", err.message);
        res.status(500).send("Failed to generate banner");
    }
};
