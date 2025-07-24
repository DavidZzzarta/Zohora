import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export function ZohoraLogo({ styles }) {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="43 43 379 379"
      width="24"
      height="24"
    >
      <g
        transform="translate(0,465) scale(0.1,-0.1)"
        fill="#d50045"
        stroke="none"
      >
        <path
          d="M952 3698 l3 -403 799 -5 799 -5 -36 -47 c-20 -26 -85 -109 -145 -185 -166 -211 -378 -483 -417 -533 -46 -59 -271 -347 -299 -382 -11 -15 -70 -90 -131 -168 -60 -78 -155 -199 -210 -269 -55 -71 -111 -143 -125 -161 -14 -18 -68 -88 -120 -154 -165 -211 -147 -167 -155 -363 -4 -94 -4 -246 0 -336 l7 -165 992 -5 c754 -4 1011 -8 1076 -19 49 -7 158 -12 255 -12 165 1 174 2 300 38 112 33 205 69 205 80 0 1 -56 1 -124 -2 -116 -4 -125 -3 -145 17 -28 28 -27 50 9 99 41 57 91 87 190 114 74 20 107 23 260 22 112 -1 204 -6 255 -16 44 -9 81 -14 83 -13 9 7 -193 161 -244 185 -119 57 -172 65 -474 66 -278 0 -332 5 -384 31 l-28 15 32 33 c41 42 153 98 243 122 37 10 67 21 67 24 0 13 -82 39 -173 55 -125 22 -445 15 -527 -11 -46 -15 -109 -18 -391 -22 -194 -3 -344 -1 -353 4 -14 8 6 37 120 184 74 95 143 183 152 194 10 11 37 47 62 80 25 33 47 62 50 65 3 3 28 34 55 70 28 36 55 72 62 80 7 8 105 134 219 280 113 146 217 279 230 295 13 17 60 77 105 135 44 58 91 117 102 132 12 14 120 152 240 306 l217 280 0 336 0 336 -1355 0 -1355 0 2 -402z"
        ></path>
      </g>
    </svg>
  `;
}

export function QuestionSvg() {
  return html`
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16"
        stroke="var(--sixth-color)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `;
}

export function PaletteSvg() {
  return html`
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 8.5H15.51M10.5 7.5H10.51M7.5 11.5H7.51M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.6569 19.6569 15 18 15H17.4C17.0284 15 16.8426 15 16.6871 15.0246C15.8313 15.1602 15.1602 15.8313 15.0246 16.6871C15 16.8426 15 17.0284 15 17.4V18C15 19.6569 13.6569 21 12 21ZM16 8.5C16 8.77614 15.7761 9 15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5ZM11 7.5C11 7.77614 10.7761 8 10.5 8C10.2239 8 10 7.77614 10 7.5C10 7.22386 10.2239 7 10.5 7C10.7761 7 11 7.22386 11 7.5ZM8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5Z"
        stroke="var(--sixth-color)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `;
}

export function PlusSvg() {
  return html`
    <svg
      width="256px"
      height="256px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 12H18M12 6V18"
          stroke="#000000"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  `;
}

export function MoonSvg() {
  return html`
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
        stroke="var(--sixth-color)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `;
}

