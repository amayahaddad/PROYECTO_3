import { renderGraph } from "./graph.js";

const apiKey = "4d8fb5b93d4af21d66a2948710284366";


const cityInput = document.getElementById('city')
const getButton = document.getElementById('get')
const nameSpan = document.getElementById('cityName')
const countrySpan = document.getElementById('country')
const tempSpan = document.getElementById('temp')
const maxTempSpan = document.getElementById('maxTemp')
const minTempSpan = document.getElementById('minTemp')
const context = document.getElementById('grafico')
const windSpan = document.getElementById('wind')
const sensTermSpan = document.getElementById('sensTerm')
const humiditySpan = document.getElementById('humidity')
const visibilitySpan = document.getElementById('visibility')

const readCity = async (event) => {   
event.preventDefault()
const city = cityInput.value
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
const informacion = await fetch(url)
const data = await informacion.json()
const daily = await fetch(url2)
const hour = await daily.json()

console.log(hour)

nameSpan.innerText = data.name
tempSpan.innerText = Math.floor(data.main.temp)
countrySpan.innerText = data.sys.country
maxTempSpan.innerText = Math.floor(data.main.temp_max)
minTempSpan.innerText = Math.floor(data.main.temp_min)
windSpan.innerText = data.wind.speed
sensTermSpan.innerText = Math.floor(data.main.feels_like)
humiditySpan.innerText = data.main.humidity
visibilitySpan.innerText = data.visibility

const formatData = hour.list.slice(0,8)

console.log(formatData)

const graphData = {
    name: 'Temperatura por horas', 
    label: [],
    temp: [],
}
formatData.forEach(element => { 
    graphData.label.push(element.dt_txt)
    graphData.temp.push(Math.floor(element.main.temp))
});
renderGraph(graphData, context)
}

getButton.addEventListener('click', readCity)



// getButton.addEventListener('click', readCity)

    // grafico
    // const canva = document.getElementById("grafico")
    // graph (datos.serie, canva)

// const form = document.querySelector(".d-flex form");
// const input = document.querySelector(".get input");
// const msg = document.querySelector(".d-flex .msg");
// const list = document.querySelector(".ajax-section .cities");

// const apiKey = "4d8fb5b93d4af21d66a2948710284366";

// form.addEventListener("enviar", e => {
//   e.preventDefault();
//   const listItems = list.querySelectorAll(".ajax-section .city");
//   const inputVal = input.value;

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const { main, name, sys, weather } = data;

//       const li = document.createElement("li");
//       li.classList.add("city");
//       const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    
//       `;
//       li.innerHTML = markup;
//       list.appendChild(li);
//     })
//     .catch(() => {
//       msg.textContent = "Please search for a valid city 😩";
//     });

//   msg.textContent = "";
//   form.reset();
//   input.focus();
// });
