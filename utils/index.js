import {log as Logger} from '@zos/utils';
import {
    getAutoBrightness,
    getBrightness,
    pauseDropWristScreenOff,
    pausePalmScreenOff,
    resetDropWristScreenOff,
    resetPalmScreenOff,
    setAutoBrightness,
    setBrightness
} from '@zos/display'

export const logger = Logger.getLogger('timerr');

export const CONSTANTS = {
    PAGES: {
        flashlight: 'page/common/flashlight/index.page',
        menu:       'page/common/menu/index.page'
    }
}

export function assets(type) {
    return (path) => type + '/' + path;

}

export function pauseScreenOff() {
    const duration = {
        duration: 0
    }
    pausePalmScreenOff(duration)
    pauseDropWristScreenOff(duration)

}

export function resetScreenOff() {
    resetPalmScreenOff()
    resetDropWristScreenOff()

}

export function getCurrentBrightnessSettings() {
    return {
        autoBright: getAutoBrightness(),
        brightness: getBrightness()
    }
}

export function setBrightnessSettings(settings = {autoBright: false, brightness: 50}) {
    setAutoBrightness(settings)
    setBrightness(settings)
}