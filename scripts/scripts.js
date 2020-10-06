import options from './options.js';

import { canvasClocks } from './_canvasclocks.js';
import { digitalClocks } from './_digitalclocks.js';
import { getForecast } from './_weather.js';
import { changeBgImage } from './_bgimage.js';
import { getMeniny } from './_meniny.js';
import { togglePlay } from './_radio.js';

/*
    Battery status
    https://googlechrome.github.io/samples/battery-status/
*/

var levelEl = document.getElementById('battery-level');

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
    console.log('The Battery Status API is not supported on this platform.');
};

/*
    Shutdown PC
*/

var pcCommand = new XMLHttpRequest();
pcCommand.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //ok
    } else {
        //no ok
        console.log('pc asi haja');
    }
};

function sendCommand(command){
    pcCommand.open("GET", command, true);
    pcCommand.send();
};

document.getElementById('shutdownStick').addEventListener('click', function(){
    let cmd = this.dataset.command;
    console.log(cmd);
    sendCommand(cmd);
});

document.getElementById('play-junior').addEventListener('click', function(){
    togglePlay();
});




///////////////////////////////////////////////////////////////

/*
    Init
*/
changeBgImage();
getForecast();
getMeniny();


/*
    Main Timer
*/

var updateScreen = setInterval(() => {

    let time = Math.floor(Date.now() / 1000);

    /* Analog Clocks */
    canvasClocks();
    
    /* Digital Clocks */
    digitalClocks(options.dateOptions, options.timeOptions);;
    
    /* Weather & Forecast */
    if (time % 600 == 0){
        changeBgImage();
        getForecast();
        getMeniny();
    };
    
}, 1000);








