/**
 * Coneckin Landing Page - Main Script
 * Menggunakan konvensi Croot.js (zero-build ES6 modules)
 */

import { onClick, show, hide } from 'https://cdn.jsdelivr.net/npm/crootjs@latest/lib/index.js';

// ---------- Konfigurasi ----------
const GITHUB_REPO = 'coneckin/coneckin';
const APK_NAME = 'coneckin.apk';
const RELEASES_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const DOWNLOAD_BASE = `https://github.com/${GITHUB_REPO}/releases/latest/download/${APK_NAME}`;

// ---------- Ambil versi terbaru ----------
async function fetchLatestVersion() {
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      tag: data.tag_name || '',
      version: (data.tag_name || '').replace(/^v/, ''),
      url: data.html_url || '',
      apk: findApkAsset(data.assets) || DOWNLOAD_BASE,
    };
  } catch {
    return null;
  }
}

function findApkAsset(assets) {
  if (!Array.isArray(assets)) return null;
  const apk = assets.find(
    (a) => a.name && a.name.toLowerCase().endsWith('.apk')
  );
  return apk ? apk.browser_download_url : null;
}

// ---------- Update UI ----------
async function init() {
  const release = await fetchLatestVersion();
  if (!release) return;

  // Perbarui tombol download agar mengarah ke APK asset terbaru
  const dlBtn = document.getElementById('download-btn');
  if (dlBtn && release.apk) {
    dlBtn.href = release.apk;
  }

  // Tampilkan versi
  const info = document.getElementById('version-info');
  if (info && release.version) {
    info.textContent = `Versi terbaru: ${release.version} · Android 10+`;
  }
}

// ---------- Smooth scroll navigasi ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- Boot ----------
init();
