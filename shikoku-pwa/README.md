# Shikoku Rundt — standalone app

A self-contained version of the trip app. Uses your **phone's own browser storage**
instead of Claude's — works on any Claude plan (including free), because it isn't
running inside Claude at all anymore.

## Deploy to GitHub Pages (once, ~5 minutes)

1. Go to [github.com/new](https://github.com/new) and create a new repository.
   - Name it whatever you like, e.g. `shikoku-app`.
   - Keep it **Public** (GitHub Pages on a free account requires public repos).
   - Don't add a README/gitignore — leave it empty.

2. Upload the files in this folder to the repo:
   - Easiest way: on the repo's GitHub page, click **"uploading an existing file"**,
     then drag in all of these: `index.html`, `app.js`, `manifest.json`,
     `service-worker.js`, and the whole `icons` folder.
   - Commit directly to the `main` branch.

3. Turn on Pages:
   - In the repo, go to **Settings → Pages**.
   - Under "Build and deployment", set **Source: Deploy from a branch**.
   - Branch: **main**, folder: **/ (root)**. Save.

4. Wait about a minute, then your app is live at:
   `https://<your-github-username>.github.io/<repo-name>/`
   (GitHub shows you this exact URL at the top of the Pages settings once it's ready.)

## Install it on your phone

1. Open that URL in **Chrome** (Android) or **Safari** (iPhone).
2. Android: tap the **⋮** menu → **"Install app"** (or "Add to Home screen").
   iPhone: tap the **Share** icon → **"Add to Home Screen"**.
3. It now sits on your home screen like a normal app — opens full-screen, works
   offline once loaded, and everything you type is saved right there on your phone.

## Notes

- Data lives in your phone's browser storage for that specific site. Don't clear
  Safari/Chrome site data for this URL, or clearing it will wipe your entries —
  same as any website's local storage.
- If you ever want an actual `.apk` file instead of "Add to Home Screen": once this
  is live on GitHub Pages, go to [pwabuilder.com](https://www.pwabuilder.com), paste
  in your GitHub Pages URL, and it will generate a downloadable Android package for
  you — free, no coding needed.
- To update the app later, just re-upload the changed files to the same GitHub repo
  (or ask Claude to regenerate this folder and re-upload everything).
