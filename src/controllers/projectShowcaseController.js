import { getUserRepos } from "../services/githubService.js";
import { generateProjectSummary } from "../services/geminiProjectService.js";
import { getCache, setCache } from "../utils/cache.js";
import { logEvent } from "../services/statsigService.js";

export const getProjectShowcase = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) throw new Error("Username required");

        const cacheKey = `projects:${username}`;
        const cached = getCache(cacheKey);
        if (cached) return res.json(cached);

        const repos = await getUserRepos(username);

        // 🔹 Top 10 non-fork repos (you can reduce later)
        const topRepos = repos
            .filter(r => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);

        const projects = [];

        for (const repo of topRepos) {
            const prompt = `
Write a professional project showcase summary.

Project Name: ${repo.name}
Project Description: ${repo.description || "No description provided"}
Primary Language: ${repo.language || "General"}
Stars: ${repo.stargazers_count}
Topics: ${repo.topics?.join(", ") || "None"}

Requirements:
- Explain what the project does
- Mention technical implementation
- Highlight problem-solving and impact
- Keep it concise (3–4 lines)
Tone: Professional, confident
`;

            let aiSummary = "";

            try {
                aiSummary = await generateProjectSummary(prompt);
            } catch (err) {
                console.warn("Gemini quota hit. Using fallback summary.");

                aiSummary = `This project focuses on ${repo.language || "general development"
                    } and delivers practical functionality using clean architecture, modern tools, and real-world problem-solving approaches.`;
            }

            projects.push({
                name: repo.name,
                description: repo.description || "No description provided",
                url: repo.html_url,
                homepage: repo.homepage || null,
                language: repo.language || "General",
                topics: repo.topics || [],
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                watchers: repo.watchers_count,
                openIssues: repo.open_issues_count,
                sizeKB: repo.size,
                defaultBranch: repo.default_branch,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at,
                aiSummary: aiSummary.trim()
            });
        }

        const result = { username, projects };
        setCache(cacheKey, result);

        res.json(result);

    } catch (error) {
        console.error("Project Showcase Error:", error.message);

        res.json({
            username: req.query.username,
            projects: [{
                name: "Rate limited",
                description: "GitHub or Gemini API limit reached.",
                aiSummary: "Please try again later.",
                url: "#"
            }]
        });
    }
};
logEvent(
    { userID: username },
    "project_showcase_loaded",
    projects.length,
    { repos: projects.map(p => p.name).join(", ") }
);