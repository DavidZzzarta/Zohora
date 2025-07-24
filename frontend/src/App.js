import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import htm from "htm";

import {
  AccountContext,
  ModalContext,
  HomePageContext,
  ColorThemeContext,
  TransactionContext,
  UserContext,
} from "./context.js";
import { AuthenticationPage } from "./pages/AuthenticationPage.js";
import { MainPage } from "./pages/MainPage.js";
import { useSchema } from "./hooks/useSchema.js";
import { useProfile } from "./hooks/useProfile.js";
import { useColor } from "./hooks/useColor.js";
import { getLocalAccounts, getServerAccounts } from "./services/accounts.js";

const html = htm.bind(h);

export function App() {
  const { localSchema } = useSchema();
  const { changeColor } = useColor();
  const [loginPage] = useState(window.location.pathname.split("/")[1]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [modal, setModal] = useState("");
  const [color, setColor] = useState("");
  const [homePage, setHomePage] = useState("home");

  const [user, setUser] = useState(false);
  const { response, refreshResponse } = useProfile();

  useEffect(() => {
    refreshResponse();
    setAccounts(getLocalAccounts());
  }, []);

  useEffect(() => {
    if (!localSchema) return;
    changeColor(localSchema);
  }, [localSchema]);

  useEffect(() => {
    if (!response) return;
    setUser(response);
    getServerAccounts().then((r) => setAccounts(r));
  }, [response]);

  return html`
  <${UserContext.Provider} value=${{ user }} >
  <${TransactionContext.Provider} value=${{ transactions, setTransactions }} >
  <${ColorThemeContext.Provider} value=${{ color, setColor }} >
  <${ModalContext.Provider} value=${{ modal, setModal }} >
  <${AccountContext.Provider} value=${{ accounts, setAccounts }} >
  <${HomePageContext.Provider} value=${{ homePage, setHomePage }} >
  <${Fragment}>
  <div class='background'></div>
    ${
      loginPage === "authentication"
        ? html`<${AuthenticationPage} />`
        : html`<${MainPage} />`
    }
    
  </${Fragment}>
  </${HomePageContext.Provider} >
  </${AccountContext.Provider}>
  </${ModalContext.Provider} >
  </${ColorThemeContext.Provider} >
  </${TransactionContext.Provider} >
  </${UserContext.Provider} >
    `;
}