export function SettingsSvg() {
  return html`
    <svg
      width="24"
      height="24"
      viewBox="0 0 30 30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
      fill="none"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>settings</title>
        <desc>Created with Sketch Beta.</desc>
        <defs></defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          sketch:type="MSPage"
        >
          <g
            id="Icon-Set"
            sketch:type="MSLayerGroup"
            transform="translate(-101.000000, -360.000000)"
          >
            <path
              d="M128.52,381.134 L127.528,382.866 C127.254,383.345 126.648,383.508 126.173,383.232 L123.418,381.628 C122.02,383.219 120.129,384.359 117.983,384.799 L117.983,387 C117.983,387.553 117.54,388 116.992,388 L115.008,388 C114.46,388 114.017,387.553 114.017,387 L114.017,384.799 C111.871,384.359 109.98,383.219 108.582,381.628 L105.827,383.232 C105.352,383.508 104.746,383.345 104.472,382.866 L103.48,381.134 C103.206,380.656 103.369,380.044 103.843,379.769 L106.609,378.157 C106.28,377.163 106.083,376.106 106.083,375 C106.083,373.894 106.28,372.838 106.609,371.843 L103.843,370.232 C103.369,369.956 103.206,369.345 103.48,368.866 L104.472,367.134 C104.746,366.656 105.352,366.492 105.827,366.768 L108.582,368.372 C109.98,366.781 111.871,365.641 114.017,365.201 L114.017,363 C114.017,362.447 114.46,362 115.008,362 L116.992,362 C117.54,362 117.983,362.447 117.983,363 L117.983,365.201 C120.129,365.641 122.02,366.781 123.418,368.372 L126.173,366.768 C126.648,366.492 127.254,366.656 127.528,367.134 L128.52,368.866 C128.794,369.345 128.631,369.956 128.157,370.232 L125.391,371.843 C125.72,372.838 125.917,373.894 125.917,375 C125.917,376.106 125.72,377.163 125.391,378.157 L128.157,379.769 C128.631,380.044 128.794,380.656 128.52,381.134 L128.52,381.134 Z M130.008,378.536 L127.685,377.184 C127.815,376.474 127.901,375.749 127.901,375 C127.901,374.252 127.815,373.526 127.685,372.816 L130.008,371.464 C130.957,370.912 131.281,369.688 130.733,368.732 L128.75,365.268 C128.203,364.312 126.989,363.983 126.041,364.536 L123.694,365.901 C122.598,364.961 121.352,364.192 119.967,363.697 L119.967,362 C119.967,360.896 119.079,360 117.983,360 L114.017,360 C112.921,360 112.033,360.896 112.033,362 L112.033,363.697 C110.648,364.192 109.402,364.961 108.306,365.901 L105.959,364.536 C105.011,363.983 103.797,364.312 103.25,365.268 L101.267,368.732 C100.719,369.688 101.044,370.912 101.992,371.464 L104.315,372.816 C104.185,373.526 104.099,374.252 104.099,375 C104.099,375.749 104.185,376.474 104.315,377.184 L101.992,378.536 C101.044,379.088 100.719,380.312 101.267,381.268 L103.25,384.732 C103.797,385.688 105.011,386.017 105.959,385.464 L108.306,384.099 C109.402,385.039 110.648,385.809 112.033,386.303 L112.033,388 C112.033,389.104 112.921,390 114.017,390 L117.983,390 C119.079,390 119.967,389.104 119.967,388 L119.967,386.303 C121.352,385.809 122.598,385.039 123.694,384.099 L126.041,385.464 C126.989,386.017 128.203,385.688 128.75,384.732 L130.733,381.268 C131.281,380.312 130.957,379.088 130.008,378.536 L130.008,378.536 Z M116,378 C114.357,378 113.025,376.657 113.025,375 C113.025,373.344 114.357,372 116,372 C117.643,372 118.975,373.344 118.975,375 C118.975,376.657 117.643,378 116,378 L116,378 Z M116,370 C113.261,370 111.042,372.238 111.042,375 C111.042,377.762 113.261,380 116,380 C118.739,380 120.959,377.762 120.959,375 C120.959,372.238 118.739,370 116,370 L116,370 Z"
              id="settings"
              sketch:type="MSShapeGroup"
              fill="var(--sixth-color)"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  `;
}

export function GoogleSvg() {
  return html`
    <svg viewBox="0 0 48 48">
      <clipPath id="g">
        <path
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
        />
      </clipPath>
      <g class="colors" clip-path="url(#g)">
        <path fill="#FBBC05" d="M0 37V11l17 13z" />
        <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
        <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
        <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
      </g>
    </svg>
  `;
}

