export class TimerController {
    constructor(model, jukebox){
        this.model = model
        this.jukebox = jukebox
    }

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


    initChrono() {
        this.model.chronoState();
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
}
