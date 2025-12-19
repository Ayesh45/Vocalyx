# 🇮🇳 Interactive AAC & TTS Therapy Platform

> **Culturally Adapted Augmentative & Alternative Communication (AAC) with Text-to-Speech (TTS)**
> Built for Inclusive Education, Assistive Technology & Digital Rehabilitation in the Indian Context

---

## 📖 Table of Contents

* [Overview](#-overview)
* [Problem Statement](#-problem-statement)
* [Solution Summary](#-solution-summary)
* [Key Features](#-key-features)

  * [AAC System](#1-augmentative--alternative-communication-aac)
  * [Text-to-Speech](#2-text-to-speech-tts)
  * [Custom Indian Dataset](#3-custom-indian-centric-dataset)
  * [Interactive Interface](#4-interactive-visual-interface)
* [System Architecture](#-system-architecture)
* [Dataset Details](#-dataset-details)
* [Technologies Used](#-technologies-used)
* [How It Works](#-how-it-works)
* [Target Users](#-target-users)
* [Cultural & Accessibility Focus](#-cultural--accessibility-focus)
* [Testing & Validation](#-testing--validation)
* [Future Enhancements](#-future-enhancements)
* [Conclusion](#-conclusion)

---

## 📌 Overview

This project is an **Interactive Therapy & Communication Platform** that implements **Augmentative and Alternative Communication (AAC)** integrated with **Text-to-Speech (TTS)**, using **Indian-context visual symbols**.

Most existing AAC and therapy platforms are **Western-centric**, offering limited support for:

* Indian languages
* Indian cultural environments
* Local routines, food, transport, and social contexts

To address this gap, we built:

* An **interactive AAC system**
* A **TTS-enabled communication flow**
* A **custom-curated Indian image dataset**, created specifically because **relevant datasets are not widely available online**

---

## ❓ Problem Statement

Professionals in:

* Speech-Language Pathology (SLP)
* Special Education
* Occupational Therapy (OT)
* Applied Behavior Analysis (ABA)

rely heavily on visual and interactive therapy materials. However, in the Indian ecosystem:

* Available tools lack cultural relevance
* Indian AAC symbol datasets are extremely limited
* Manual creation of therapy content is time-consuming
* Learners receive non-contextual and less engaging materials

There is a strong need for a **localized, accessible, and interactive AAC + TTS solution**.

---

## 💡 Solution Summary

Our platform demonstrates a **working prototype** that:

* Enables **image-based AAC communication**
* Converts selections into **speech output via TTS**
* Uses **Indian-context visuals** for better comprehension and engagement
* Validates functionality using a **custom-built dataset**

---

## ✨ Key Features

### 1. Augmentative & Alternative Communication (AAC)

* Interactive AAC boards
* Image-based communication system
* Supports non-verbal and minimally verbal users
* Click/tap-based symbol selection

---

### 2. Text-to-Speech (TTS)

* Converts selected symbols or labels into speech
* Provides immediate audio feedback
* Designed to support multilingual and bilingual workflows (extensible)

---

### 3. Custom Indian-Centric Dataset

Since **very few Indian AAC datasets exist online**, we created our own **small-scale curated dataset** for testing and demonstration.

**Dataset characteristics:**

* Indian food items
* Household objects
* Daily routine visuals
* Contextually relevant communication symbols

**Why this matters:**

* Improves cultural familiarity
* Increases user engagement
* Validates AAC + TTS flow in Indian scenarios

---

### 4. Interactive Visual Interface

* Simple and intuitive UI
* Image-first design for accessibility
* Suitable for therapists, caregivers, and learners

---

## 🧠 System Architecture

```text
User Interaction (Click / Tap)
        ↓
AAC Symbol Mapping Layer
        ↓
Text Label Generation
        ↓
Text-to-Speech Engine
        ↓
Audio Output
```

**Components:**

* Frontend Interface (AAC Boards)
* AAC Logic Layer (symbol → meaning)
* TTS Engine (speech generation)
* Dataset Layer (images + labels)

---

## 📊 Dataset Details

* **Type:** Custom / Curated
* **Scale:** Prototype-level (small dataset)
* **Purpose:** Feature testing and proof-of-concept validation

This dataset was **not scraped or reused**, but **intentionally created** due to the lack of suitable Indian AAC resources.

---

## 🛠️ Technologies Used

* **Frontend:** Web-based UI (HTML / CSS / JavaScript or equivalent)
* **AAC Logic:** Rule-based symbol-to-text mapping
* **Text-to-Speech:** TTS API / Engine
* **Dataset:** Custom image-label dataset

> The architecture is modular and can be extended or replaced as needed.

---

## ⚙️ How It Works

1. User selects an image from the AAC board
2. The system maps the image to its text label
3. The TTS engine converts text into speech
4. Audio output is played instantly

This enables users to **communicate needs, choices, or responses** effectively.

---

## 👥 Target Users

* Children with speech and communication challenges
* Non-verbal or minimally verbal individuals
* Speech therapists and special educators
* Parents and caregivers

---

## 🌍 Cultural & Accessibility Focus

* Indianized visual representations
* Inclusive education and therapy design
* Low-bandwidth friendly concept
* Reduces dependence on Western-only tools

---

## 🧪 Testing & Validation

All features were tested using the **custom-built dataset**, validating:

* AAC symbol interaction
* End-to-end TTS flow
* UI responsiveness and usability

---

## 🔮 Future Enhancements

* Larger Indian AAC symbol datasets
* Support for multiple Indian languages
* Drag-and-drop AAC board authoring
* Offline-first support
* Therapy progress tracking
* Resource-sharing marketplace

---

## 🏁 Conclusion

This project presents a **culturally relevant AAC + TTS prototype** tailored for the Indian ecosystem. By combining:

* Interactive AAC boards
* Text-to-Speech output
* A custom Indian-context dataset

we lay the foundation for a **scalable, inclusive, and locally relevant assistive communication platform**.

---

### 🙌 Built with a focus on accessibility, inclusion, and cultural relevance

## ACKNOWLEDGEMENTS 
A huge thank you to my teammates - Sachin, Ayesha and Saffanah without which the project would not have taken this form in such a short time frame.

PPT LINK - https://docs.google.com/presentation/d/1oqaDy_zzLrSoGsJC7QeKPbubP4RAO9qckKIA8sfpstE/edit?usp=sharing

--------------------------------------------------------------------------------------------------------------------------------------------------------

### FUTURE INNOVATION

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
