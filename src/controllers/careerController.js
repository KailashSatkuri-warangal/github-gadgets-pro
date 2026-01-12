import { getFullStats } from "./statsController.js";

export const getCareerRecommendation = async (req, res) => {
    const stats = await getFullStats(req);
    const langs = Object.keys(stats.languages);

    let role = "Software Engineer";
    if (langs.includes("Python")) role = "AI / ML Engineer";
    if (langs.includes("JavaScript")) role = "Full Stack Developer";

    res.json({
        recommendedRole: role,
        keySkills: langs.slice(0, 5)
    });
};
