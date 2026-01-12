import axios from "axios";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export const getContributions = async (username) => {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const { data } = await axios.post(
      GITHUB_GRAPHQL,
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    // 🔹 Extract the total contributions as a number
    const contributions =
      data?.data?.user?.contributionsCollection?.contributionCalendar
        ?.totalContributions;

    if (contributions === undefined) {
      console.warn(`Contributions not found for user: ${username}`);
      return 0;
    }

    return contributions; // ✅ Returns a number
  } catch (error) {
    console.error(
      `GraphQL request failed for ${username}:`,
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch contributions from GitHub GraphQL API.");
  }
};
