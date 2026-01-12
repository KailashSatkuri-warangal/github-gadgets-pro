import { getUserRepos } from "../services/githubService.js";

export const getRepoHealth = async (req, res) => {
    const repos = await getUserRepos(req.query.username);

    const scores = repos.map(r => ({
        name: r.name,
        score: Math.min(100, r.stargazers_count * 2 + r.forks_count)
    }));

    res.json(scores.sort((a, b) => b.score - a.score).slice(0, 5));
};