export function PieSvg() {
  return html`
    <svg
      width="256px"
      height="256px"
      viewBox="0 0 512 512"
      id="svg2793"
      style="fill: var(--sixth-color); fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
      version="1.1"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:serif="http://www.serif.com/"
      xmlns:svg="http://www.w3.org/2000/svg"
      stroke="#000000"
      stroke-width="0.00512"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs id="defs2797"></defs>
        <g
          id="_37-Pie-Chart"
          style="display:inline"
          transform="translate(-2048,-7168)"
        >
          <g id="g1997" transform="translate(2381.72,7219.69)">
            <path
              d="M 0,148.28 V 0.682 C 78.091,7.827 140.453,70.189 147.598,148.28 Z M -15,-30 c -8.284,0 -15,6.716 -15,15 v 178.28 c 0,8.284 6.716,15 15,15 h 178.28 c 8.284,0 15,-6.716 15,-15 C 178.28,56.705 91.575,-30 -15,-30"
              id="path1995"
              style="fill-rule:nonzero"
            ></path>
          </g>
          <g id="g2001" transform="translate(2324.48,7209.3)">
            <path
              d="M 0,429.41 V 245.91 H 183.5 C 176.179,343.742 97.832,422.089 0,429.41 M -180.098,245.91 H -30 v 150.097 c -79.465,-7.16 -142.939,-70.632 -150.098,-150.097 M -30,-0.079 V 215.91 H -246 C -238.561,100.204 -145.712,7.359 -30,-0.079 M 199.06,215.91 H 0 V -15.56 c 0,-8.284 -6.716,-15 -15,-15 -144.181,0 -261.48,117.295 -261.48,261.47 0,8.284 6.715,15 15,15 h 51.279 c 7.309,96.015 84.185,172.891 180.201,180.2 v 18.86 c 0,8.284 6.716,15 15,15 126.304,0 229.06,-102.756 229.06,-229.06 0,-8.284 -6.716,-15 -15,-15"
              id="path1999"
              style="fill-rule:nonzero"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  `;
}

export function BarSvg() {
  return html`
    <svg
      width="256px"
      height="256px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H9M9 21H15M9 21L9 4.6C9 4.03995 9 3.75992 9.10899 3.54601C9.20487 3.35785 9.35785 3.20487 9.54601 3.10899C9.75992 3 10.0399 3 10.6 3L13.4 3C13.9601 3 14.2401 3 14.454 3.10899C14.6422 3.20487 14.7951 3.35785 14.891 3.54601C15 3.75992 15 4.03995 15 4.6V21M15 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V19.4C21 19.9601 21 20.2401 20.891 20.454C20.7951 20.6422 20.6422 20.7951 20.454 20.891C20.2401 21 19.9601 21 19.4 21H15"
          stroke="var(--sixth-color)"
          stroke-width="1.416"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  `;
}

export function HandSvg() {
  return html`
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="display: block; margin: auto;"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="0.336"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6.9 11.4444V14.2222M6.9 11.4444V4.77778C6.9 3.8573 7.66112 3.11111 8.6 3.11111C9.53888 3.11111 10.3 3.8573 10.3 4.77778M6.9 11.4444C6.9 10.524 6.13888 9.77778 5.2 9.77778C4.26112 9.77778 3.5 10.524 3.5 11.4444V13.6667C3.5 18.269 7.30558 22 12 22C16.6944 22 20.5 18.269 20.5 13.6667V8.11111C20.5 7.19064 19.7389 6.44444 18.8 6.44444C17.8611 6.44444 17.1 7.19064 17.1 8.11111M10.3 4.77778V10.8889M10.3 4.77778V3.66667C10.3 2.74619 11.0611 2 12 2C12.9389 2 13.7 2.74619 13.7 3.66667V4.77778M13.7 4.77778V10.8889M13.7 4.77778C13.7 3.8573 14.4611 3.11111 15.4 3.11111C16.3389 3.11111 17.1 3.8573 17.1 4.77778V8.11111M17.1 8.11111V10.8889"
          stroke="var(--sixth-color)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  `;
}

export function BackSvg() {
  return html`
    <svg
      fill="var(--sixth-color)"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z"
        ></path>
      </g>
    </svg>
  `;
}

