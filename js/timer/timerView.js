import { formatTime } from '../util.js';

const CSS_WORK = 'is-danger';
const CSS_REST = 'is-info';


export class TimerView {
    constructor(controller) {
        this.controller = controller;
        this.pause = document.getElementById('pause');
        this.reset = document.getElementById('reset');
        this.chronoDiv = document.getElementById('chronoDiv');
        this.setsValue = document.getElementById('setsValue');
        this.workValue = document.getElementById('workValue');
        this.restValue = document.getElementById('restValue');
        this.cycle = document.getElementById('cycle');
        this.timeRest = document.getElementById('timeRest');
        this.textChrono = document.getElementById('textChrono');
        this.modalPause = document.getElementById('modalPause');
        this.modalReset = document.getElementById('modalReset');
        this.workTimeElement = document.getElementById('workTime');
        this.workTime = 0;
    }

    bindControls() {
        this.reset.addEventListener('click', (e) => this.resetChrono());
        this.pause.addEventListener('click', (e) => this.pauseChrono());

        this.updateWorkTime();
    }

    updateWorkValue(workTime) {
        this.workValue.innerText = formatTime(workTime);
    }

    updateSetsValue(sets) {
        this.setsValue.innerText = sets;
    }

    updateRestValue(restTime) {
        this.restValue.innerText = formatTime(restTime);
    }

    updateRestTime(time) {
        this.timeRest.innerText = formatTime(time);
    }

    updateCycle(finishedSets, totalSets) {
        this.cycle.innerText = (finishedSets + 1) + "/" + totalSets;
    }

    updateWorkTime() {
        let setsAmount = parseInt(this.setsValue.innerText);
        let actualWorkTime = this.controller.getWorkTime() * setsAmount;
        let restTime = this.controller.getRestTime() * (setsAmount - 1);
        this.workTime = actualWorkTime + restTime;
        this.workTimeElement.innerText = formatTime(this.workTime);
    }

    restView() {
        this.textChrono.innerText = "Rest";
        //TODO move this over to the app
        document.getElementById('principalDiv').classList.remove(CSS_WORK);
        document.getElementById('principalDiv').classList.add(CSS_REST);
    }

    workView() {
        this.textChrono.innerText = "Work";
        //TODO move this over to the app
        document.getElementById('principalDiv').classList.remove(CSS_REST);
        document.getElementById('principalDiv').classList.add(CSS_WORK);
    }

    finishView() {
        this.textChrono.innerText = "Finish !!!";
    }

    initChrono() {
        this.chronoDiv.classList.remove("hide");

        this.cycle.innerText = (this.workFinish + 1) + "/" + this.setsValue.innerText;

        this.restView();

        this.controller.configureTimer();
        this.controller.initTimer(this);
    }

    resetChrono() {
        this.controller.pause();

        this.modalReset.classList.add('is-active');

        let okReset = document.getElementById("okReset");
        let closeReset = document.getElementById("closeReset");
        let closeResetFunction;
        okReset.addEventListener("click", () => {
            this.modalReset.classList.remove('is-active');
            this.hide();
            this.controller.resetTimer();
        });

        closeReset.addEventListener("click", () => {        
            this.controller.resume();
            this.modalReset.classList.remove('is-active');
        });

    }
        
    pauseChrono() {
        this.controller.pause();
        this.modalPause.classList.add('is-active');
        document.getElementById('closePause').addEventListener('click', () => {                  
            this.controller.resume();
            this.modalPause.classList.remove('is-active');
        });
    }

    

    hide() {
        document.getElementById('principalDiv').classList.remove(CSS_REST);
        document.getElementById('principalDiv').classList.remove(CSS_WORK);
        this.chronoDiv.classList.add("hide");
    }

}
