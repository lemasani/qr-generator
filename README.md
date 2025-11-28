# QR Code Generator

A modern, beautiful QR code generator built with React, TypeScript, and Tailwind CSS. Generate QR codes from any URL and download them as PNG images.

## ✨ Features

- 🎨 **Beautiful UI** - Modern glass-morphism design with gradient backgrounds
- ⚡ **Real-time Generation** - QR codes generate instantly as you type
- 💾 **Download Support** - Export QR codes as PNG images
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Type-safe** - Built with TypeScript for better code quality
- 🚀 **Fast** - Powered by Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **React 19** - Latest version of React with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS 4** - Utility-first CSS framework
- **qrcode.react** - QR code generation library

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/lemasani/qr-generator.git
cd qr-generator
```

2. Install dependencies using pnpm:

```bash
pnpm install
```

## 🚀 Usage

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
pnpm build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

### Lint

Run ESLint to check code quality:

```bash
pnpm lint
```

## 📖 How to Use

1. Open the application in your browser
2. Enter any URL in the input field
3. The QR code will be generated automatically
4. Click the "Download QR Code" button to save it as a PNG image

## 🎨 Customization

The QR code size and styling can be customized in `src/App.tsx`:

- **QR Code Size**: Modify the `size` prop in `<QRCodeCanvas size={200} />`
- **Colors**: Update Tailwind classes for different color schemes
- **Layout**: Adjust the component structure and spacing

## 📁 Project Structure

```text
qr-generator/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── public/              # Public assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License
