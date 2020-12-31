function formatTime(time) {
    let seg = time%60;
    if (seg < 10) {
        seg = "0" + seg;
    }
    let min = parseInt(time/60);
    return min+":"+seg;
}

export class TimerView {
    constructor(controller) {
        this.controller = controller;
        this.play = document.getElementById('play');
        this.pause = document.getElementById('pause');
        this.reset = document.getElementById('reset');
        this.setDiv = document.getElementById('setDiv');
        this.chronoDiv = document.getElementById('chronoDiv');
        this.setsValue = document.getElementById('setsValue');
        this.workValue = document.getElementById('workValue');
        this.restValue = document.getElementById('restValue');
        this.cycle = document.getElementById('cycle');
        this.timeRest = document.getElementById('timeRest');
        this.textChrono = document.getElementById('textChrono');
        this.modalPause = document.getElementById('modalPause');
        this.modalReset = document.getElementById('modalReset');
        this.noSleepVideo = document.getElementById('noSleepVideo');
        this.workTimeElement = document.getElementById('workTime');
        this.workTime = 0;
        this.noSleepVideo.pause();
    }

    bindControls() {
        this.play.addEventListener('click', (e) => this.initChrono());
        this.reset.addEventListener('click', (e) => this.resetChrono());
        this.pause.addEventListener('click', (e) => this.pauseChrono());

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
        this.noSleepVideo.play();
        this.setDiv.classList.add("hide");
        this.chronoDiv.classList.remove("hide");

        this.cycle.innerText = (this.workFinish + 1) + "/" + this.setsValue.innerText;

        this.textChrono.innerText = "Rest";
        document.getElementById('principalDiv').classList.add('rest');
        document.getElementsByTagName("html")[0].classList.add('rest');
        document.getElementsByClassName("jumbotron")[0].classList.add('rest');

        this.controller.configureTimer(
            parseInt(this.setsValue.innerText),
            this.restValueInt,
            this.workValueInt
        );
        this.controller.initTimer(this);
    }

    resetChrono() {
        this.controller.pause();

        this.modalReset.classList.remove('hide');

        let okReset = document.getElementById("okReset");
        let closeReset = document.getElementById("closeReset");
        let closeResetFunction;
        okReset.addEventListener("click", () => {
            this.isPaused = false;
            this.modalReset.classList.add('hide');
            // okReset.removeEventListener("click", okResetFunction);
            // closeReset.removeEventListener("click", closeResetFunction);
            this.controller.resetTimer();
            this.showConfig();
        });

        closeReset.addEventListener("click", () => {        
            this.isPaused = false;
            this.modalReset.classList.add('hide');
            // okReset.removeEventListener("click", okResetFunction);
            // closeReset.removeEventListener("click", closeResetFunction);
        });

    }
        
    showConfig() {
        this.noSleepVideo.pause();
        document.getElementsByTagName("html")[0].classList.remove('work');
        document.getElementsByClassName("jumbotron")[0].classList.remove('work');
        document.getElementsByTagName("html")[0].classList.remove('rest');
        document.getElementsByClassName("jumbotron")[0].classList.remove('rest');
        this.setDiv.classList.remove("hide");
        this.chronoDiv.classList.add("hide");
    }

    pauseChrono() {
        this.controller.pause();
        this.isPaused = true;
        this.modalPause.classList.remove('hide');
        document.getElementById('closePause').addEventListener('click', () => {                  
            this.controller.resume();
            this.isPaused = false;
            this.modalPause.classList.add('hide');
            document.getElementById('closePause').removeEventListener('click', ()=> {});
        });
    }

}
