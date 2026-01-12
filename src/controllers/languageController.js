import { getFullStats } from "./statsController.js";
import { renderLanguages } from "../renderers/languageRenderer.js";

export const getLanguageSVG = async (req, res) => {
    try {
        const stats = await getFullStats(req);
        const svg = renderLanguages(stats, req.query.theme);

        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);
    } catch (err) {
        console.error("Language Error:", err.message);
        res.status(500).send("Failed to generate language chart");
    }
};
