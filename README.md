# APP Upload Video AWS --> DB SQL
 Simple Upload Video on AWS Bucket to connect in DB from Hostinger

## Install Packages
```bash
npm install dotenv
npm install aws-sdk
npm install multer
```

#### Multer 
It's a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

#### dotenv
Environment variables to ignore on Github


## Run Server
```bash
node src/server/server.js
```

### Package to run simultaneously(not necessary)
```bash
npm install concurrently --save-dev
```

Modify package.json
```bash
{
  "scripts": {
    "dev": "concurrently \"npm run client\" \"npm run server\"",
    "client": "react-scripts start",  // O el comando que uses para tu cliente
    "server": "node src/server/server.js"  // Comando para iniciar el servidor
  }
}

```

## Screenshots

### Main Screen
<img src="stuff/img/screen.png" alt="main" width="900" height="400">

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
