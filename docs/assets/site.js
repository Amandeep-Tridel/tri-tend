// Tri-Tend website: the latest release's version, size, date and checksum from GitHub, the phone menu,
// and the manual's contents following the reader. The page works without any of it.
(function () {
  const REPO = "Amandeep-Tridel/tri-tend", SETUP = "TenderIntelligence-Setup.exe", KEY = "triTendRelease";

  function show(release) {
    const asset = (release.assets || []).find(a => a.name === SETUP);
    if (!asset) return;
    const set = (selector, text) => document.querySelectorAll(selector).forEach(el => { el.textContent = text; });
    set("[data-version]", release.tag_name.replace(/^v/, ""));
    set("[data-size]", `${Math.round(asset.size / 1e6)} MB`);
    set("[data-date]", new Date(release.published_at).toLocaleDateString(undefined, {day: "numeric", month: "long", year: "numeric"}));
    if (asset.digest && asset.digest.startsWith("sha256:")) set("[data-sha]", asset.digest.slice(7));
    document.querySelectorAll("[data-download]").forEach(a => { a.href = asset.browser_download_url; });
  }

  let cached = null;
  try { cached = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (e) { /* storage blocked */ }
  if (cached) show(cached);
  else fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {headers: {Accept: "application/vnd.github+json"}})
    .then(r => r.ok ? r.json() : null)
    .then(release => {
      if (!release) return;
      const slim = {tag_name: release.tag_name, published_at: release.published_at,
                    assets: release.assets.map(a => ({name: a.name, size: a.size, digest: a.digest, browser_download_url: a.browser_download_url}))};
      try { sessionStorage.setItem(KEY, JSON.stringify(slim)); } catch (e) { /* storage blocked */ }
      show(slim);
    })
    .catch(() => { /* offline or rate-limited: the built-in values stay */ });

  const nav = document.querySelector(".nav"), menu = document.querySelector(".menu-btn");
  if (menu) menu.addEventListener("click", () => menu.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); menu && menu.setAttribute("aria-expanded", "false"); }));

  const links = [...document.querySelectorAll(".toc a[href^='#']")];
  if (links.length && "IntersectionObserver" in window) {
    const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
    const seen = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id));
      const current = [...byId.keys()].find(id => seen.has(id));
      if (!current) return;
      links.forEach(a => a.classList.toggle("active", a === byId.get(current)));
    }, {rootMargin: "-80px 0px -65% 0px"});
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
  }
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
})();
