import express from "express";
import axios from "axios";
import bodyParser from "body-parser";



const app = express();
const port = 8000;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render("header.ejs");
})
  ;

app.post("/weather", async (req, res) => {
  const { city } = req.body;
  const apiKey = 'bb4b9d2ed2c1438b917162936231509'; // Replace with your actual WeatherAPI API key

  try {
    // Fetch current weather
    const currentWeatherResponse = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: { key: apiKey, q: city }
    });
    const currentWeatherData = currentWeatherResponse.data;

    // Fetch 7-day forecast
    const forecastResponse = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
      params: { key: apiKey, q: city, days: 7 }
    });
    const forecastData = forecastResponse.data;

    // Fetch astronomy data for the current date
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const astronomyResponse = await axios.get('http://api.weatherapi.com/v1/astronomy.json', {
      params: { key: apiKey, q: city, dt: currentDate }
    });
    const astronomyData = astronomyResponse.data;
    console.log("Current Weather Data:", currentWeatherData);
    console.log("Forecast Data:", forecastData);
    console.log("Astronomy Data:", astronomyData);
      const weatherData = {
        temperature: currentWeatherData.current.temp_c,
        wind: currentWeatherData.current.wind_kph,
        cloud: currentWeatherData.current.cloud,
        feels_like: currentWeatherData.current.feelslike_c,
        humidity: currentWeatherData.current.humidity,
        sunrise: astronomyData.astronomy.astro.sunrise,
        sunset: astronomyData.astronomy.astro.sunset,
        min_temp: forecastData.forecast.forecastday[0].day.mintemp_c,
        max_temp: forecastData.forecast.forecastday[0].day.maxtemp_c,
        wind_degree: currentWeatherData.current.wind_degree
      };
      function getCurrentDateTime() {
        const now = new Date();
        const time= now.toLocaleTimeString();
        const date= now.toLocaleDateString();
        return{date,time} ;

      }


      const { date, time } = getCurrentDateTime();

      // console.log("Sunrise Time:", weatherData.sunrise);
      // console.log("Sunset Time:", weatherData.sunset);
      // console.log("Wind degree: ",weatherData.wind_degree)
  
      res.render("index.ejs", {
        weatherData: weatherData,
        city: city,
        currentDate: date,
        currentTime: time
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("An error occurred while fetching the data");
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


