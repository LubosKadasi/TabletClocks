/*
    Custom weather Icons
*/

w_icons = {
    "01d": "day",   	        //clear sky
    "01n": "night", 	
    "02d": "cloudy-day-1",      //few clouds
    "02n": "cloudy-night-2", 	
    "03d": "cloudy-day-1",      //scattered clouds
    "03n": "cloudy-night-2", 	
    "04d": "cloudy", 	        //broken clouds
    "04n": "cloudy",	
    "09d": "rainy-6",           //shower rain
    "09n": "rainy-6",
    "10d": "rainy-7",	        //rain
    "10n": "rainy-7",	
    "11d": "thunder",           //thunderstorm
    "11n": "thunder",	
    "13d": "snowy-6",	        //snow
    "13n": "snowy-6",	
    "50d": "day", 	            //mist 
    "50n": "night" 	
};


/* 
    Canvas Clocks
    https://www.w3schools.com/graphics/canvas_clock_start.asp
*/

var canvas = document.getElementById("clocks-canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    //grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    //grad.addColorStop(0, '#333');
    //grad.addColorStop(0.5, 'white');
    //grad.addColorStop(1, '#333');
    //ctx.strokeStyle = grad;
    //ctx.lineWidth = radius*0.1;
    //ctx.stroke();
    //ctx.beginPath();
    //ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#fff';
    //ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.fontStyle = "#fff";
    ctx.font = radius*0.15 + "px system";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*1.0);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*1.0);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.06, '#fff');
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.03, '#fff');
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.01, '#fff');
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);
}


/*
    Digital Clocks
*/

function digitalClocks() {
    var today = new Date();
    
    const dateOptions = { weekday: 'long', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    document.getElementById("clocks-digital").innerHTML = `
        <div class="clocks--digital__time">
            ${today.toLocaleTimeString('sk-SK', timeOptions)}
        </div>
        <div class="clocks--digital__date">
            ${today.toLocaleDateString('sk-SK', dateOptions)}
        </div>
    `;

};


/*
    Weatheer widget
*/

var forecast = new XMLHttpRequest();
forecast.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = JSON.parse(this.responseText),
            forecast_content = '',
            _time_sunrise = new Date(data.current.sunrise * 1000);
            _time_sunset = new Date(data.current.sunset * 1000);

        const timeOptions = { hour: '2-digit', minute: '2-digit' };

        document.getElementById("weather").innerHTML = `
            <div class="weather__desc">
                <img class="weather__icon" src="icons/static/${w_icons[data.current.weather[0].icon]}.svg" width="64" height="64" alt="" />
                <span>${data.current.weather[0].description}</span>
            </div>
            <div class="weather__temp">
                ${data.current.temp.toFixed(1)} °C
            </div>
            <div class="weather__sun">
                <span class="weather__sunrise">
                    východ slnka <strong>${_time_sunrise.toLocaleTimeString('sk-SK', timeOptions)}</strong>,
                </span>
                <span class="weather__sunset">
                    západ slnka <strong>${_time_sunset.toLocaleTimeString('sk-SK', timeOptions)}</strong>
                </span>     
            </div>
            <div class="weather__more">
                <span class="weather__wind">
                    <strong>${data.current.wind_speed} m/s</strong>,
                </span>
                <span class="weather__hum">
                    vlhlkosť <strong>${data.current.humidity} %</strong>
                </span>     
            </div>
            `;

        for (i = 0; i < 24; i++){

            var _time = new Date(data.hourly[i].dt * 1000);

            forecast_content += `
                    <div class="forecast__hour">
                        <img class="forecast__icon" src="icons/static/${w_icons[data.hourly[i].weather[0].icon]}.svg" width="50" height="50" alt="" />
                        <div class="forecast__time">${_time.toLocaleTimeString('sk-SK', timeOptions)}</div>
                        <div class="forecast__temp">${data.hourly[i].temp.toFixed(1)} °C</div>
                        <div class="forecast__wind">${data.hourly[i].wind_speed} m/s</div>
                    </div>
                `;

            }

            document.getElementById("forecast").innerHTML = forecast_content;
    } else {
        //document.getElementById('header').innerHTML = this.status + ' ' 
            //+  this.readyState + ' ' 
            //+  this.statusText + ' ' 
            //+  this.responseText + ' ' 
            //+  this.responseURL + ' ';
        //console.log(this);
    }
};

function getForecast(){
    forecast.open("GET", "//api.openweathermap.org/data/2.5/onecall?lat=48.33&lon=17.17&exclude=minutely,daily&appid=b1c74e01998f6dc8db3e4c990f5f6964&units=metric&lang=sk", true);
    forecast.send();

    var updated = new Date();

    const dateOptions = { weekday: 'long', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',};

    document.getElementById('footer').innerHTML = 'aktualizované: ' + updated.toLocaleString('sk-SK', dateOptions);
};


/*
    BG Image change - random Unsplash
    https://source.unsplash.com/
*/

var bgImage = new XMLHttpRequest();
bgImage.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = this.responseURL;

        document.getElementById('bg-image').style.backgroundImage = 'url(' + data + ')';
    }
};

function getBgImage(){
    bgImage.open("GET", "//source.unsplash.com/random/1280x720/?nature,architecture,space,featured", true);
    bgImage.send();
};


/*
    Battery status
    https://googlechrome.github.io/samples/battery-status/
*/

var levelEl = document.getElementById('level');

function updateBatteryUI(battery) {
    levelEl.textContent = (battery.level * 100) + '%';
};

function monitorBattery(battery) {
    // Update the initial UI.
    updateBatteryUI(battery);

    // Monitor for futher updates.
    battery.addEventListener('levelchange',
        updateBatteryUI.bind(null, battery));
};

if ('getBattery' in navigator) {
    navigator.getBattery().then(monitorBattery);
} else {
    console.log('The Battery Status API is not supported on ' +
        'this platform.');
};


///////////////////////////////////////////////////////////////

/*
    Main Timer
*/

var timer_counter = 600;

var updateScreen = setInterval(function(){

    /* Analog Clocks */
    drawFace(ctx, radius);
    //drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    
    /* Digital Clocks */
    digitalClocks();
    
    /* Weather & Forecast*/
    if (timer_counter % 600 == 0){
        getForecast();
        getBgImage();
        timer_counter = 1;
    }
    
    /* Increase counter */
    timer_counter++;

}, 1000);








