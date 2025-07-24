import { h } from "preact";
import htm from "htm";
import { useContext, useEffect, useState } from "preact/hooks";

import { ModalContext } from "../context.js";

import { ModalSkeleton } from "./ModalSkeleton.js";
import { ModalFooter } from "./ModalFooter.js";

import { version as v } from "../services/version.js";

const html = htm.bind(h);

export function FaqModal({ type }) {
  const { setModal } = useContext(ModalContext);
  const [version, setVersion] = useState("");

  useEffect(() => {
    // Verificar cache de versión
    const cachedVersion = localStorage.getItem("cachedVersion");
    const cacheTime = localStorage.getItem("cachedVersionTime");
    const now = Date.now();

    // Si tenemos cache válido (menos de 1 hora), usarlo
    if (cachedVersion && cacheTime && now - parseInt(cacheTime) < 3600000) {
      setVersion(cachedVersion);
      return;
    }

    // Si no hay cache válido, hacer la llamada
    v().then((vs) => {
      setVersion(vs);
      // Guardar en cache
      localStorage.setItem("cachedVersion", vs);
      localStorage.setItem("cachedVersionTime", now.toString());
    });
  }, []);

  return html`
    <${ModalSkeleton} type=${type} title='Preguntas y respuestas'>
      <section class="modal-card-body">
        <div class='block'>
          <p><strong>Autor: </strong>David Zarta</p>
          <p><strong>Licencia: </strong>MIT</p>
          <p><strong>Versión: </strong>${version}</p>
        </div>
        <div class='block content'>
          <p>Principales tecnologías usadas para el desarrollo de este proyecto:</p>
          <ul>
            <li><a class='link' href="https://typescriptlang.org" target="_blank" rel="noopener noreferrer">Typescript</a></li>
            <li><a class='link' href="https://expressjs.com" target="_blank" rel="noopener noreferrer">Express</a></li>
            <li><a class='link' href="https://bulma.io" target="_blank" rel="noopener noreferrer">Bulma.io</a></li>
            <li><a class='link' href="https://preactjs.com/" target="_blank" rel="noopener noreferrer">Preact</a><strong> + </strong><a class='link' href="https://github.com/developit/htm" target="_blank" rel="noopener noreferrer">htm</a></li>
            <li><a class='link' href="https://sequelize.org" target="_blank" rel="noopener noreferrer">Sequelize</a></li>
            <li><a class='link' href="https://postgresql.org" target="_blank" rel="noopener noreferrer">PostgreSQL</a></li>
          </ul>
        </div>
        <div class='block'>
          <p> <strong> Código fuente: </strong><a class='link' href="https://github.com/DavidZzzarta/Zohora/tree/main" target="_blank" rel="noopener noreferrer">github/DavidZzzarta/Zohora</a></p>
        </div>
        <p>Revisa nuestra <a class='link' href='/information/cookies' target="_blank">Política de cookies</a>, nuestros <a class='link' href='/information/terms' target="_blank">Términos y condiciones</a> y también nuestra <a class='link' href='/information/policy' target="_blank">Política de uso</a></p>
      </section>
      <${ModalFooter}>
        <button onClick=${() => setModal("")} class="button modal-cancel">Cerrar</button>
      </${ModalFooter}>
    </${ModalSkeleton}>
  `;
}
