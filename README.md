# CryptaBox Wallet — Proof of Concept (PoC)
[DEMO](https://cryptabox.github.io/cryptabox-demo/) || HOME PAGE: https://cryptabox.com/ 
---
CryptaBox is a browser-based cryptocurrency wallet designed with a strong emphasis on **security**, **anonymity**, and **client-side key generation**. This repository contains a **working prototype (PoC)** to demonstrate the wallet's internal logic and transparent architecture.

---

## 🚀 Overview

This PoC allows you to:

* Generate a cold wallet (client-side, no server storage)
* Create keys and addresses for BTC, ETH, LTC, and DOGE
* Build and sign transactions (BTC-like and ETH)
* Encode addresses as QR codes
* View lightweight charts using real price data

All functionality is executed on the **client side**, without centralized APIs or databases.

---

## 📁 Project Structure

```
/
├── index.html              # Main demo file (UI + generation test)
├── qrencode.html           # Supporting QR encoder interface
├── style.css               # Core styling
├── /jslibs                 # Third-party libraries
├── /jsbox                  # Custom scripts (wallet engine, TX builder)
```

---

## ⚙️ How to Use

1. Clone this repository or download as ZIP.
2. Open `index.html` in a modern browser.
3. Your keys are generated in-browser.
4. Use developer tools to inspect logic and verify security.

> Note: Internet access is required only for fetching charts (unless adapted to offline). Key generation is fully offline.

---

## 📦 Included Libraries

### 🔹 Third-Party Libraries (in `/jslibs`)

| Library                   | Purpose                                    | Source                                                                  |
| ------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| Crypto-JS v2.5.4 / v3.1.2 | Cryptographic hashing (SHA256, HMAC, etc.) | [Crypto-JS](http://code.google.com/p/crypto-js/)                        |
| jsbn / jsbn2 / ec.js      | Big number math & elliptic curve crypto    | [bitaddress.org](http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE) |
| jquery-qrcode v0.18.0     | QR code generation                         | [GitHub](https://larsjung.de/jquery-qrcode/)                            |
| html5-qrcode              | Webcam QR scanner                          | [GitHub](https://github.com/mebjas/html5-qrcode)                        |
| lightweight-charts        | Charts from TradingView                    | [GitHub](https://github.com/tradingview/lightweight-charts)             |
| ethers.js                 | Ethereum wallet functions                  | [ethers.org](https://docs.ethers.org/v5/)                               |
| js-sha3                   | Keccak hashing (ETH)                       | [GitHub](https://github.com/emn178/js-sha3)                             |
| jQuery & Color Animations | UI animation and DOM control               | [jquery.com](https://jquery.com)                                        |

---

### 🔧 Custom Scripts (in `/jsbox`)

| Script            | Function                                                                          |
| ----------------- | --------------------------------------------------------------------------------- |
| `coin.js`         | Modified version of CoinJS (supports ETH and random via `Crypto.getRandomValues`) |
| `binance.js`      | Core wallet logic — links all modules (PoC backbone)                              |
| `uix.js`          | Interface rendering and updates                                                   |
| `etherscript.js`  | Ethereum transaction construction and signing                                     |
| `calcfee.js`      | BTC-like TX size estimator (fee calculation)                                      |
| `script.js`       | BTC-like transaction generation                                                   |
| `chart-script.js` | Chart data integration using lightweight-charts                                   |

---

## 🔒 Security & Privacy

* Private keys are generated client-side using `Crypto.getRandomValues()`
* No keys, addresses, or transactions are sent to any server by default
* QR generation and scanning are local (browser-based)
* You **must** audit all scripts before using in production

---

## 🧪 Proof of Concept Disclaimer

This repository is provided as a **demonstration** for educational, research, and transparency purposes.

* ⚠️ **Do not use with real funds unless you understand all security implications.**
* API keys and full node endpoints are removed. You must provide your own.
* Scripts may need adaptation to your node provider's API.
* This is **not a complete production wallet** — but a PoC showcasing secure key handling and offline logic.

---

## 🧰 Recommendations for Developers

* Review and validate entropy sources used in key generation.
* Customize request logic for your backend / node provider.
* Replace "Your API Key" placeholders and test accordingly.
* You can fork and adapt this as a backendless wallet interface.

---

## 📜 License

* CoinJS is BSD licensed
* Other third-party scripts have permissive licenses (see respective headers)
* Your custom code can be licensed under MIT or another license as you prefer

---

If you have questions or want to contribute — feel free to open issues or fork the project.

Stay safe, and verify everything! 🔐
