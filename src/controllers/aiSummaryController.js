import { getFullStats } from "./statsController.js";
import { generateProfileSummary } from "../services/geminiService.js";
import { getUserRepos } from "../services/githubService.js";
export const getAISummary = async (req, res) => {
    try {
        const stats = await getFullStats(req);

        // 🔹 Fetch top 10 repos
        const repos = await getUserRepos(stats.profile.login);

        const topProjects = repos
            .filter(r => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10)
            .map(repo => ({
                name: repo.name,
                url: repo.html_url,
                description: repo.description || "No description provided",
                language: repo.language || "General"
            }));

        const prompt = `
Generate a professional GitHub profile summary for a developer portfolio.

Profile Data:
Username: ${stats.profile.login}
Public Repositories: ${stats.totalRepos}
Total Stars: ${stats.totalStars}
Followers: ${stats.profile.followers}
Top Languages: ${Object.keys(stats.languages).slice(0, 5).join(", ")}

Top Projects:
${topProjects.map(p =>
            `- ${p.name}: ${p.description} (${p.language})`
        ).join("\n")}

Requirements:
- Highlight technical skills
- Mention relevant technologies
- Reference real-world projects
- Avoid years, education, or duration
- Use confident, modern, professional tone
- Keep it concise (3–4 lines)
- Suitable for GitHub README, resume, and portfolio
`;

        let summary = "";

        try {
            summary = await generateProfileSummary(prompt);
        } catch (err) {
            console.warn("Gemini quota hit. Using fallback profile summary.");

            summary = `Results-driven developer with strong experience in building real-world applications using ${Object.keys(stats.languages).slice(0, 3).join(", ")
                }. Actively developing multiple GitHub projects with a focus on clean architecture, problem-solving, and modern development practices.`;
        }

        res.json({
            username: stats.profile.login,
            aiSummary: summary.trim(),
            topProjects
        });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).send("Failed to generate AI summary");
    }
};
