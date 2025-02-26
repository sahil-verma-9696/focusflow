# 📌 Using Theme Colors in Tailwind CSS

This guide explains how to use the **Hackathon Hub Theme Colors** in Tailwind CSS, based on your custom configuration.

---

## 🎨 **Color Palette**

| Color Name      | Light Mode    | Dark Mode    |
|---------------|-------------|-------------|
| **Primary**   | `#415A80` (Deep Azure)  | `#007BFF` (Bright Azure Blue) |
| **Secondary** | `#A5D4DC` (Midwinter Mist)  | `#A5D4DC` (Same as Light Mode) |
| **Background** | `#F2F4F8` (Snowbelt)  | `#121212` (Charcoal Black) |
| **Accent**    | `#D7E2E9` (Early Frost)  | `#9B51E0` (Vibrant Purple) |
| **Text**      | `#1E1E1E` (Dark Gray)  | `#F2F4F8` (Snowbelt) |

---

## 📌 **Tailwind CSS Class Names**

Use these classes to apply the theme colors dynamically.

### ✅ **Background Colors**
```html
<div class="bg-background-light dark:bg-background-dark">
  Background Example
</div>
```

### ✅ **Text Colors**
```html
<p class="text-text-light dark:text-text-dark">
  This is text with theme colors.
</p>
```

### ✅ **Primary Colors (Buttons, Headers, Links)**
```html
<h1 class="text-primary-light dark:text-primary-dark">
  Welcome to the Hackathon Hub
</h1>
```

```html
<button class="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-md">
  Click Me
</button>
```

### ✅ **Secondary Colors (Subheadings, Supporting Elements)**
```html
<h2 class="text-secondary-light dark:text-secondary-dark">
  Collaboration in Real Time
</h2>
```

### ✅ **Accent Colors (Borders, Highlights, Active States)**
```html
<div class="border-2 border-accent-light dark:border-accent-dark p-4 rounded-md">
  Accent Box
</div>
```

---

## ⚡ **Dark Mode Toggle (Next.js Example)**

To enable dark mode switching dynamically, use the following:

```tsx
"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md bg-primary-light dark:bg-primary-dark text-white"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
```

---

## 🎯 **Final Notes**
- All colors are configured in `tailwind.config.js`.
- Dark mode classes work automatically when the `dark` class is applied to `<html>`.
- This ensures a **clean, modern, and readable UI** for your hackathon hub.

Happy Coding! 🚀

