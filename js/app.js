import { ConfigModel } from './config/configModel.js';
import { ConfigController } from './config/configController.js';
import { ConfigView } from './config/configView.js';
import { TimerModel } from './timer/timerModel.js';
import { TimerController } from './timer/timerController.js';
import { TimerView } from './timer/timerView.js';
import { ConfigService } from './configService.js';

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
    let configService = new ConfigService();
    let configModel = new ConfigModel();
    let configCtrl = new ConfigController(configModel, configService);
    let configView = new ConfigView(configCtrl);
    configView.bindControls();

    let timerModel = new TimerModel();
    let timerCtrl = new TimerController(timerModel, jukebox, configService);
    let view = new TimerView(timerCtrl);
    view.bindControls();
}

document.addEventListener('DOMContentLoaded', initApp);
