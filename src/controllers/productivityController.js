import { getFullStats } from "./statsController.js";

export const getProductivityScore = async (req, res) => {
    const stats = await getFullStats(req);
    const score = Math.min(100, Math.floor(stats.contributions / 50));

    res.json({
        username: stats.profile.login,
        productivityScore: score
    });
};
