var player = document.getElementsByTagName('audio')[0];
var isPlaying = false;

export function togglePlay() {
    //return player.paused ? player.play() : player.pause();
    player.classList
    if (player.paused) {
        player.play();
        player.classList.add('playing');
    } else{
        player.pause();
        player.classList.remove('playing');
    }
}