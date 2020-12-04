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

        this.noSleepVideo.pause();
        this.play.addEventListener('click', this.controller);
        this.reset.addEventListener('click', this.controller);
        this.pause.addEventListener('click', this.controller);

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
            classnameMore[i].addEventListener('click', this.moreValue);
            classnameMore[i].addEventListener('mousedown', this.moreValueCont);
            classnameMore[i].addEventListener('touchstart', this.moreValueCont);
            classnameMore[i].addEventListener('mouseup', this.contEnd);
            classnameMore[i].addEventListener('touchend', this.contEnd);
        }

        this.updateWorkTime();
    }


    initChrono() {
        this.noSleepVideo.play();
        this.setDiv.classList.add("hide");
        this.chronoDiv.classList.remove("hide");
        this.state = 2;
        this.positionNavigator = 0;
        /* TODO refactorizar */
        this.cycle.innerText = (this.workFinish + 1) + "/" + this.setsValue.innerText;
        //this.timeRest.innerText =  10; // this.restValue.innerText;
        document.getElementById('principalDiv').classList.add('rest');

        //init clock        
        this.textChrono.innerText = "Rest"; /* TODO refactorizar */
        /* TODO refactorizar */
        document.getElementsByTagName("html")[0].classList.add('rest');
        document.getElementsByClassName("jumbotron")[0].classList.add('rest');
        /* TODO refactorizar */
        let restTime = 5; //this.restValue.innerText;
        this.timeRestInt = restTime;
        this.timeRest.innerText = formatTime(this.timeRestInt);
        this.interval = setInterval(function() {
            if (!this.isPaused) {
                  if (restTime === 0) {
                      if (this.stateChrono === 1) {              
                        restTime = this.workValueInt;
                        this.stateChrono = 2;
                        this.textChrono.innerText = "Work"; /* TODO refactorizar */
                        /* TODO refactorizar */
                        document.getElementsByTagName("html")[0].classList.remove('rest');
                        document.getElementsByClassName("jumbotron")[0].classList.remove('rest');
                        document.getElementsByTagName("html")[0].classList.add('work');
                        document.getElementsByClassName("jumbotron")[0].classList.add('work');
                        /* TODO refactorizar */
                          this.playSound('alert');
                      } else {
                          restTime = this.restValueInt;
                          this.stateChrono = 1;
                          this.textChrono.innerText = "Rest"; /* TODO refactorizar */
                          this.workFinish += 1;                              
                          if (this.workFinish >= this.setsValue.innerText){
                              clearInterval(this.interval);
                              this.playSound('gong');
                            this.textChrono.innerText = "Finish !!!"; /* TODO refactorizar */
                            clearInterval(this.interval);
                            restTime = 0;
                            setTimeout(function () {
                                this.showConfig();
                            }, this.timeReset);
                          } else {
                              this.cycle.innerText = (this.workFinish + 1) + "/" + this.setsValue.innerText;
                              /* TODO refactorizar */
                              document.getElementsByTagName("html")[0].classList.remove('work');
                              document.getElementsByClassName("jumbotron")[0].classList.remove('work');
                              document.getElementsByTagName("html")[0].classList.add('rest');
                              document.getElementsByClassName("jumbotron")[0].classList.add('rest');
                              /* TODO refactorizar */
                              this.playSound('gong2');
                        }
                      }
                  } else {
                    restTime -=1;
                }
                this.timeRestInt = restTime;
                this.timeRest.innerText = formatTime(this.timeRestInt);
                  if (restTime === 3) { 
                      this.playSound('end');
                  }
              }
        }, 1000);
    }

    resetChrono() {
        this.isPaused = true;
        this.modalReset.classList.remove('hide');

        let okReset = document.getElementById("okReset");
        let closeReset = document.getElementById("closeReset");
        let closeResetFunction;
        let okResetFunction = () => {
            this.isPaused = false;
            this.modalReset.classList.add('hide');
            okReset.removeEventListener("click", okResetFunction);
            closeReset.removeEventListener("click", closeResetFunction);
            clearInterval(this.interval);
            this.stateChrono = 1;
            this.workFinish = 0;
            this.showConfig();
        }

        closeResetFunction = () => {        
            this.isPaused = false;
            this.modalReset.classList.add('hide');
            okReset.removeEventListener("click", okResetFunction);
            closeReset.removeEventListener("click", closeResetFunction);
        }

        okReset.addEventListener("click", okResetFunction);
        closeReset.addEventListener("click", closeResetFunction);
        /*
          document.getElementById('okReset').addEventListener('click', () => {                  
            this.isPaused = false;
            this.modalReset.classList.add('hide');
            document.getElementById('okReset').removeEventListener('click', ()=> {});
            clearInterval(this.interval);
            this.stateChrono = 1;
            this.workFinish = 0;
            this.showConfig();
          }, false);
          document.getElementById('closeReset').addEventListener('click', () => {                  
            this.isPaused = false;
            this.modalReset.classList.add('hide');
            document.getElementById('closeReset').removeEventListener('click', ()=> {});
          }, false);
        */
    }
        

    updateWorkTime() {
        this.workTime = (this.workValueInt * parseInt(this.setsValue.innerText) ) + (this.restValueInt * (parseInt(this.setsValue.innerText) - 1) );
        this.workTimeElement.innerText = formatTime(this.workTime);
    }

    showConfig() {
        this.noSleepVideo.pause();
         /* TODO refactorizar */
        document.getElementsByTagName("html")[0].classList.remove('work');
        document.getElementsByClassName("jumbotron")[0].classList.remove('work');
        document.getElementsByTagName("html")[0].classList.remove('rest');
        document.getElementsByClassName("jumbotron")[0].classList.remove('rest');
         /* TODO refactorizar */
        this.setDiv.classList.remove("hide");
        this.chronoDiv.classList.add("hide");
        this.state = 1;
        this.positionNavigator = 0;
        this.workFinish = 0;
    }

    pauseChrono() {
        this.isPaused = true;
        this.modalPause.classList.remove('hide');
        document.getElementById('closePause').addEventListener('click', () => {                  
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
