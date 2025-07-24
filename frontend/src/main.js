import { h, render, Fragment } from "preact";
import htm from "htm";
import "bulma/css/bulma.css";
import "../../public/style.css";

import { App } from "./App.js";

const html = htm.bind(h);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registrado:", registration);
      })
      .catch((error) => {
        console.log("Error al registrar SW:", error);
      });
  });
}

render(
  html`
    <${Fragment}>
        <${App} />
    </${Fragment}>
    `,
  document.body,
);
