import { h } from "preact";
import htm from "htm";
import { useState } from "preact/hooks";

import { GoogleButton } from "./components/GoogleButton.js";
import { InputForm } from "./components/InputForm.js";

import { isUsername, isEmail, isPassword } from "./utils/validators.js";

const html = htm.bind(h);

function SendButton() {
  return html`
    <div class="field">
      <div class="control">
        <button type="submit" class="button is-primary">Enviar</button>
      </div>
    </div>
  `;
}

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = new FormData(e.target);
    const email = fields.get("email");
    const password = fields.get("password");
    if (isEmail({ value: email }) && isPassword({ value: password })) {
      setErrorMessage("");
      let init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      fetch("/auth/login", init)
        .then((r) => r.json())
        .then((response) => {
          if (response.error)
            setErrorMessage(
              "Ocurrió un error intentando acceder, intenta otra vez",
            );
          else window.location.href = "/";
        })
        .catch((e) =>
          setErrorMessage(
            "Ocurrió un error intentando acceder, intenta otra vez",
          ),
        );
      return;
    } else {
      setErrorMessage("Verifica la información");
    }
  };
  return html`
    <form onSubmit=${handleSubmit}>
      <${GoogleButton} text="Entrar con Google" href="auth/google" />
      <${InputForm}
        type="email"
        placeholder="algun@ejemplo.com"
        label="Correo"
        errorMessage="Correo inválido"
        name="email"
      />
      <${InputForm}
        type="password"
        placeholder="********"
        label="Contraseña"
        errorMessage="Contraseña débil"
        name="password"
      />
      <p class="help is-danger">${errorMessage}</p>

      <${SendButton} />
    </form>
  `;
}

function RegistryForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = new FormData(e.target);
    const username = fields.get("username");
    const email = fields.get("email");
    const password = fields.get("password");
    const rPassword = fields.get("rPassword");
    if (
      isUsername({ value: username }) &&
      isEmail({ value: email }) &&
      isPassword({ value: password }) &&
      password === rPassword
    ) {
      setErrorMessage("");
      let init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      };
      fetch("/auth", init)
        .then((r) => r.json())
        .then((response) => {
          if (response.error) {
            console.log(response);
            setErrorMessage(
              "Ocurrió un error creando el usuario, intenta otra vez",
            );
          } else {
            window.location.href = `/auth/otp?type=create&email=${email}`;
          }
        })
        .catch((e) =>
          setErrorMessage(
            "Ocurrió un error creando el usuario, intenta otra vez",
          ),
        );
      return;
    } else {
      setErrorMessage("Verifica la información");
    }
  };
  return html`
    <form onSubmit=${handleSubmit}>
      <${GoogleButton} text="Registrarse con Google" href="auth/google" />
      <${InputForm}
        name="username"
        type="text"
        placeholder="Marco"
        label="Nombre de usuario"
        errorMessage="Nombre de usuario demasiado corto"
      />
      <${InputForm}
        name="email"
        type="email"
        placeholder="algun@ejemplo.com"
        label="Correo"
        errorMessage="Correo inválido"
      />
      <${InputForm}
        name="password"
        type="password"
        placeholder="********"
        label="Contraseña"
        errorMessage="Contraseña débil"
      />
      <${InputForm}
        name="rPassword"
        type="password"
        placeholder="********"
        label="Repetir contraseña"
        errorMessage="Contraseña débil"
      />

      <p class="par">
        Al registrarte, aceptas los
        <a class="link" href="/information/terms"> Términos de servicio</a> y la
        <a class="link" href="/information/policy"> Política de privacidad</a>,
        incluida la política de
        <a class="link" href="/information/cookies"> Uso de Cookies</a>.
      </p>
      <p class="help is-danger">${errorMessage}</p>

      <${SendButton} />
    </form>
  `;
}

export function Form() {
  const [form, setForm] = useState("login");

  return html`
    <div class="container is-max-tablet">
      <div class="box">
        <h1 class="title is-4">Inicia sesion o registrate</h1>
        <div class="tabs is-boxed is-centered is-fullwidth ">
          <ul>
            <li class=${form === "login" ? "is-active" : ""}>
              <a onClick=${() => setForm("login")}>Iniciar sesion</a>
            </li>
            <li class=${form === "registry" ? "is-active" : ""}>
              <a onClick=${() => setForm("registry")}>Registrarse</a>
            </li>
          </ul>
        </div>
        ${form === "login" ? html`<${LoginForm} />` : html`<${RegistryForm} />`}
      </div>
    </div>
  `;
}

function Social() {
  return html`
    <div class="container is-max-tablet has-text-centered">
      <p>
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/DavidZzzarta/Zohora/tree/main"
          >GitHub</a
        >
        -
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:jhottfriend@gmail.com?subject=[Bug]"
          >Contacto</a
        >
        -
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/DavidZzzarta/Zohora/tree/main"
          >Reseña</a
        >
      </p>
    </div>
  `;
}

export function FormSection() {
  return html`
    <section class="section is-small">
      <${Form} />
      <br />
      <${Social} />
    </section>
  `;
}
