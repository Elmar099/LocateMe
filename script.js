const express = require('express');
const app = express();
const Datastore = require('nedb');

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return
        }
        response.json(data);
    })
    
});

app.post('/api', (request, response) => {
    
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});
























/* let data;
const submit = document.querySelector('#submit');
let api_path = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = 'Tokyo';
let apiKey = '&appid=1566f0c5b88f7568fb6326762348543f';
let units = '&units=metric';
const url = api_path + city + apiKey + units;
const lon = document.getElementById('lon')
const lat = document.getElementById('lat')



async function getWeather() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    lon.textContent = data.coord.lon;
    lat.textContent = data.coord.lat;
}
getWeather();

submit.addEventListener('click', () => {
    let city = document.getElementById('city').value;
    console.log(city)
})*/