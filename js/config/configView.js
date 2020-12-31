function formatTime(time) {
    let seg = time%60;
    if (seg < 10) {
        seg = "0" + seg;
    }
    let min = parseInt(time/60);
    return min+":"+seg;
}

export class ConfigView {
    constructor(controller) {
        this.controller = controller;
        this.play = document.getElementById('play');
        this.setsValue = document.getElementById('setsValue');
        this.workValue = document.getElementById('workValue');
        this.restValue = document.getElementById('restValue');
        this.timeRest = document.getElementById('timeRest');
        this.workTimeElement = document.getElementById('workTime');
        this.workTime = 0;
    }

    bindControls() {
        this.play.addEventListener('click', (e) => this.initChrono());

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

}
