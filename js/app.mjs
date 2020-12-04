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
    var jukebox = new Jukebox();
    var model = new TimerModel();
    var controller = new TimerController(model, jukebox);
    var view = new TimerView(controller);
}

document.addEventListener('DOMContentLoaded', initApp);
