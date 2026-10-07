# Tri-Tend

Tri-Tend (Tender Intelligence) by Tridel Technologies finds and scores tenders from India's public
procurement portals for Tridel's focus areas.

This repository holds the app's releases and its user manual: no source code.

## User manual

**[Read the Tri-Tend user manual](docs/USER_MANUAL.md)**: installing, the dashboard, scans, AI scores, working on a
tender, tracking bids, settings and shortcuts. Also as a [PDF](docs/Tri-Tend-User-Manual.pdf).

## Updating

- **Tri-Tend 3.5.9 and later** look here once a day and offer to install a new version
  (Settings > About > Check for updates also works at any time).
- **Older copies**: close Tri-Tend, download `TenderIntelligence-Setup.exe` from the
  [latest release](https://github.com/Amandeep-Tridel/tri-tend/releases/latest) and run it. It updates the
  app in place; tenders, scores, documents, the bid pipeline and settings stay. Copies from 3.1.1 on can instead
  paste this into Settings > About > Update address:
  `https://github.com/Amandeep-Tridel/tri-tend/releases/latest/download/latest.json`

The setup is not code-signed yet, so Windows may say it is from an unknown publisher: choose **More info**, then
**Run anyway**. Each release lists the setup's SHA-256 checksum, and the app installs only a download that matches it.
