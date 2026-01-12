import { themes } from "../themes/themes.js";

export const renderLanguages = (data, theme = "dark") => {
    const t = themes[theme] || themes.dark;

    const langs = Object.entries(data.languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    let bars = "";

    langs.forEach(([lang, val], i) => {
        const width = (val / 10000) * 250;
        bars += `
    <rect x="150" y="${60 + i * 30}" height="12" width="0" fill="${t.accent}">
      <animate attributeName="width" from="0" to="${width}" dur="1s" fill="freeze"/>
    </rect>
    <text x="20" y="${70 + i * 30}" fill="${t.text}">${lang}</text>
    `;
    });

    return `
<svg width="500" height="250" xmlns="http://www.w3.org/2000/svg">
<rect width="100%" height="100%" rx="15" fill="${t.bg}"/>
${bars}
</svg>`;
};
