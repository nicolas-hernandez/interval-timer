export const timerState = {"rest":1, "work":2}

export class TimerModel {
    constructor(){
        this.timeReset = 3000;
        this.positionNavigator = 0;
        this.state = 1; // 1 -> config, 2 -> chrono
        this.stateChrono = timerState.rest;
        this.workValueInt = 30;
        this.workFinish = 0;
        this.isPaused = false;
        this.timeRestInt = 0;
        this.restValueInt = 15;
        this.sets = 20;
        this.timeReset = 3000;
        this.positionNavigator = 0;
        this.interval = null;
    }

    configState() {
        this.state = 1;
    }

    chronoState() {
        this.state = 2;
    }

    getState() {
        return this.stateChrono; 
    }

}

