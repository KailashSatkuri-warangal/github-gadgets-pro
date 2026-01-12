document.getElementById("generateBtn").addEventListener("click", loadAll);

function getUsername() {
    return document.getElementById("usernameInput").value.trim();
}

function buildMarkdown(title, url) {
    return `![${title}](${url})`;
}

function buildHTML(url) {
    return `<img src="${url}" alt="GitHub Widget" />`;
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function animateSections() {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("show");
    });
}

function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

function toggleDetails(button) {
    const details = button.nextElementSibling;

    if (details.style.display === "none") {
        details.style.display = "block";
        button.innerText = "Hide Details";
    } else {
        details.style.display = "none";
        button.innerText = "View Details";
    }
}

async function loadAll() {
    const username = getUsername();
    if (!username) {
        alert("Please enter a GitHub username");
        return;
    }

    showLoader();

    /* ---------- AI SUMMARY ---------- */
    const aiRes = await fetch(`/api/ai-summary?username=${username}`);
    const aiData = await aiRes.json();

    document.getElementById("aiSummaryPreview").innerText = aiData.aiSummary;
    document.getElementById("aiSummaryMarkdown").innerText =
        `**AI Profile Summary**\n\n${aiData.aiSummary}`;
    document.getElementById("aiSummaryHTML").innerText =
        `<p>${aiData.aiSummary}</p>`;

    /* ---------- PROJECT SHOWCASE ---------- */
    const projRes = await fetch(`/api/project-showcase?username=${username}`);
    const projData = await projRes.json();

    const projectContainer = document.getElementById("projectsPreview");
    projectContainer.innerHTML = "";

    let projectMarkdown = "";
    let projectHTML = "";

    projData.projects.forEach(p => {
        const div = document.createElement("div");
        div.className = "project-card";

        div.innerHTML = `
      <h3>${p.name}</h3>
      <p class="project-summary">${p.aiSummary}</p>

      <div class="project-meta">
        <span class="badge">${p.language || "General"}</span>
        <span class="badge">⭐ ${p.stars || 0}</span>
      </div>

      <button onclick="toggleDetails(this)">View Details</button>

      <div class="project-details" style="display:none;">
        <p><strong>Description:</strong> ${p.description || "No description"}</p>
        <p><strong>Topics:</strong> ${(p.topics && p.topics.join(", ")) || "N/A"}</p>
        <p><strong>Forks:</strong> ${p.forks || 0}</p>
        <p><strong>Open Issues:</strong> ${p.openIssues || 0}</p>
        <p><strong>Last Updated:</strong> ${p.updatedAt || "N/A"}</p>
        <a href="${p.url}" target="_blank">Open on GitHub</a>
      </div>
    `;

        projectContainer.appendChild(div);

        projectMarkdown += `### ${p.name}\n${p.aiSummary}\n[Repo Link](${p.url})\n\n`;
        projectHTML += `<h3>${p.name}</h3><p>${p.aiSummary}</p><a href="${p.url}">Repo</a><hr/>`;
    });

    document.getElementById("projectsMarkdown").innerText = projectMarkdown;
    document.getElementById("projectsHTML").innerText = projectHTML;

    /* ---------- IMAGE WIDGETS ---------- */
    const widgets = {
        stats: "GitHub Stats",
        streak: "Contribution Streak",
        heatmap: "Contribution Heatmap",
        languages: "Top Languages",
        trophies: "GitHub Trophies",
        banner: "Profile Banner"
    };

    for (const key in widgets) {
        const imgUrl = `/api/${key}?username=${username}`;

        document.getElementById(`${key}Preview`).src = imgUrl;

        document.getElementById(`${key}Markdown`).innerText =
            buildMarkdown(widgets[key], imgUrl);

        document.getElementById(`${key}HTML`).innerText =
            buildHTML(imgUrl);
    }

    /* ---------- BUILD README LAST ---------- */
    buildFullREADME(username);

    hideLoader();
    animateSections();
}

function buildFullREADME(username) {
    const parts = [];

    parts.push(`# ${username}'s GitHub Profile\n`);
    parts.push("## AI Profile Summary\n");
    parts.push(document.getElementById("aiSummaryMarkdown").innerText + "\n");

    parts.push("## Top Projects\n");
    parts.push(document.getElementById("projectsMarkdown").innerText + "\n");

    parts.push("## GitHub Stats\n");
    parts.push(document.getElementById("statsMarkdown").innerText + "\n");

    parts.push("## Contribution Streak\n");
    parts.push(document.getElementById("streakMarkdown").innerText + "\n");

    parts.push("## Contribution Heatmap\n");
    parts.push(document.getElementById("heatmapMarkdown").innerText + "\n");

    parts.push("## Top Languages\n");
    parts.push(document.getElementById("languagesMarkdown").innerText + "\n");

    parts.push("## GitHub Trophies\n");
    parts.push(document.getElementById("trophiesMarkdown").innerText + "\n");

    parts.push("## Profile Banner\n");
    parts.push(document.getElementById("bannerMarkdown").innerText + "\n");

    document.getElementById("readmeMarkdown").innerText = parts.join("\n");
}

function downloadREADME() {
    const content = document.getElementById("readmeMarkdown").innerText.trim();

    if (!content) {
        alert("README is still generating. Please wait a few seconds.");
        return;
    }

    const blob = new Blob([content], { type: "text/markdown" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
}
