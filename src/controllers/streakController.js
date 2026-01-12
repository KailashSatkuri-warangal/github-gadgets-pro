import { getFullStats } from "./statsController.js";
import { renderStreak } from "../renderers/streakRenderer.js";

export const getStreakSVG = async (req, res) => {
    const stats = await getFullStats(req);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(renderStreak(stats, req.query.theme));
};
