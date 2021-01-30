// TODO: this class should handle persisting configs between runs
// update it every x seconds? trap signals?
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
