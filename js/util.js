//utility code that does not quite fit anywhere else
export class Jukebox {
    constructor() {
        this.audio = new Audio();
    }

    playSound(srcSound){
        this.audio.src = "./sound/" + srcSound + ".ogg";
        this.audio.play();
    }
}

export function formatTime(time) {
    let seg = time%60;
    if (seg < 10) {
        seg = "0" + seg;
    }
    let min = parseInt(time/60);
    return min+":"+seg;
}
