# PromptBox – AI Prompt Manager

![Last Commit](https://img.shields.io/github/last-commit/1Jul1an/promptboxui?style=flat&color=brightgreen)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC--BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

---

## Overview

**PromptBox** is a clean, frontend-only MVP for managing AI prompts.  
It allows you to organize and categorize prompts for different LLMs (e.g. GPT-4, Claude, Gemini) with tags, models, and descriptions — all rendered client-side from local JSON data.

The app focuses on UI clarity, fast access, and a distraction-free workflow.

---

## Preview

<img width="1840" height="920" alt="grafik" src="https://github.com/user-attachments/assets/128e4c0b-a0b5-42ef-a8d5-38ea8e5f55cf" />

---

## Features

- Light/dark mode with smooth transitions  
- Prompt cards with title, model badge, and tags  
- Full-screen modal for prompt preview  
- Actions: copy to clipboard, edit, delete (simulated)  
- Filter by model, tags, or favorites  
- Responsive layout (desktop & mobile)  
- All data stored in a local JSON file (no backend)

---

## 🔍 Test it out

👉 Live Frontend-MVP: [promptboxui.vercel.app](https://promptboxui.vercel.app)  
Includes example prompts, filter system, preview modal and dark mode toggle.

---

## Use Cases

- Organize custom prompts for GPT-4, Claude, or other LLMs  
- Categorize prompts by purpose: writing, coding, analysis, etc.  
- Share and reuse prompt templates efficiently  
- Use as a lightweight personal prompt library

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Headless UI](https://img.shields.io/badge/Headless_UI-4B5563?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF476F?style=flat&logo=framer&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide-121212?style=flat&logo=figma&logoColor=white)
![JSON](https://img.shields.io/badge/Data-JSON-informational?style=flat&logo=json&logoColor=white)

---

## Getting Started

```bash
git clone https://github.com/1Jul1an/promptboxui.git
cd promptboxui
pnpm install
pnpm dev
