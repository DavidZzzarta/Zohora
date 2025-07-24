export const getCurrency = () => {
  let countries = [
    "colombia",
    "mexico",
    "peru",
    "bolivia",
    "ecuador",
    "chile",
    "argentina",
    "españa",
  ];

  let currency = [];

  countries.map((e) => {
    fetch(`https://restcountries.com/v3.1/name/${e}`)
      .then((r) => r.json())
      .then((response) => {
        let info = {
          flag: response[0].cca2,
          description: `${response[0].name.nativeName.spa.official} (${response[0].flag})`,
        };
        currency.push(info);
      })
      .catch((e) => console.error(e));
  });
  return currency;
};
