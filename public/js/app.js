// console.log('Nice weather')
// fetch('http://api.weatherstack.com/current?access_key=23cf270ceec711762d56f9d1ac5b5e2f&query=Shanghai').then((response) => {
//         console.log(response)
//         response.json().then((data) => {
//             if (data.error) return console.log(data.error);
//             console.log(data.current);
//         })
//     });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    if (!location.length) return message1.textContent = 'Please provide the location!';
    message1.textContent = 'Loading...';
    fetch(`http://api.weatherstack.com/current?access_key=23cf270ceec711762d56f9d1ac5b5e2f&query=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) return message1.textContent = 'Please provide the valid location!';
            message1.textContent = `city: ${data.location.name}, country: ${data.location.country}`;
            message2.textContent = `temperature: ${data.current.temperature}, wind_speed: ${data.current.wind_speed}`;
        })
    });
})