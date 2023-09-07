const apiKey = "601f5e8a51319458b9380dd326a61fc6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//funcões assincronas esperam a conclusão de alguma operação para realizar suas instruções
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else{
        // const response = await fetch(apiUrl + city + `&appid= `+ apiKey);
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        if(data.weather[0].main == "Clouds") weatherIcon.src = "images/clouds.png";
        if(data.weather[0].main == "Clear") weatherIcon.src = "images/clear.png";
        if(data.weather[0].main == "Drizzle") weatherIcon.src = "images/drizzle.png";
        if(data.weather[0].main == "Rain") weatherIcon.src = "images/rain.png";
        if(data.weather[0].main == "Mist") weatherIcon.src = "images/mist.png";
        if(data.weather[0].main == "Snow") weatherIcon.src = "images/snow.png";

        document.querySelector(".weather").style.display = "block";
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

