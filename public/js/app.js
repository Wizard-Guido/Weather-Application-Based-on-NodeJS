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
    fetch(`http://localhost:3000/weather?search=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) return message1.textContent = 'Please provide a valid location!';
            message1.textContent = `city: ${data.name}, region: ${data.region}, country: ${data.country}`;
            message2.textContent = `Tips: ${data.tips}`;
        })
    });

})