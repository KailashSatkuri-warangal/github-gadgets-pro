import { getFullStats } from "./statsController.js";
import { renderStats } from "../renderers/statsRenderer.js";

export const getStatsSVG = async (req, res) => {
    try {
        const stats = await getFullStats(req);
        const svg = renderStats(stats);

        res.setHeader("Content-Type", "image/svg+xml");
        res.send(svg);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Failed to render SVG");
    }
};
