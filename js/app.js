import { ConfigModel } from './config/configModel.js';
import { ConfigController } from './config/configController.js';
import { ConfigView } from './config/configView.js';
import { TimerModel } from './timer/timerModel.js';
import { TimerController } from './timer/timerController.js';
import { TimerView } from './timer/timerView.js';
import { ConfigService } from './configService.js';
import { Jukebox } from './util.js';


class App {
    constructor() {
        this.noSleepVideo = document.getElementById('noSleepVideo');
        let jukebox = new Jukebox();
        let configService = new ConfigService();
        let configModel = new ConfigModel();
        let configCtrl = new ConfigController(this, configModel, configService);
        this.configView = new ConfigView(configCtrl);
        let timerModel = new TimerModel();
        let timerCtrl = new TimerController(this, timerModel, jukebox, configService);
        this.timerView = new TimerView(timerCtrl);
    }

    initListeners() {
        this.configView.bindControls();
        this.timerView.bindControls();
    }

    // This kind of works for now. If I ever had more "pages".
    // It would be worth having a component object that contained the model, controller and view
    // And a common interface that would let me easily switch between them
    startTimer() {
        // this.configView.hide();
        this.noSleepVideo.play();
        this.timerView.initChrono();
    }

    showConfig() {
        this.noSleepVideo.pause();
        this.configView.show();
    }

}


document.addEventListener('DOMContentLoaded', (e) => {
    let app = new App();
    app.initListeners();
});
