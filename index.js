const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.79&longitude=-77.86&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&current_weather=true&timezone=EST";
const time= document.getElementById('time');
const temp = document.querySelector('#temp p');
const wind = document.querySelector('#wind p');
const description = document.getElementById('description');
document.addEventListener('DOMContentLoaded', async () =>
{
    const data = await getWeatherData();
    modifyPage(data);
})
async function getWeatherData()
{
    try
    {
        const results = await fetch(weatherUrl);
        console.log(results);

        if(results.ok === false)
        {
            throw new Error(results.statusText);
        }

        const data = await results.json();
        console.log(data);
        return data;
    }
    catch(err)
    {
        console.error(err);
        throw new Error(err.message);
    }
}

function modifyPage(data)
{
    time.textContent = `Current Time: ${new Date(data.current_weather.time).toLocaleTimeString()}`;
    temp.textContent = `Temperature: ${data.current_weather.temperature}${data.current_weather_units.temperature}`;
    wind.textContent = `Wind Speed: ${data.current_weather.windspeed} ${data.current_weather_units.windspeed}`;
    description.textContent = `Description: ${getDescriptionFromWeatherCode(data.current_weather.weathercode)}`;
}
function getDescriptionFromWeatherCode(code)
{
    let codes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95];
    let descriptions =
    [
        "Clear Sky",
        "Mainly Clear",
        "Partly Cloudy",
        "Overcast",
        "Fog",
        "Depositing Rime Fog",
        "Light Drizzle",
        "Moderate Drizzle",
        "Intense Drizzle",
        "Light Freezing Drizzle",
        "Dense Freezing Drizzle",
        "Slight Rain",
        "Moderate Rain",
        "Heavy Rain",
        "Light Freezing Rain",
        "Heavy Freezing Rain",
        "Light Snowfall",
        "Moderate Snowfall",
        "Heavy Snowfall",
        "Snow Grains",
        "Light Rain Showers",
        "Moderate Rain Showers",
        "Violent Rain Showers",
        "Light Snow Showers",
        "Heavy Snow Showers",
        "Thunderstorm"
    ]
    let map = new Map();
    for(let i = 0; i < codes.length - 1; i++)
    {
        map.set(codes[i], descriptions[i]);
    }
    return map.get(code);
}

function binarySearch(arr, match)
{
    let left = 0;
    let right = arr.length - 1;

    while(right >= left)
    {
        let mid = left + (right - left) / 2;
        if(arr[mid] === match)
        {
            return mid
        }
        else if(arr[mid] > match)
        {
            right = mid - 1;
        }
        else if(arr[mid] < match)
        {
            left = mid + 1;
        }
    }

    return -1;
}