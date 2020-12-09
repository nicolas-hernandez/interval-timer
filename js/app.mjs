import { TimerModel } from './timerModel.mjs';
import { TimerController } from './timerController.mjs';
import { TimerView } from './timerView.mjs';

class Jukebox {
    constructor() {
        this.audio = new Audio();
    }

    playSound(srcSound){
        this.audio.src = "./sound/" + srcSound + ".ogg";
        this.audio.play();
    }
}


function initApp() {
    let jukebox = new Jukebox();
    let model = new TimerModel();
    let controller = new TimerController(model, jukebox);
    let view = new TimerView(controller);
}

document.addEventListener('DOMContentLoaded', initApp);
