import { themes } from "../constants/themes.js";
import { useState } from "preact/hooks";

export const useSchema = () => {
  const [localSchema, setLocalSchema] = useState("");
  let schema = localStorage.getItem("theme");
  let prefersMode = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light-theme"
    : "default-theme";

  if (!schema) {
    localStorage.setItem("theme", prefersMode);
    setLocalSchema(prefersMode);
  } else {
    if (themes.find((color) => color.name === schema)) {
      setLocalSchema(schema);
    } else {
      localStorage.setItem("theme", prefersMode);
      setLocalSchema(prefersMode);
    }
  }

  return { localSchema };
};
