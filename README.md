# coneckin.github.io

Landing page panduan dan download aplikasi Coneckin.

## Struktur

```
coneckin.github.io/
├── index.html      # Halaman utama (panduan + download)
├── styles.css      # Styling (light/dark mode otomatis)
├── js/
│   └── main.js     # Entry point (ES6 module, Croot.js convention)
├── .nojekyll       # Supaya GitHub Pages tidak memproses Jekyll
└── README.md
```

## Cara Kerja

- Tombol **Download APK** otomatis mengarah ke release APK terbaru dari repo `coneckin/coneckin` di GitHub.
- Script `main.js` memanggil GitHub Releases API untuk menampilkan versi terbaru dan mengarahkan link download ke asset APK yang benar.
- Menggunakan konvensi **Croot.js**: zero-build, ES6 modules via CDN, tanpa bundler.

## Deploy

Push ke branch `main` → GitHub Pages menyajikan `index.html` secara otomatis.
