import { h } from "preact";
import htm from "htm";
import { FooterButton } from "./FooterButton.js";
import {
  QuestionSvg,
  PaletteSvg,
  PlusSvg,
  MoonSvg,
  SettingsSvg,
} from "../Svgs.js";

const html = htm.bind(h);

export function FooterApp() {
  return html`
    <div class="container is-max-tablet">
      <footer id="footer-home">
        <div class="columns is-mobile">
          <${FooterButton} type="faq" className="is-ghost" spacing="3">
            <span class="icon is-footer">
              <${QuestionSvg} />
            </span>
          </${FooterButton}>

          <${FooterButton} type="theme" className="is-ghost" spacing="2">
            <span class="icon is-footer">
              <${PaletteSvg} />
            </span>
          </${FooterButton}>

          <${FooterButton} type="plus" className="is-primary is-large" spacing="2" id="btn-plus">
            <span class="icon is-footer">
              <${PlusSvg} />
            </span>
          </${FooterButton}>

          <${FooterButton} type="dark" className="is-ghost" spacing="2">
            <span class="icon is-footer">
              <${MoonSvg} />
            </span>
          </${FooterButton}>

          <${FooterButton} type="set" className="is-ghost" spacing="3">
            <span class="icon is-footer">
              <${SettingsSvg} />
            </span>
          </${FooterButton}>
        </div>
      </footer>
    </div>
  `;
}
