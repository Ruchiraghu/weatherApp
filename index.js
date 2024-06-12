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
  const city = req.body.city;
  const submit = 'submit';
  try {
    const options = {
      method: 'GET',
      url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
      params: { city: city },
      headers: {
        'X-RapidAPI-Key': 'eacf70746amsh50b013c2de57e7fp146034jsn95aaf3b23551',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    if (response.status === 200) {
      const data = {
        temperature: response.data.temp,
        wind: response.data.wind_speed,
        cloud: response.data.cloud_pct,
        feels_like: response.data.feels_like,
        humidity: response.data.humidity,
        sunrise: response.data.sunrise,
        sunset: response.data.sunset,
        min_temp: response.data.min_temp,
        max_temp: response.data.max_temp,
        wind_degrees: response.data.wind_degrees
      };
      function getCurrentDateTime() {
        const now = new Date();
        const time= now.toLocaleTimeString();
        const date= now.toLocaleDateString();
        return{date,time} ;

      }
      const { date, time } = getCurrentDateTime(); 
      const sunriseMilliseconds = data.sunrise * 1000;
      const sunsetMilliseconds = data.sunset * 1000;
      const sunriseDate = new Date(sunriseMilliseconds);
      const sunsetDate = new Date(sunsetMilliseconds);
      const sunriseFormatted = sunriseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const sunsetFormatted = sunsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      res.render("index.ejs", { weatherData: data, city: city, submit: submit, sunsetFormatted: sunsetFormatted, sunriseFormatted: sunriseFormatted,
      currentDate:date,currentTime:time});
    }
    else {
      console.error("API Error - Status Code:", response.status);
      res.status(response.status).send("API Error");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("An error occured while fetching the data");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});




