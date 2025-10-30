# Web Tools

A collection of powerful web utilities built with React that demonstrate various Web APIs and modern web development techniques.

## 🚀 Features

### Available Tools

1. **Home** - Landing page with feature showcase
2. **Text Editor** - Read, edit, view & save text files in HTML/TXT format
3. **Base64 Tool** - Encode/Decode media files to/from Base64 format
4. **Todo App** - (Coming Soon)
5. **Data Viewer** - (Coming Soon)
6. **Contact** - (Coming Soon)

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom React Router** - Client-side routing (Custom implementation)

### Key Dependencies

- **lucide-react** - Icon library
- **react-toastify** - Toast notifications
- **react-spinners** - Loading animations
- **react-responsive** - Media queries for responsive design
- **vite-plugin-qrcode** - QR code generation
- **prop-types** - Runtime type checking

## 🔌 Web APIs & Browser APIs Used

### Storage APIs

- **localStorage** - Persistent data storage for theme preferences and user settings on text editor
- **sessionStorage** - Temporary data storage for text editor content and form inputs on contact

### File APIs

- **FileReader API** - Read files as text, ArrayBuffer, or Data URLs
  - Used in Text Editor for reading text files
  - Used in Base64 Tool for encoding media files
- **Blob API** - Create blob objects for file generation
- **URL.createObjectURL()** - Generate temporary URLs for file previews
- **URL.revokeObjectURL()** - Clean up object URLs to prevent memory leaks

### Clipboard API

- **navigator.clipboard.writeText()** - Copy Base64 encoded text to clipboard
- **ClipboardEvent** - Handle paste events for large text

### Drag & Drop API

- **onDrop** - Handle file drop events
- **onDragOver** - Visual feedback during drag over
- **onDragLeave** - Reset styles when drag leaves
- **dataTransfer.files** - Access dropped files

### Media APIs

- **Audio API** - Background music player with play/pause controls

### History API

- **history.pushState()** - Navigate without page reload
- **history.replaceState()** - Replace current history entry
- **popstate event** - Handle browser back/forward buttons
- **Custom routing system** - Vanilla JS implementation for SPA navigation

### Document APIs

- **visibilitychange event** - Pause audio when tab becomes hidden
- **CustomEvent** - Dispatch custom events for routing
- **scrollIntoView()** - Smooth scrolling to result sections

### Fetch API

- Load default text data from assets
- Load audio files dynamically

### Misc APIs

- **Media Queries** - Responsive design implementation
- **Key Events** - Keyboard shortcuts and shortcuts
- **iframe** - Embed preview content

## 📁 Project Structure

```
web-tools/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Logo.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── MusicPlayer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ShinyLine.jsx
│   │   ├── Socials.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── TryModal.jsx
│   ├── layouts/            # Layout components
│   │   ├── Footer.jsx
│   │   ├── Frame.jsx
│   │   ├── Header.jsx
│   │   └── Main.jsx
│   ├── pages/              # Page components
│   │   ├── Base64Tool/
│   │   │   ├── page.jsx
│   │   │   ├── ActionZone.jsx
│   │   │   ├── DecodeArea.jsx
│   │   │   ├── EncodeArea.jsx
│   │   │   └── ResultView.jsx
│   │   ├── TextEditor/
│   │   │   ├── page.jsx
│   │   │   ├── Actions.jsx
│   │   │   ├── ResultView.jsx
│   │   │   └── TextArea.jsx
│   │   └── NotFound/
│   │       └── page.jsx
│   ├── utils/              # Utility functions
│   │   ├── base64ToBlob.js
│   │   └── fileReader.js
│   ├── constants/          # App constants
│   │   └── index.js
│   ├── assets/             # Static assets
│   │   ├── audios/
│   │   └── document/
│   ├── css/                # Global styles
│   │   └── animations.css
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global CSS
├── public/                 # Public assets
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies

```

## 🎯 Tool Details

### 1. Text Editor

- Upload and edit text files
- Support for HTML and TXT formats
- Real-time preview in iframe
- Download edited content
- Auto-save to sessionStorage
- Load default sample data
- Keyboard paste handling for large text

**Key Features:**

- Format toggling (HTML/TXT) for preview and download
- Session persistence
- File validation (4MB limit)

### 2. Base64 Tool

- Encode media files (images, audio, video) to Base64
- Decode Base64 strings back to media files
- Preview decoded media inline
- Copy Base64 string to clipboard
- Download encoded/decoded files
- Drag & drop file upload
- Large data handling with truncated preview

**Key Features:**

- Dual mode (Encode/Decode)
- Support for images, audio, and video files
- Max file size: 50MB for encoding
- Enter key shortcut for decoding
- Smart preview for large Base64 strings

### 3. Music Player (Global)

- Background audio playback
- Play/pause toggle
- Tab visibility awareness
- Space bar shortcut to control playback
- Auto-resume when tab becomes active
- Volume control (50% default)
- Looping enabled

## 🎨 UI Features

- Dark/Light theme toggle with localStorage persistence
- Custom routing system
- Try Modal for quick tool access

## 🎓 Learning Resources

This project demonstrates:

- Client-side routing without React Router
- File reading and manipulation
- Base64 encoding/decoding
- Drag & drop interfaces
- Progressive Enhancement
- State management with React Hooks
- Custom event handling
- Memory management with URL APIs
- Performance optimization with lazy loading

## 👨‍💻 Author

**Mahdi Rostami**

- GitHub: [@AnuXiii](https://github.com/AnuXiii)
- Instagram: [@mahdi.anuxi](https://instagram.com/mahdi.anuxi)
- Website: [mahdirostami.ir](https://mahdirostami.ir)

## 📄 License

This project is open source and available for educational purposes.
