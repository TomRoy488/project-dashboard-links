# Project & Dashboard Links

A responsive React application for managing and accessing project and dashboard links with quick copy functionality for usernames and passwords.

## Features

- 📋 One-click copy for usernames and passwords
- 📱 Fully responsive design
- 🎨 Modern, clean UI
- ⚡ Fast and lightweight

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project-dashboard-links
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for easy deployment on Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Project Structure

```
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # App-specific styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── netlify.toml         # Netlify configuration
```

## Technologies Used

- React 18
- Vite
- CSS3

## License

MIT

