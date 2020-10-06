/*
    Meniny
*/

var meniny = new XMLHttpRequest();
meniny.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText),
            today = new Date(),
            tday = today.getDate(),
            tmonth = today.getMonth() + 1;

        document.getElementById("clocks-meniny").innerHTML = data[tmonth][tday];
    }
};

export function getMeniny(){
    meniny.open("GET", "scripts/meniny.json", true);
    meniny.send();
};