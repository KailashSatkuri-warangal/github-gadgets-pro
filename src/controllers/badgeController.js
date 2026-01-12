import { renderBadges } from "../renderers/badgeRenderer.js";

export const getBadgeSVG = (req, res) => {
    try {
        const svg = renderBadges();

        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);
    } catch (err) {
        console.error("Badge Error:", err.message);
        res.status(500).send("Failed to generate badges");
    }
};
