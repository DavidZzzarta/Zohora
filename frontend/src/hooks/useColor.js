import { useEffect, useState } from "preact/hooks";
import { themes } from "../constants/themes.js";

export function useColor() {
  const [color, setColor] = useState();

  useEffect(() => {
    themes.forEach((e) => {
      document.body.classList.remove(e.name);
    });
    if (color) document.body.classList.add(color);
  }, [color]);

  return { changeColor: (e) => setColor(e) };
}
