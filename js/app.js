import { TimerModel } from './timerModel.js';
import { TimerController } from './timerController.js';
import { TimerView } from './timerView.js';

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
    view.bindControls();
}

document.addEventListener('DOMContentLoaded', initApp);
