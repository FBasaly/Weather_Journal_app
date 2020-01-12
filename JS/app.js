// Add the URL and apikey
(function() {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "ceffa9e5a4829d51bd9c9cc9360b5375";

  const date = new Date().toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
// call the elements from the HTML
  const zipElem = document.getElementById("zip");
  const feelingsElem = document.getElementById("feelings");
  const generateBtn = document.getElementById("generate");

  const dateElem = document.getElementById("date");
  const tempElem = document.getElementById("temp");
  const contentElem = document.getElementById("content");
// createasync function to fetch the data 
  const getWeatherInfo = async zip =>
    await fetch(`${baseUrl}?zip=${zip}&units=metric&APPID=${apiKey}`);

  const saveEntry = async ({ temperature, date, feeling }) =>
    await fetch("/api/v1/entry", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ temperature, date, feeling })
    });
// createasync function to update the UI
  const updateUI = async () => {
    try {
      const { temperature, date, feeling } = await (await fetch(
        "/api/v1/entry"
      )).json();

      dateElem.textContent = date;
      tempElem.textContent = temperature;
      contentElem.textContent = feeling;
    } catch (err) {
      console.error(err);
    }
  };

  generateBtn.addEventListener("click", async () => {
    generateBtn.textContent = "Loading......";
    const zip = zipElem.value;
    const feeling = feelingsElem.value;
    const res = await getWeatherInfo(zip);
    generateBtn.textContent = "Generate";

    try {
      const {
        main: { temp: temperature }
      } = await res.json();
      await saveEntry({ temperature, date, feeling });
      await updateUI();
    } catch (err) {
      console.error(err);
    }
  });
})();
