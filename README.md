# Package to run simultaneously
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



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
