
export class ConfigService {
    constructor() {
        this.currentConfig = {
            sets: 20,
            timeRest: 15,
            timeWork: 45
        };
    }

    setConfigValues(setsAmount, restTime, workTime) {
        this.currentConfig = {
            sets: setsAmount,
            timeRest: restTime,
            timeWork: workTime
        };
    }

    getCurrentConfig() {
        return this.currentConfig;
    }
}
