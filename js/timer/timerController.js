import { timerState } from './timerModel.js';
export class TimerController {

    constructor(app, model, jukebox, configService){
        this.app = app;
        this.model = model;
        this.jukebox = jukebox;
        this.config = configService;
    }

    getRestTime() {
        return this.model.restValueInt;
    }

    getWorkTime() {
        return this.model.workValueInt;
    }

    startWork() {
        this.model.stateChrono = timerState.work;
        this.jukebox.playSound('alert');
    }

    pause() {
        this.model.isPaused = true;
    }

    resume() {
        this.model.isPaused = false;
    }

    configureTimer() {
        let configs = this.config.getCurrentConfig();
        this.model.sets = configs.sets;
        this.model.restTime = configs.restTime;
        this.model.workTime = configs.workTime;
    }

    initTimer(view) {
        this.configureTimer();
        this.model.positionNavigator = 0;

        let restTime = 5; //this.restValue.innerText;
        this.model.timeRestInt = restTime;
        view.updateRestTime(this.model.timeRestInt);
        view.updateCycle(0, this.model.sets);
        this.model.isPaused = false;


        this.interval = setInterval( () => {
            this.timerTick(view);
        }, 1000);
    }

    finishTimer(view) {
        clearInterval(this.interval);
        view.finishView();
        this.jukebox.playSound('gong');
        this.model.workFinish = 0;
        setTimeout(function () {
            view.showConfig();
        }, this.model.timeReset);
    }

    timerTick(view) {
        let seconds = this.model.timeRestInt;
        if (!this.model.isPaused) {
            if (seconds === 0) {
                if (this.model.getState() === timerState.rest) {              
                    view.workView();
                    this.startWork();
                    seconds = this.model.workValueInt;
                } else {
                    seconds = this.model.restValueInt;
                    this.model.stateChrono = 1;
                    this.model.workFinish += 1;                              
                    view.restView();
                    if (this.model.workFinish >= this.model.sets){
                        this.finishTimer(view);
                    } else {
                        view.updateCycle(this.model.workFinish, this.model.sets);
                        this.jukebox.playSound('gong2');
                    }
                }
            } else {
                seconds -=1;
            }
            this.model.timeRestInt = seconds;
            view.updateRestTime(this.model.timeRestInt);
            if (seconds === 3) { 
                this.jukebox.playSound('end');
            }
        }
    }

    resetTimer() {
        clearInterval(this.interval);
        this.model.stateChrono = timerState.rest;
        this.model.workFinish = 0;
        this.app.showConfig()
    }
}
