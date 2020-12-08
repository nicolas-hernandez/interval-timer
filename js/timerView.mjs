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
        this.play.addEventListener('click', (e) => this.initChrono());
        this.reset.addEventListener('click', (e) => this.resetChrono());
        this.pause.addEventListener('click', (e) => this.pauseChrono());

        let classnameLess = document.getElementsByClassName('lessBtn');
        for (var li = 0; li < classnameLess.length; li++) {
            classnameLess[li].addEventListener('click', this.lessValue);    
            classnameLess[li].addEventListener('mousedown', this.lessValueCont);
            classnameLess[li].addEventListener('touchstart', this.lessValueCont);
            classnameLess[li].addEventListener('mouseup', this.contEnd);
            classnameLess[li].addEventListener('touchend', this.contEnd);            
        }

        let classnameMore = document.getElementsByClassName('moreBtn');
        for (var i = 0; i < classnameMore.length; i++) {
            // classnameMore[i].addEventListener('click', this.moreValue);
            this.bindConfigButton(classnameMore[i], 'click', this.controller);
            classnameMore[i].addEventListener('mousedown', this.moreValueCont);
            classnameMore[i].addEventListener('touchstart', this.moreValueCont);
            classnameMore[i].addEventListener('mouseup', this.contEnd);
            classnameMore[i].addEventListener('touchend', this.contEnd);
        }

        this.updateWorkTime();
    }

    bindConfigButton(element, eventName, handler) {
        element.addEventListener(eventName, (e) => {
            handler(e);
            this.updateWorkTime();
        });
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

    lessValue(type) {
        if (typeof type === "object"){
            type = type.target.getAttribute('data-type');
        }
        switch(type) {
            case 'sets':
                this.setsValue.innerText = parseInt(this.setsValue.innerText) - 1;
                if (parseInt(this.setsValue.innerText) < 1) {
                    this.setsValue.innerText = 1;
                }
                  break;
              case 'work':
                if (parseInt(this.workValueInt) < 60) {
                    this.workValueInt = parseInt(this.workValueInt) - 5;
                } else if (parseInt(this.workValueInt) < 120) {
                    this.workValueInt = parseInt(this.workValueInt) - 10;
                } else if (parseInt(this.workValueInt) < 180) {
                    this.workValueInt = parseInt(this.workValueInt) - 15;
                } else if (parseInt(this.workValueInt) <= 300) {
                    this.workValueInt = parseInt(this.workValueInt) - 30;
                }
                if (parseInt(this.workValueInt) < 5) {
                    this.workValueInt = 5;
                }
                this.workValue.innerText = formatTime(this.workValueInt);
                  break;
            case 'rest':
                if (parseInt(this.restValueInt) < 60) {
                    this.restValueInt = parseInt(this.restValueInt) - 5;                    
                } else if (parseInt(this.restValueInt) <= 120) {
                    this.restValueInt = parseInt(this.restValueInt) - 10;
                }
                if (parseInt(this.restValueInt) < 5) {
                    this.restValueInt = 3;
                }
                this.restValue.innerText = formatTime(this.restValueInt);
                  break;
        }
        this.updateWorkTime();
    }

    lessValueCont(type) {
        if (typeof type === "object") {
            type = type.target.getAttribute('data-type');
        }
        this.intervalButton = setInterval( function() {
            switch(type) {
                case 'sets':
                    this.setsValue.innerText = parseInt(this.setsValue.innerText) - 1;
                    if (parseInt(this.setsValue.innerText) < 1) {
                        this.setsValue.innerText = 1;
                    }
                      break;
                  case 'work':
                    if (parseInt(this.workValueInt) < 60) {
                        this.workValueInt = parseInt(this.workValueInt) - 5;
                    } else if (parseInt(this.workValueInt) < 120) {
                        this.workValueInt = parseInt(this.workValueInt) - 10;
                    } else if (parseInt(this.workValueInt) < 180) {
                        this.workValueInt = parseInt(this.workValueInt) - 15;
                    } else if (parseInt(this.workValueInt) <= 300) {
                        this.workValueInt = parseInt(this.workValueInt) - 30;
                    }
                    if (parseInt(this.workValueInt) < 5) {
                        this.workValueInt = 3;
                    }
                    this.workValue.innerText = formatTime(this.workValueInt);
                      break;
                case 'rest':
                    if (parseInt(this.restValueInt) < 60) {
                        this.restValueInt = parseInt(this.restValueInt) - 5;                    
                    } else if (parseInt(this.restValueInt) <= 120) {
                        this.restValueInt = parseInt(this.restValueInt) - 10;
                    }
                    if (parseInt(this.restValueInt) < 5) {
                        this.restValueInt = 5;
                    }
                    this.restValue.innerText = formatTime(this.restValueInt);
                      break;
            }
            this.updateWorkTime();
        }, 250);
    }
    
    contEnd() {
        for (var i = 0; i <= this.intervalButton; i ++) {
            clearInterval(i);
        }
    }

    moreValue(type) {
        if (typeof type === "object"){
            type = type.target.getAttribute('data-type');
        }
        switch(type) {
            case 'sets':
                if (parseInt(this.setsValue.innerText) < 30) {
                    this.setsValue.innerText = parseInt(this.setsValue.innerText) + 1;
                    if (parseInt(this.setsValue.innerText) < 1) {
                        this.setsValue.innerText = 1;
                    }
                }
                  break;
              case 'work':
                if (parseInt(this.workValueInt) < 300) {
                    if (parseInt(this.workValueInt) < 60) {
                        this.workValueInt = parseInt(this.workValueInt) + 5;
                    } else if (parseInt(this.workValueInt) < 120) {
                        this.workValueInt = parseInt(this.workValueInt) + 10;
                    } else if (parseInt(this.workValueInt) < 180) {
                        this.workValueInt = parseInt(this.workValueInt) + 15;
                    } else if (parseInt(this.workValueInt) < 300) {
                        this.workValueInt = parseInt(this.workValueInt) + 30;
                    }
                    if (parseInt(this.workValueInt) < 5) {
                        this.workValueInt = 5;
                    }
                    this.workValue.innerText = formatTime(this.workValueInt);
                }
                break;
            case 'rest':
                if (parseInt(this.restValueInt) < 120) {
                    if (parseInt(this.restValueInt) < 60) {
                        if (parseInt(this.restValueInt) < 5) {
                            this.restValueInt = 5;
                        } else {
                            this.restValueInt = parseInt(this.restValueInt) + 5;
                        }
                    } else if (parseInt(this.restValueInt) < 120) {
                        this.restValueInt = parseInt(this.restValueInt) + 10;
                    }
                    if (parseInt(this.restValueInt) < 5) {
                        this.restValueInt = 3;
                    }
                }
                this.restValue.innerText = formatTime(this.restValueInt);
                break;
        }        
        this.updateWorkTime();
    }

    moreValueCont(type) {        
        if (typeof type === "object"){
            type = type.target.getAttribute('data-type');
        }
        this.intervalButton = setInterval( function() {
            switch(type) {
                case 'sets':
                    if (parseInt(this.setsValue.innerText) < 30) {
                        this.setsValue.innerText = parseInt(this.setsValue.innerText) + 1;
                        if (parseInt(this.setsValue.innerText) < 1) {
                            this.setsValue.innerText = 1;
                        }
                    }
                        break;
                case 'work':
                    if (parseInt(this.workValue.innerText) < 300) {
                        if (parseInt(this.workValueInt) < 60) {
                            this.workValueInt = parseInt(this.workValueInt) + 5;
                        } else if (parseInt(this.workValueInt) < 120) {
                            this.workValueInt = parseInt(this.workValueInt) + 10;
                        } else if (parseInt(this.workValueInt) < 180) {
                            this.workValueInt = parseInt(this.workValueInt) + 15;
                        } else if (parseInt(this.workValueInt) < 300) {
                            this.workValueInt = parseInt(this.workValueInt) + 30;
                        }
                        if (parseInt(this.workValueInt) < 5) {
                            this.workValueInt = 3;
                        }
                        this.workValue.innerText = formatTime(this.workValueInt);
                    }
                    break;
                case 'rest':
                    if (parseInt(this.restValueInt) < 120) {
                        if (parseInt(this.restValueInt) < 60) {
                            if (parseInt(this.restValueInt) < 5) {
                                this.restValueInt = 5;
                            } else {
                                this.restValueInt = parseInt(this.restValueInt) + 5;
                            }
                        } else if (parseInt(this.restValueInt) < 120) {
                            this.restValueInt = parseInt(this.restValueInt) + 10;
                        }
                        if (parseInt(this.restValueInt) < 5) {
                            this.restValueInt = 5;
                        }
                    }
                    this.restValue.innerText = formatTime(this.restValueInt);
                    break;
            }            
            this.updateWorkTime();
        }, 250);
    }
}
