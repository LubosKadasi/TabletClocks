/*
    Digital Clocks
*/

export function digitalClocks(dateOptions, timeOptions) {
    var today = new Date();
        
    document.getElementById("clocks-digital").innerHTML = `
        <div class="clocks--digital__time">
            ${today.toLocaleTimeString('sk-SK', timeOptions)}
        </div>
        <div class="clocks--digital__date">
            ${today.toLocaleDateString('sk-SK', dateOptions)}
        </div>
    `;

};