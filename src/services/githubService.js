import axios from "axios";

const GITHUB_API = "https://api.github.com";

const githubClient = axios.create({
    baseURL: GITHUB_API,
    timeout: 30000, // prevent hanging requests
    headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
    }
});

// 🔍 TEMP DEBUG (remove after working)
console.log(
    "GitHub Auth Header:",
    process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN.slice(0, 8)}...` : "MISSING"
);

export const getUserProfile = async (username) => {
    try {
        const { data } = await githubClient.get(`/users/${username}`);
        return data;
    } catch (error) {
        console.error(
            `Failed to fetch user profile for ${username}:`,
            error.response?.status,
            error.response?.data || error.message
        );
        throw new Error(`Failed to fetch user profile for ${username}.`);
    }
};

export const getUserRepos = async (username) => {
    try {
        const { data } = await githubClient.get(
            `/users/${username}/repos?per_page=100`
        );
        return data;
    } catch (error) {
        console.error(
            `Failed to fetch user repos for ${username}:`,
            error.response?.status,
            error.response?.data || error.message
        );
        throw new Error(`Failed to fetch user repos for ${username}.`);
    }
};

export const getRepoLanguages = async (owner, repo) => {
    try {
        const { data } = await githubClient.get(
            `/repos/${owner}/${repo}/languages`
        );
        return data;
    } catch (error) {
        console.error(
            `Failed to fetch repo languages for ${owner}/${repo}:`,
            error.response?.status,
            error.response?.data || error.message
        );
        throw new Error(`Failed to fetch repo languages for ${owner}/${repo}.`);
    }
};
console.log(
    "GitHub Auth Header:",
    process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN.slice(0, 8)}...` : "MISSING"
);
