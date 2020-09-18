
const searchEl = document.querySelector('input');
const weather1 = document.querySelector('#weather1');
const weather2 = document.querySelector('#weather2');

init = () => {
    weather1.textContent = 'loading...';
    weather2.textContent = '';
}
getWeatherDetails = (address) => {
    fetch(`http://localhost:4200/weather?address=${address}`).then(response => {
    //console.log(response.body)// will be in buffer
        response.json().then(data => {
            if(data.error) {
                weather1.textContent = data.error
                weather2.textContent = ""
            }else {
                weather1.textContent = data.location;
                weather2.textContent = data.forecast
            }
        });
    })
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    init();
    getWeatherDetails(searchEl.value);
});