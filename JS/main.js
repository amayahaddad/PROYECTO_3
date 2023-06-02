import { renderGraph } from "./graph.js";

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

const translateText = async (text, targetLanguage) => {
  const apiKey = "sacred-mantis-388618"; 
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    return data.data.translations[0].translatedText;
  } else {
    throw new Error(data.error.message);
  }
};

const cityInput = document.getElementById('city');
const getButton = document.getElementById('get');
const nameSpan = document.getElementById('cityName');
const countrySpan = document.getElementById('country');
const tempSpan = document.getElementById('temp');
const descriptionSpan = document.getElementById('description');
const mainDescriptionSpan = document.getElementById('mainDescription');
const maxTempSpan = document.getElementById('maxTemp');
const minTempSpan = document.getElementById('minTemp');
const context = document.getElementById('grafico');
const windSpan = document.getElementById('wind');
const sensTermSpan = document.getElementById('sensTerm');
const humiditySpan = document.getElementById('humidity');
const visibilitySpan = document.getElementById('visibility');

const readCity = async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const informacion = await fetch(url);
  const data = await informacion.json();
  const daily = await fetch(url2);
  const hour = await daily.json();

  console.log(hour);

  nameSpan.innerText = data.name;
  tempSpan.innerText = Math.floor(data.main.temp);
  countrySpan.innerText = data.sys.country;
  maxTempSpan.innerText = Math.floor(data.main.temp_max);
  minTempSpan.innerText = Math.floor(data.main.temp_min);
  windSpan.innerText = data.wind.speed;
  sensTermSpan.innerText = Math.floor(data.main.feels_like);
  humiditySpan.innerText = data.main.humidity;
  visibilitySpan.innerText = data.visibility;

  const weatherDescription = data.weather[0].description;
  const mainWeatherDescription = data.weather[0].main;
  descriptionSpan.innerText = weatherDescription;
  mainDescriptionSpan.innerText = mainWeatherDescription;

  const formatData = hour.list.slice(0, 8);

  console.log(formatData);

  const graphData = {
    name: 'Temperatura por horas',
    label: [],
    temp: [],
  };
  formatData.forEach(element => {
    graphData.label.push(element.dt_txt);
    graphData.temp.push(Math.floor(element.main.temp));
  });
  renderGraph(graphData, context);
};

getButton.addEventListener('click', readCity);
