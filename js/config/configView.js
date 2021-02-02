import { formatTime } from '../util.js';

export class ConfigView {
    constructor(controller) {
        this.controller = controller;
        this.setDiv = document.getElementById('setDiv');
        this.play = document.getElementById('play');
        this.setsValue = document.getElementById('setsValue');
        this.workValue = document.getElementById('workValue');
        this.restValue = document.getElementById('restValue');
        this.timeRest = document.getElementById('timeRest');
        this.workTimeElement = document.getElementById('workTime');
        this.workTime = 0;
    }

    bindControls() {
        this.play.addEventListener('click', (e) => this.controller.initChrono(this));

        this.bindConfigButton(document.getElementById('workLess'), 'click', (e) => {
            this.controller.decreaseWork(this);
        });
        this.bindConfigButton(document.getElementById('setsLess'), 'click', (e) => {
            this.controller.decreaseSets(this);
        });
        this.bindConfigButton(document.getElementById('restLess'), 'click', (e) => {
            this.controller.decreaseRest(this);
        });

        this.bindConfigButton(document.getElementById('workMore'), 'click', (e) => {
            this.controller.incrementWork(this);
        });
        this.bindConfigButton(document.getElementById('setsMore'), 'click', (e) => {
            this.controller.incrementSets(this);
        });
        this.bindConfigButton(document.getElementById('restMore'), 'click', (e) => {
            this.controller.incrementRest(this);
        });

        this.updateWorkTime();
    }

    bindConfigButton(element, eventName, handler) {
        element.addEventListener(eventName, (e) => {
            handler(e);
            this.updateWorkTime();
        });
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

    updateWorkTime() {
        let setsAmount = parseInt(this.setsValue.innerText);
        let actualWorkTime = this.controller.getWorkTime() * setsAmount;
        let restTime = this.controller.getRestTime() * (setsAmount - 1);
        this.workTime = actualWorkTime + restTime;
        this.workTimeElement.innerText = formatTime(this.workTime);
    }
        
    show() {
        document.getElementById("principalDiv").classList.remove('work');
        document.getElementById("principalDiv").classList.remove('rest');
        this.setDiv.classList.remove("hide");
    }

    hide() {
        this.setDiv.classList.add("hide");
    }
}
