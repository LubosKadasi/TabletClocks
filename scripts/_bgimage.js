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

export function changeBgImage(){
    bgImage.open("GET", "//source.unsplash.com/random/1280x720/?nature,featured", true);
    bgImage.send();
};