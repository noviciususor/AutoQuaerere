# AutoQuaerere

**AutoQuaerere** is a Chromium browser extension by **noviciususor** for generating and sequentially opening randomized Bing search queries from a compact popup interface.

The project uses the official **noviciususor** dark green / metallic visual identity and is built with **Manifest V3**.

## Features

- Generate a custom number of randomized search queries
- Custom Bing `FORM ID`
- View the generated search queue directly in the popup
- **MANUAL OPEN** for opening searches one at a time
- **RUN BOT** for automatic sequential execution
- **STOP BOT** control while automation is active
- Randomized 5–8 second interval between automatic searches
- Persistent queue/state using `chrome.storage.local`
- Manifest V3 background service worker
- Dark UI based on the noviciususor palette
- Custom AutoQuaerere icon set

## Installation

1. Download or clone this repository.
2. Extract it if you downloaded a ZIP archive.
3. Open Microsoft Edge and go to `edge://extensions/`.
   - For Google Chrome, use `chrome://extensions/`.
4. Enable **Developer mode**.
5. Select **Load unpacked**.
6. Choose the `AutoQuaerere` folder.
7. Pin AutoQuaerere to the browser toolbar if desired.

## Usage

1. Open **AutoQuaerere** from the browser toolbar.
2. Enter the number of search links you want to generate.
3. Enter the Bing **FORM ID**.
4. Press **SAVE** to create the search queue.
5. Use **MANUAL OPEN** to process one search at a time, or **RUN BOT** to process the queue automatically.
6. Use **STOP BOT** to stop automatic execution.

## Project Structure

```text
AutoQuaerere/
├── manifest.json
├── background.js
├── popup.html
├── popup.css
├── popup.js
├── icon16.png
├── icon32.png
├── icon48.png
├── icon128.png
└── icon-source.png
```

## Permissions

AutoQuaerere currently requests:

- `tabs` — to update the active browser tab with generated searches
- `storage` — to preserve generated links and extension state
- `alarms` — to support Manifest V3 background scheduling

## Disclaimer

AutoQuaerere is provided for personal, educational, development, and testing purposes. Automated activity may be restricted by the terms of websites or services you use. You are responsible for complying with applicable terms, policies, and rules.

## Author

Created and maintained by noviciususor.

## Version

**AutoQuaerere v1.1.0**
