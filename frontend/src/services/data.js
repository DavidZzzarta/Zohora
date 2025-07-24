export async function getUserData() {
  return fetch("/auth")
    .then((r) => r.json())
    .then((data) => {
      if (data.error) return null;
      else return data;
    })
    .catch((e) => console.error(e));
}
