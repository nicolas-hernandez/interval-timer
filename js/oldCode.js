//I conserve old code here in case I want to use it

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

let classnameLess = document.getElementsByClassName('lessBtn');
for (var li = 0; li < classnameLess.length; li++) {
    classnameLess[li].addEventListener('click', this.lessValue);    
    classnameLess[li].addEventListener('mousedown', this.lessValueCont);
    classnameLess[li].addEventListener('touchstart', this.lessValueCont);
    classnameLess[li].addEventListener('mouseup', this.contEnd);
    classnameLess[li].addEventListener('touchend', this.contEnd);            
}


let type = classnameMore[i].target.getAttribute('data-type');
let classnameMore = document.getElementsByClassName('moreBtn');
for (var i = 0; i < classnameMore.length; i++) {
    classnameMore[i].addEventListener('click', this.moreValue);
    classnameMore[i].addEventListener('mousedown', this.moreValueCont);
    classnameMore[i].addEventListener('touchstart', this.moreValueCont);
    classnameMore[i].addEventListener('mouseup', this.contEnd);
    classnameMore[i].addEventListener('touchend', this.contEnd);
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
