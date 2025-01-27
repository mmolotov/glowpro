import {px} from '@zos/utils'

import {BUTTONS, COLORS, COMMON, DEVICE_INFO, PAGES, standardButtonSize} from '../layout/common.layout'

// turn on/off button
const buttonSize = px(standardButtonSize)
const buttonX = (DEVICE_INFO.DEVICE_WIDTH - buttonSize) / 2
const buttonY = (DEVICE_INFO.DEVICE_HEIGHT - buttonSize) / 2

const CONTROLS = {
    flashLightButton(state, clickCallback) {
        return {
            x:          buttonX,
            y:          buttonY,
            w:          -1,
            h:          -1,
            normal_src: BUTTONS.flashlightSrc(state),
            press_src:  BUTTONS.flashlightPressSrc(state),
            click_func: clickCallback
        }
    },
    flashLightButtonSwitch(state) {
        return {
            x:          buttonX,
            y:          buttonY,
            w:          -1,
            h:          -1,
            normal_src: BUTTONS.flashlightSrc(state),
            press_src:  BUTTONS.flashlightPressSrc(state)
        }
    }
}
export {DEVICE_INFO, COLORS, CONTROLS, COMMON, PAGES}
