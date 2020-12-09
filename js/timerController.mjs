export class TimerController {
    constructor(model, jukebox){
        this.model = model
        this.jukebox = jukebox
    }

    /*
    handleEvent(e) {
        e.stopPropagation();
        switch(e.type){
            case "click":
                this.clickHandler(e.target);
                break;
            default:
                console.log(e.target);
        }
    }

    clickHandler(target) {
        console.log(target);
    }
    */

    getRestTime() {
        return this.model.restValueInt;
    }

    getWorkTime() {
        return this.model.workValueInt;
    }

    config() {
        this.model.state = 1;
        this.model.positionNavigator = 0;
        this.model.workFinish = 0;
    }

    startWork() {
        this.model.stateChrono = 2;
        this.jukebox.playSound('alert');
    }

    pause() {
        this.model.isPaused = true;
    }

    resume() {
        this.model.isPaused = false;
    }

    configureTimer(sets, restTime, workTime) {
        this.model.sets = sets;
        this.model.restTime = restTime;
        this.model.workTime = workTime;
    }

    initTimer(view) {
        this.model.state = 2;
        this.model.positionNavigator = 0;

        let restTime = 5; //this.restValue.innerText;
        this.model.timeRestInt = restTime;
        view.updateRestTime(this.model.timeRestInt);
        view.updateCycle(0, this.model.sets);


        this.interval = setInterval( () => {
            this.timerTick(view);
        }, 1000);
    }

    timerTick(view) {
        let restTime = this.model.timeRestInt;
        if (!this.model.isPaused) {
            if (restTime === 0) {
                if (this.model.stateChrono === 1) {              
                    view.workView();
                    this.startWork();
                    restTime = this.model.workValueInt;
                } else {
                    restTime = this.model.restValueInt;
                    this.model.stateChrono = 1;
                    this.model.workFinish += 1;                              
                    view.restView();
                    if (this.workFinish >= this.model.sets){
                        clearInterval(this.interval);
                        view.finishView();
                        this.jukebox.playSound('gong');
                        restTime = 0;
                        setTimeout(function () {
                            view.showConfig();
                        }, this.model.timeReset);
                    } else {
                        view.updateCycle(this.model.workFinish, this.model.sets);
                        this.jukebox.playSound('gong2');
                    }
                }
            } else {
                restTime -=1;
            }
            this.model.timeRestInt = restTime;
            view.updateRestTime(this.model.timeRestInt);
            if (restTime === 3) { 
                this.jukebox.playSound('end');
            }
          }
    }

    resetTimer() {
        clearInterval(this.interval);
        this.model.stateChrono = 1;
        this.model.workFinish = 0;
    }

    // TODO: fix the if logic in these functions
    incrementSets(view) {
        let currentSets = this.model.sets;
        if (currentSets < 30) {
            if (parseInt(this.model.sets) < 1) {
                currentSets = 1;
            }
            currentSets = currentSets + 1;
        }
        this.model.sets = currentSets;
        view.updateSetsValue(this.model.sets);
    }

    incrementWork(view) {
        let workValue = this.model.workValueInt;
        if (workValue < 300) {
            if (workValue < 60) {
                this.model.workValueInt = workValue + 5;
            } else if (workValue < 120) {
                this.model.workValueInt = workValue + 10;
            } else if (workValue < 180) {
                this.model.workValueInt = workValue + 15;
            } else if (workValue < 300) {
                this.model.workValueInt = workValue + 30;
            }
            if (workValue < 5) {
                this.model.workValueInt = 5;
            }
            view.updateWorkValue(this.model.workValueInt);
        }
    }

    incrementRest(view) {
        let currentRestTime = this.model.restValueInt;
        if (currentRestTime < 120) {
            if (currentRestTime < 60) {
                if (currentRestTime < 5) {
                    this.model.restValueInt = 5;
                } else {
                    this.model.restValueInt = currentRestTime + 5;
                }
            } else if (currentRestTime < 120) {
                this.model.restValueInt = currentRestTime + 10;
            }
            if (currentRestTime < 5) {
                this.model.restValueInt = 3;
            }
        }
        view.updateRestValue(this.model.restValueInt);
    }

            // type = type.target.getAttribute('data-type');
}
