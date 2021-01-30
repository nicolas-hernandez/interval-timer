import { formatTime } from '../util.js';

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
        document.getElementsByTagName("html")[0].classList.remove('work');
        document.getElementsByClassName("jumbotron")[0].classList.remove('work');
        document.getElementsByTagName("html")[0].classList.add('rest');
        document.getElementsByClassName("jumbotron")[0].classList.add('rest');
    }

    workView() {
        this.textChrono.innerText = "Work";
        document.getElementsByTagName("html")[0].classList.remove('rest');
        document.getElementsByClassName("jumbotron")[0].classList.remove('rest');
        document.getElementsByTagName("html")[0].classList.add('work');
        document.getElementsByClassName("jumbotron")[0].classList.add('work');
    }

    finishView() {
        this.textChrono.innerText = "Finish !!!";
    }

    initChrono() {
        this.chronoDiv.classList.remove("hide");

        this.cycle.innerText = (this.workFinish + 1) + "/" + this.setsValue.innerText;

        this.textChrono.innerText = "Rest";
        document.getElementById('principalDiv').classList.add('rest');
        document.getElementsByTagName("html")[0].classList.add('rest');
        document.getElementsByClassName("jumbotron")[0].classList.add('rest');

        this.controller.configureTimer();
        this.controller.initTimer(this);
    }

    resetChrono() {
        this.controller.pause();

        this.modalReset.classList.remove('hide');

        let okReset = document.getElementById("okReset");
        let closeReset = document.getElementById("closeReset");
        let closeResetFunction;
        okReset.addEventListener("click", () => {
            this.modalReset.classList.add('hide');
            this.hide();
            this.controller.resetTimer();
        });

        closeReset.addEventListener("click", () => {        
            this.controller.resume();
            this.modalReset.classList.add('hide');
        });

    }
        
    pauseChrono() {
        this.controller.pause();
        this.modalPause.classList.remove('hide');
        document.getElementById('closePause').addEventListener('click', () => {                  
            this.controller.resume();
            this.modalPause.classList.add('hide');
        });
    }

    hide() {
        this.chronoDiv.classList.add("hide");
    }

}
