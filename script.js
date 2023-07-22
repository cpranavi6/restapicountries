async function fetchRestCountriesData() {
  try {
    const response = await fetch('https://restcountries.com/v2/all');
    const countriesData = await response.json();
    return countriesData;
  } catch (error) {
    console.error('Error fetching Rest countries data:', error);
    return null;
  }
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(country) {
  const apiKey = 'https://home.openweathermap.org/api_keys';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Function to create and display Bootstrap cards
function displayCountryCards(countries) {
  const countryCardsDiv = document.getElementById('countryCards');

  countries.forEach(async (country) => {
    const weatherData = await fetchWeatherData(country);

    // Create Bootstrap card (column)
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-sm-12');

    // Card wrapper (card class)
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card');

    // Card header
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = country.name;

    // Card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Country flag
    const flagImage = document.createElement('img');
    flagImage.classList.add('card-img-top');
    flagImage.src = country.flags.svg;
    flagImage.alt = `${country.name} flag`;

    // Card text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.innerHTML = `
      Capital: ${country.capital}<br>
      Region: ${country.region}<br>
      Country Codes: ${country.alpha2Code}, ${country.alpha3Code}<br>
    `;

    // Weather data
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      cardText.innerHTML += `
        Temperature: ${weatherData.main.temp}°C<br>
        Weather: ${weatherData.weather[0].description}<br>
      `;
    } else {
      cardText.innerHTML += 'Weather data not available.<br>';
    }

    // Button
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Click for Weather';

    // Append elements to the card body
    cardBody.appendChild(flagImage);
    cardBody.appendChild(cardText);
    cardBody.appendChild(button);

    // Append elements to the card wrapper
    cardWrapper.appendChild(cardHeader);
    cardWrapper.appendChild(cardBody);

    // Append card wrapper to the card column
    card.appendChild(cardWrapper);

    // Append the card column to the country cards div
    countryCardsDiv.appendChild(card);
  });
}

// Main function to load data and display cards
async function loadCountriesData() {
  const countriesData = await fetchRestCountriesData();
  if (countriesData) {
    displayCountryCards(countriesData);
  }
}

// Call the main function to load data and display cards
loadCountriesData();