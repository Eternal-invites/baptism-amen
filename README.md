# የአሜን ጥምቀት — Baptism Invitation Website

An elegant, animated Ethiopian Orthodox baptism invitation website.
Built with plain **HTML + CSS + Vanilla JavaScript** — no frameworks, no backend.
Ready to publish with **GitHub Pages**.

## Files

```
index.html              → the page (all content & structure)
style.css               → theme, ornaments, animations
script.js               → ← EDIT THIS FILE for all event details
assets/images/amen.jpg  → ← REPLACE with Amen's real photo (same file name)
assets/images/church.jpg→ church photo (replace with your own to change it)
assets/audio/baptism.mp3→ optional background music (delete-free; site works without it)
```

## How to update the event details

Open **`script.js`** and edit the `CONFIG` block at the top:

| Setting | What it controls |
|---|---|
| `eventDateTime` | Baptism date & time, in **Ethiopian time** (`Africa/Addis_Ababa`). Format `"YYYY-MM-DDTHH:MM"`, e.g. `"2026-02-15T09:00"`. While it is empty (`""`), the countdown shows a placeholder instead of a fake timer. |
| `dateText`, `ceremonyTimeText` | The date/time shown in the ceremony section. |
| `churchName`, `churchMapUrl` | Church name and the Google Maps link behind "የቤተ ክርስቲያኑን አቅጣጫ ይመልከቱ". |
| `lunchDateText`, `lunchTimeText` | Lunch date/time shown in the lunch section. |
| `homeAddress` | The home address text. |
| `homeMapUrl` | Home Google Maps link. The "የቤቱን አቅጣጫ ይመልከቱ" button **only appears once you fill this in**. |
| `photo` | Path of the main photo (default `assets/images/amen.jpg`). |
| `gallery` | Array for extra photos, e.g. `["assets/images/amen2.jpg"]`. |
| `audio` | Path of the music file. If the file is missing, the music button simply does not appear. |

## How to add Amen's photo

1. Copy the real photo into `assets/images/`
2. Name it exactly **`amen.jpg`** (overwrite the placeholder)

Tips: a portrait photo works best (displayed as 3:4 inside an arch frame).

## How to add music

Place an instrumental/spiritual audio file at `assets/audio/baptism.mp3`.
The "ሙዚቃ ያብሩ" button will appear automatically. Sound never starts by itself.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `amen-baptism`)
2. Upload **all** files (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`)
3. In the repo: **Settings → Pages → Source: "Deploy from a branch"** → choose `main` and `/ (root)` → Save
4. After a minute your invitation will be live at:
   `https://<your-username>.github.io/amen-baptism/`

Before publishing, remember to fill in the date, times and addresses in `script.js`!

---

እግዚአብሔር ይባርካችሁ!
