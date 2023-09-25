import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// import { ThemeProvider } from 'styled-components'
// import { darkTheme } from './theme.ts'
// import
// @@ body {
//   font-weight: 300;
//   font-family: 'Source Sans Pro', sans-serif;
//   background-color:${(props) => props.theme.bgColor};
//   color:black;
//   line-height: 1.2;
// }
// a {
//   text-decoration:none;
//   color:inherit;
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
