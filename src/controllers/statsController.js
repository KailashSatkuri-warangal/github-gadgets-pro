import {
    getUserProfile,
    getUserRepos,
    getRepoLanguages
} from "../services/githubService.js";

import { getContributions } from "../services/githubGraphQL.js";
import { getCache, setCache } from "../utils/cache.js";

export const getFullStats = async (req) => {
    try {
        const { username } = req.query;

        if (!username) {
            throw new Error("Username is required");
        }

        const cachedData = getCache(username);
        if (cachedData) {
            console.log("Cache hit for key:", username);
            return cachedData;
        }

        console.log("Cache miss for key:", username);

        // Fetch basic data
        const profile = await getUserProfile(username);
        const repos = await getUserRepos(username);

        // Safe GraphQL call (won't crash API)
        const contributions = await getContributions(username).catch(() => ({
            totalContributions: 0
        }));

        // Limit language calls to 10 repos only
        const topRepos = repos.filter(r => !r.fork).slice(0, 10);

        let languages = {};

        for (const repo of topRepos) {
            const lang = await getRepoLanguages(username, repo.name);

            for (const key in lang) {
                languages[key] = (languages[key] || 0) + lang[key];
            }
        }

        const stats = {
            profile,
            totalRepos: repos.length,
            totalStars: repos.reduce((a, b) => a + b.stargazers_count, 0),
            languages,
            contributions
        };

        setCache(username, stats);

        return stats;

    } catch (error) {
        console.error("FULL ERROR:", error.response?.data || error.message);
        throw new Error("Failed to fetch GitHub data");
    }
};
