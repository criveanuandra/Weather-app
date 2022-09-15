class User {
  constructor(id, name, email, phone, username)
  {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.username = username;
  }
}

fetch(`https://jsonplaceholder.typicode.com/users`, {
  method: 'GET'
})
  .then(response => response.json())
  .then(function (data) {
    data = data[0];
    const user = new User(data.id, data.name, data.email, data.phone, data.username);
    //console.log(user);
  })
  .catch(function (error) {
    console.log(error);
  });

// --------------------------------------------------------------------

const kelvinToCelsius = (degrees) => {
  const celsius = degrees - 273.15;
  return celsius.toFixed(1);
}

const onSearch = () => {
  const key = 'f99d58375e72be620301be78257364f3';
  const cityNameInput = document.getElementById("city-name");
  let cityName = cityNameInput.value ? cityNameInput.value : 'Cluj';
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(function (city) {
      document.getElementById("temperature").innerHTML = `${kelvinToCelsius(city.main.temp)} °C`;
      document.getElementById("city").innerHTML = `${city.name}, ${city.sys.country}`;
      const weatherIcon = document.getElementById("weather-icon");
      weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`)
      document.getElementById("weather-description").innerHTML = city.weather[0].description;
      
      document.getElementById("humidity-value").innerHTML = `${city.main.humidity}%`;
      document.getElementById("wind-value").innerHTML = `${city.wind.speed}mps`;
      document.getElementById("air-pressure-value").innerHTML = city.main.pressure;
      console.log(city);
    })
    .catch(function (error) {
      console.log(error);
    });
}

onSearch();

