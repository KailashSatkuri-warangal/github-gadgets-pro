import { themes } from "../themes/themes.js";

export const renderBanner = (username, theme = "dark") => {
    const t = themes[theme] || themes.dark;

    return `
<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
<style>
  .glow{animation:glow 2s infinite}
  @keyframes glow{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}
</style>

<rect width="100%" height="100%" fill="${t.bg}"/>

<text x="50%" y="50%" text-anchor="middle"
class="glow" fill="${t.accent}" font-size="36">
${username} | Developer Portfolio
</text>
</svg>`;
};
