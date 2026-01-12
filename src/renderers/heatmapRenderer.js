import { themes } from "../themes/themes.js";

export const renderHeatmap = (data, theme = "dark") => {
    const t = themes[theme] || themes.dark;

    let boxes = "";
    for (let i = 0; i < 70; i++) {
        const x = 20 + (i % 14) * 20;
        const y = 50 + Math.floor(i / 14) * 20;
        const op = (i % 5) / 5 + .2;
        boxes += `<rect x="${x}" y="${y}" width="14" height="14"
      fill="${t.accent}" opacity="${op}">
      <animate attributeName="opacity"
      values="0.2;1;0.2" dur="3s" repeatCount="indefinite"/>
    </rect>`;
    }

    return `
<svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
<rect width="100%" height="100%" rx="15" fill="${t.bg}"/>
${boxes}
</svg>`;
};
