# BringIt (Transit/Delivery Core) - Design System

This document serves as the single source of truth for the application's UI/UX design language. It is based on the provided "System v2.4.0" screenshots.

## 1. Core Aesthetic
The application uses a **Modern Brutalist / Utilitarian** design language.
*   **Vibe:** Logistics terminal, high-contrast, structured, technical.
*   **Key Traits:** Thick borders, sharp edges (no/very minimal border-radius), monochrome base with single vibrant accent colors, monospaced functional typography, and dot-grid backgrounds.

## 2. Color Palette

| Usage | Hex Code | Description |
| :--- | :--- | :--- |
| **Primary Background** | `#F9F9F9` (approx) | Light gray/off-white. Often features a subtle dot-grid pattern (`#E0E0E0` dots). |
| **Surface/Card** | `#FFFFFF` | Pure white for cards, inputs, and distinct UI sections. |
| **Primary Text/Borders** | `#000000` | Pure black for all primary text, thick borders, and primary button backgrounds. |
| **Secondary Text** | `#757575` (approx) | Medium gray for muted text, placeholders, and secondary metadata. |
| **Accent (Active/Brand)** | `#003BFF` (approx) | Vibrant electric blue used for progress bars (live tracking), active states, and key highlights. |

## 3. Typography

The design relies heavily on uppercase, geometric, and technical fonts.

*   **Primary Font (Headers/Logos):** A bold, geometric sans-serif (e.g., *Space Grotesk*, *Archivo Black*, or *Inter Bold*). 
    *   *Usage:* App titles ("TRANSIT", "MY TRIPS"), primary card headers. Always **UPPERCASE**.
*   **Secondary Font (Data/Labels/Metadata):** A clear Monospace font (e.g., *Space Mono*, *Roboto Mono*, or *JetBrains Mono*).
    *   *Usage:* Small labels ("ORIGIN", "DEST"), system statuses ("ACTIVE_SESSIONS: 08"), IDs ("ID: 982-MT").
*   **Body Font:** A clean sans-serif for readable descriptions (e.g., *Inter* or *Helvetica*).

## 4. UI Components

### 4.1. Borders & Formatting
*   **Border Width:** `2px` to `4px` solid black borders on almost all actionable elements (Cards, Text Inputs, Buttons).
*   **Border Radius:** `0px` (sharp corners). The only exception is the main App Container/Phone Frame itself.
*   **Shadows:** Hard, solid black offset shadows (`box-shadow: 4px 4px 0px #000`), rather than soft/blurred drop shadows.

### 4.2. Buttons
*   **Primary Button:** 
    *   Background: `#000000`
    *   Text: `#FFFFFF` (Uppercase, bold/mono, e.g., "FIND TRAVELERS", "POST")
    *   Border: None or part of the structural grid.
*   **Secondary Button:** 
    *   Background: `#FFFFFF`
    *   Text: `#000000` (e.g., "DETAILS", "FIND REQUESTS")
    *   Border: `2px solid #000000`.

### 4.3. Cards
*   Cards have a white background, thick black borders, and strong internal dividers (e.g., separating the Origin/Dest row from the departure date row).
*   Avatars/Images are square, often grayscale or highly stylized, with their own solid black borders.

### 4.4. Inputs & Forms
*   White background, thick black borders.
*   Icons are solid or sharp-line black outlines, positioned clearly inside or adjacent to inputs.
*   Focus states should maintain the brutalist feel (e.g., reversing colors or thickening the border).

### 4.5. Status Indicators (Badges)
*   Badges (like "DUTY FREE", "LIVE TRACKING") are often stark blocks of color (Blue or Black) with white text, or simple text with a geometric prefix mark (like a square `■`).

## 5. Layout & Spacing
*   **Structure:** Heavily segmented. Horizontal lines are used generously to divide sections across the full width of the screen.
*   **Padding:** Generous internal padding within cards to let text breathe despite the heavy borders.

---
*Note: This document should be updated as new components are designed or specific exact variable names/font families are finalized for the codebase.*
