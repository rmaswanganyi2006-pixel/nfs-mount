# SU NFS Home Mount Assistant

A modern, responsive static website that helps Stellenbosch University Computer Science students generate the commands required to mount their NFS Home directory using SSHFS.

The website is designed to be hosted on **GitHub Pages** and uses only **HTML**, **CSS**, and **Vanilla JavaScript**.

---

## Features

- 🎨 Modern glassmorphism interface
- 🌈 Animated gradient background
- 🌙 Light/Dark mode with saved preference
- 📱 Fully responsive design
- 🎓 Student number generator
- 💻 Automatic SSHFS command generation
- 📋 Individual Copy buttons
- 📑 Copy All functionality
- 💾 Saves student number using Local Storage
- ✅ Progress checklist with persistent progress
- 🔄 Reset Progress button
- 📖 FAQ section
- 🛠 Troubleshooting guide
- 🔔 Toast notifications
- ♿ Accessible semantic HTML
- ⚡ Smooth animations and transitions

---

## Generated Commands

After entering your Stellenbosch University student number, the website generates the following commands automatically.

```bash
mkdir -p ~/nfs-home
```

```bash
sshfs STUDENTNUMBER@bach.sun.ac.za:/home/STUDENTNUMBER ~/nfs-home
```

```bash
mv ~/Downloads/cs-stow.sh ~/nfs-home
```

```bash
chmod 700 ~/nfs-home/cs-stow.sh
```

```bash
~/nfs-home/cs-stow.sh ~/nfs-home --backup
```

The placeholder `STUDENTNUMBER` is automatically replaced with the student number entered on the webpage.

---

# Screenshots

## Home Page

> *(Add screenshot here)*

```
screenshots/home.png
```

---

## Generated Commands

> *(Add screenshot here)*

```
screenshots/commands.png
```

---

## Dark Mode

> *(Add screenshot here)*

```
screenshots/dark-mode.png
```

---

# Project Structure

```
SU-NFS-Home-Mount-Assistant/

│── index.html
│── style.css
│── script.js
│── README.md
│── screenshots/
```

---

# Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Local Storage API
- Google Fonts (Inter)
- Font Awesome Icons

No frameworks or build tools are required.

---

# GitHub Pages Deployment

## 1. Create a GitHub Repository

Create a new repository named:

```
SU-NFS-Home-Mount-Assistant
```

---

## 2. Upload Files

Upload:

- index.html
- style.css
- script.js
- README.md

Commit the changes.

---

## 3. Enable GitHub Pages

Open:

```
Settings
```

↓

```
Pages
```

↓

Under **Build and Deployment**

Select

```
Deploy from a branch
```

Choose

```
main
```

Folder

```
/root
```

Save the settings.

---

## 4. Open Your Website

GitHub will provide a URL similar to

```
https://YOUR_USERNAME.github.io/SU-NFS-Home-Mount-Assistant/
```

---

# How to Use

1. Open the website.
2. Enter your 8-digit student number.
3. Click **Generate Commands**.
4. Copy each command individually or use **Copy All**.
5. Run the commands in your terminal.
6. Mark each completed step in the checklist.
7. Progress is automatically saved for future visits.

---

# Customization

## Change the Theme Colors

Open

```
style.css
```

Modify the CSS variables inside

```css
:root
```

Example

```css
--primary: #4f8cff;
```

---

## Change the Background

Replace the gradient inside

```css
body
```

with your preferred colors or add a background image.

---

## Modify Commands

Open

```
script.js
```

Locate the

```javascript
generatedCommands
```

array and edit the commands as needed.

---

## Add More FAQ Items

In

```
index.html
```

Duplicate one of the accordion sections and replace the title and content.

---

# Browser Compatibility

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Microsoft Edge | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Opera | ✅ |

The website works in all modern browsers supporting:

- CSS Variables
- Flexbox
- Grid
- Local Storage
- Clipboard API

---

# Accessibility

This project includes:

- Semantic HTML
- Keyboard navigation
- Accessible labels
- Responsive layout
- High-contrast support
- Focus indicators
- Mobile-friendly design

---

# License

This project is released under the MIT License.

You are free to modify, distribute, and use this project for personal or educational purposes.

---

# Author

Created for **Stellenbosch University Computer Science students**.

Built with HTML, CSS, and Vanilla JavaScript.