export function TrashSvg() {
  return html`
    <svg
      viewBox="0 0 24 24"
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--sixth-color)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>
            .cls-1 {
              fill: none;
              stroke: var(--sixth-color);
              stroke-miterlimit: 10;
              stroke-width: 1.91px;
            }
          </style>
        </defs>
        <path
          class="cls-1"
          d="M16.88,22.5H7.12a1.9,1.9,0,0,1-1.9-1.8L4.36,5.32H19.64L18.78,20.7A1.9,1.9,0,0,1,16.88,22.5Z"
        ></path>
        <line class="cls-1" x1="2.45" y1="5.32" x2="21.55" y2="5.32"></line>
        <path
          class="cls-1"
          d="M10.09,1.5h3.82a1.91,1.91,0,0,1,1.91,1.91V5.32a0,0,0,0,1,0,0H8.18a0,0,0,0,1,0,0V3.41A1.91,1.91,0,0,1,10.09,1.5Z"
        ></path>
        <line class="cls-1" x1="12" y1="8.18" x2="12" y2="19.64"></line>
        <line class="cls-1" x1="15.82" y1="8.18" x2="15.82" y2="19.64"></line>
        <line class="cls-1" x1="8.18" y1="8.18" x2="8.18" y2="19.64"></line>
      </g>
    </svg>
  `;
}

export function EditSvg() {
  return html`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="0.8160000000000001"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
          stroke="var(--sixth-color)"
          stroke-width="1.44"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  `;
}

export function CancelSvg() {
  return html`
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="var(--sixth-color)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>Close</title>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="Close">
            <rect
              id="Rectangle"
              fill-rule="nonzero"
              x="0"
              y="0"
              width="24"
              height="24"
            ></rect>
            <line
              x1="16.9999"
              y1="7"
              x2="7.00001"
              y2="16.9999"
              id="Path"
              stroke="var(--sixth-color)"
              stroke-width="2"
              stroke-linecap="round"
            ></line>
            <line
              x1="7.00006"
              y1="7"
              x2="17"
              y2="16.9999"
              id="Path"
              stroke="var(--sixth-color)"
              stroke-width="2"
              stroke-linecap="round"
            ></line>
          </g>
        </g>
      </g>
    </svg>
  `;
}

export function UserSvg() {
  return html`
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
          fill="#000000"
        ></path>
        <path
          d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
          fill="#000000"
        ></path>
      </g>
    </svg>
  `;
}

export function DangerSvg() {
  return html`
    <svg
      viewBox="0 -52 1128 1128"
      fill="#ff6685"
      class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M1103.834104 757.260169L910.925506 423.059499 718.016909 88.858829C686.001595 33.158717 628.341362 0 564.147392 0c-64.357314 0-121.854203 33.158717-154.03286 88.858829L24.133993 757.260169c-32.178657 55.700112-32.178657 122.18089 0 177.881002s89.675546 88.858829 154.03286 88.858829h771.797735c64.357314 0 121.854203-33.158717 154.03286-88.858829s32.015313-122.18089-0.163344-177.881002z m-84.775243 128.714628a78.780539 78.780539 0 0 1-69.094273 39.855798H178.166853c-28.911788 0-54.720051-14.864253-69.094274-39.855798a79.368576 79.368576 0 0 1 0-79.874941L494.889775 137.86186A79.221566 79.221566 0 0 1 564.147392 98.006062c28.911788 0 54.720051 14.864253 69.094273 39.855798l385.817196 668.40134a79.058223 79.058223 0 0 1 0 79.711597zM567.087574 623.155208c27.11501 0 49.003031-21.88802 49.003031-49.003031V275.397033c0-27.11501-21.88802-49.003031-49.003031-49.003031s-49.003031 21.88802-49.003031 49.003031v298.755144c0 26.951667 21.88802 49.003031 49.003031 49.003031zM567.087574 690.126017c-43.449354 0-78.731536 35.282182-78.731536 78.731536s35.282182 78.731536 78.731536 78.731536 78.731536-35.282182 78.731536-78.731536-35.282182-78.731536-78.731536-78.731536z m0 98.006061c-10.617323 0-19.274525-8.657202-19.274526-19.274525 0-10.617323 8.657202-19.274525 19.274526-19.274525s19.274525 8.657202 19.274525 19.274525c0 10.617323-8.657202 19.274525-19.274525 19.274525z"
        ></path>
      </g>
    </svg>
  `;
}
