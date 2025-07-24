import { h, Fragment } from "preact";
import htm from "htm";
import { useContext } from "preact/hooks";

import { TransactionsApp } from "./TransactionsApp.js";
import { ChartsApp } from "./components/ChartsApp.js";
import { HomePageContext } from "./context.js";
import { Accounts } from "./Accounts.js";
import { FooterApp } from "./components/FooterApp.js";

const html = htm.bind(h);

export function HomeApplication() {
  const { homePage } = useContext(HomePageContext);
  // if homePage is "home", show the home page
  return html`
  <${Fragment}>
    <div class="container is-max-tablet">
      <div id='space-bg'></div>
    </div>
    <div class='container is-max-tablet'>
      ${
        homePage === "home"
          ? html`
              <div class="main">
                <${Accounts} />
              </div>
              <div class="main">
                <${ChartsApp} />
              </div>
            `
          : html`
              <div class="main">
                <${TransactionsApp} />
              </div>
            `
      }
      <br />
      </div>
    <${FooterApp} />
  </${Fragment}>
  `;
}
