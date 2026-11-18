/**
 * Coneckin Landing Page - Main Script
 * Konvensi Croot.js: zero-build, ES6 module, tanpa bundler.
 */

// ---------- Konfigurasi ----------
const GITHUB_REPO = 'coneckin/coneckin';
const RELEASES_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

// ---------- Ambil release terbaru dari GitHub ----------
async function fetchLatestRelease() {
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    const data = await res.json();

    // Cari asset APK — prioritaskan coneckin.apk, fallback ke *.apk manapun
    const apkUrl = findApkAsset(data.assets);

    return {
      tag: data.tag_name || '',
      version: (data.tag_name || '').replace(/^v/, ''),
      htmlUrl: data.html_url || '',
      apk: apkUrl,
    };
  } catch {
    return null;
  }
}

function findApkAsset(assets) {
  if (!Array.isArray(assets)) return null;

  // Prioritas: coneckin.apk → panlink.apk → *.apk pertama
  const preferred = assets.find(
    (a) => a.name && a.name.toLowerCase() === 'coneckin.apk'
  );
  if (preferred) return preferred.browser_download_url;

  const legacy = assets.find(
    (a) => a.name && a.name.toLowerCase() === 'panlink.apk'
  );
  if (legacy) return legacy.browser_download_url;

  const any = assets.find(
    (a) => a.name && a.name.toLowerCase().endsWith('.apk')
  );
  return any ? any.browser_download_url : null;
}

// ---------- Update UI ----------
async function init() {
  const release = await fetchLatestRelease();
  if (!release) return;

  // Perbarui tombol download ke URL asset yang benar
  const dlBtn = document.getElementById('download-btn');
  if (dlBtn && release.apk) {
    dlBtn.href = release.apk;
  }

  // Tampilkan info versi
  const info = document.getElementById('version-info');
  if (info && release.version) {
    info.textContent = `Versi terbaru: ${release.version} · Android 10+`;
  }
}

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- Boot ----------
init();
