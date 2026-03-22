# Meal Intelligence

A mobile-first Next.js form app that collects structured daily meal behavior data and saves responses to Google Sheets.

Built with **Next.js 14**, **TypeScript**, **Zustand**, and **Tailwind CSS**.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Entry point
├── components/
│   ├── ui.tsx               # Shared UI: Tile, Pill, ScaleCard, OptCard, MealBlock
│   ├── TopNav.tsx           # Progress bar + back button
│   ├── MealForm.tsx         # Step router + CTA button
│   ├── SuccessScreen.tsx    # Post-submit summary
│   └── steps/
│       ├── Step1Region.tsx  # Culinary region picker
│       ├── Step2Diet.tsx    # Diet type + non-veg details
│       ├── Step3Fats.tsx    # Ghee / butter / oil usage
│       ├── Step4Count.tsx   # Meals per day
│       └── Step5Meals.tsx   # Breakfast, lunch, dinner, snacks
├── store/
│   └── mealStore.ts         # Zustand store — all state + actions + validation
└── lib/
    └── submitToSheets.ts    # Google Sheets fetch helper
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Google Sheets

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste your Google Apps Script Web App URL:

```env
NEXT_PUBLIC_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

> See the **Google Sheets Setup** section below if you haven't done this yet.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Google Sheets Setup

### Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a blank spreadsheet
2. Name it **Meal Intelligence Responses**
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

### Step 2 — Create the Apps Script

1. In your Sheet: **Extensions → Apps Script**
2. Delete the default code
3. Paste the full contents of `MealIntelligence_AppScript.js`
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
5. Save (Ctrl+S) — name the project **Meal Intelligence**

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear ⚙️ → select **Web app**
3. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** → **Authorize access** → **Allow**
5. Copy the Web App URL

### Step 4 — Add URL to .env.local

```env
NEXT_PUBLIC_SHEET_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

---

## Form Steps

| Step | Screen | Key data collected |
|------|--------|--------------------|
| 1 | Region | Culinary background (Punjabi, Bengali, etc.) |
| 2 | Diet | Veg / Non-Veg / Vegan / Jain + frequency & protein preference |
| 3 | Cooking Fats | Ghee usage, butter usage, oil type, oil quantity |
| 4 | Meal Count | 2 / 3 / 4 meals per day + active meal selection |
| 5 | Meal Details | Breakfast type, lunch base + roti type, dinner base, snacks |

---

## Data Columns Saved to Sheet

| Column | Key |
|--------|-----|
| Timestamp | `timestamp` |
| Region | `region` |
| Diet | `diet` |
| Non-Veg Frequency | `nv_freq` |
| Non-Veg Preference | `nv_pref` |
| Ghee Usage | `ghee` |
| Butter Usage | `butter` |
| Oil Type | `oil_type` |
| Oil Quantity | `oil_qty` |
| Meals Per Day | `meals_per_day` |
| Meal Schedule | `meal_schedule` |
| Breakfast | `breakfast` |
| Lunch Base | `lunch_base` |
| Roti Type | `lunch_roti` |
| Dinner Base | `dinner_base` |
| Snacks | `snacks_types` |
| Snack Frequency | `snacks_freq` |

---

## Build for Production

```bash
npm run build
npm start
```

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [Zustand](https://zustand-demo.pmnd.rs/) — lightweight state management
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [TypeScript](https://www.typescriptlang.org/) — type safety throughout
- [Google Apps Script](https://script.google.com/) — free serverless backend for Sheets
