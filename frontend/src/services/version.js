export async function version() {
  return fetch("/version")
    .then((r) => r.text())
    .then((text) => {
      return text;
    })
    .catch((e) => "error");
}
