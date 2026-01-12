import { themes } from "../themes/themes.js";

export const renderTrophies = (data, theme = "dark") => {
    const t = themes[theme] || themes.dark;

    const { profile, totalStars, totalRepos, contributions } = data;

    const trophies = [];

    if (contributions > 1000) trophies.push("🏆 1K+ Contributions");
    if (contributions > 5000) trophies.push("🥇 5K+ Contributions");
    if (totalStars > 100) trophies.push("⭐ 100+ Stars");
    if (totalStars > 500) trophies.push("🌟 500+ Stars");
    if (totalRepos > 20) trophies.push("📦 20+ Repos");
    if (profile.followers > 50) trophies.push("👥 50+ Followers");

    if (trophies.length === 0) trophies.push("🚀 Getting Started");

    const trophyText = trophies.map(
        (t, i) => `<text x="20" y="${70 + i * 30}" class="stat">${t}</text>`
    ).join("");

    return `
<svg width="500" height="260" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: bold 20px Arial; fill: ${t.text}; }
    .stat { font: 14px Arial; fill: ${t.text}; }
  </style>

  <rect width="100%" height="100%" rx="15" fill="${t.bg}" />

  <text x="20" y="40" class="title">${profile.login}'s Trophies</text>

  ${trophyText}

</svg>`;
};
