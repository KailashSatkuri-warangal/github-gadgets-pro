import { themes } from "../themes/themes.js";

export const renderStats = (data, theme = "dark") => {
    const { profile, totalRepos, totalStars, languages, contributions } = data;

    const t = themes[theme] || themes.dark;

    const topLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang)
        .join(", ");

    return `
<svg width="500" height="260" viewBox="0 0 500 260"
  xmlns="http://www.w3.org/2000/svg">

  <style>
    .title { font: bold 20px Arial; fill: ${t.text}; }
    .stat { font: 14px Arial; fill: ${t.text}; }
    .accent { fill: ${t.accent}; }
  </style>

  <rect width="100%" height="100%" rx="15" fill="${t.bg}" />

  <text x="20" y="40" class="title">${profile.login}'s GitHub Stats</text>

  <text x="20" y="80" class="stat">Repositories: ${totalRepos}</text>
  <text x="20" y="110" class="stat">Stars: ${totalStars}</text>
  <text x="20" y="140" class="stat">Followers: ${profile.followers}</text>
  <text x="20" y="170" class="stat">Contributions: ${contributions}</text>

  <text x="20" y="210" class="stat">
    Top Languages: ${topLanguages}
  </text>

  <rect x="20" y="225" width="120" height="6" class="accent" rx="3"/>

</svg>`;
};
