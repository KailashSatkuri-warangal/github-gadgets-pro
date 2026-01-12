import { themes } from "../themes/themes.js";

export const renderStreak = (data, theme = "dark") => {
    const t = themes[theme] || themes.dark;
    const streak = Math.max(3, Math.floor(data.contributions / 200));

    return `
<svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
<style>
  .title{font:700 20px Arial;fill:${t.text}}
  .stat{font:14px Arial;fill:${t.text}}
  .pulse{animation:pulse 1.5s infinite}
  @keyframes pulse{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}
</style>

<rect width="100%" height="100%" rx="15" fill="${t.bg}"/>

<text x="20" y="40" class="title">🔥 Contribution Streak</text>
<text x="20" y="90" class="stat pulse">${streak} Days Active</text>

</svg>`;
};
