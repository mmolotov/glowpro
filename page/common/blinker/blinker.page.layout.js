import {COLORS, COMMON, DEVICE_INFO, PAGES} from '../layout/common.layout'

const CONTROLS = {
    fullScreenRectangle(color = 0) {
        return {
            x:     0,
            y:     0,
            w:     DEVICE_INFO.DEVICE_HEIGHT,
            h:     DEVICE_INFO.DEVICE_WIDTH,
            color: color
        }
    }
}

export {DEVICE_INFO, COLORS, COMMON, CONTROLS, PAGES}