const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    if (!location.length) return message1.textContent = 'Please provide the location!';
    message1.textContent = 'Loading...';
    message2.textContent = '';
    // fetch(`/weather?search=${location}`).then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) return message1.textContent = 'Please provide the valid location!';
    //         message1.textContent = `city: ${data.city}, country: ${data.country}`;
    //         message2.textContent = `Tips: ${data.tips}`;
    //     })
    // });
    fetch(`http://api.weatherstack.com/current?access_key=23cf270ceec711762d56f9d1ac5b5e2f&query=${location}`, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'}}).then((response) => {
        response.json().then((data) => {
            if (data.error) return message1.textContent = 'Please provide the valid location!';
            message1.textContent = `city: ${data.location.city}, country: ${data.location.country}`;
            message2.textContent = `Temperature: ${data.current.temperature}, Wind Speed: ${data.current.wind_speed}`;
        })
    });
})