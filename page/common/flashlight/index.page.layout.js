import {px} from '@zos/utils'
import {SCROLL_MODE_SWIPER} from '@zos/page'

import {BUTTONS, COLORS, COMMON, DEVICE_INFO, PAGES, standardButtonSize} from '../layout/common.layout'

// turn on/off button
const buttonSize = px(standardButtonSize)
const buttonXCoefficient = 0.98
const buttonYCoefficient = 0.50
const buttonX = (DEVICE_INFO.DEVICE_WIDTH - buttonSize) / 2
const buttonY = (DEVICE_INFO.DEVICE_HEIGHT - buttonSize) / 2

// menu button
const menuButtonSize = px(standardButtonSize)
const menuButtonXCoefficient = 1 - buttonXCoefficient
const menuButtonYCoefficient = buttonYCoefficient
const menuButtonX = (DEVICE_INFO.DEVICE_WIDTH - menuButtonSize) * menuButtonXCoefficient
const menuButtonY = (DEVICE_INFO.DEVICE_HEIGHT - menuButtonSize) * menuButtonYCoefficient

const CONTROLS = {
    scrollMode(count) {
        return {
            mode:    SCROLL_MODE_SWIPER,
            options: {
                height: DEVICE_INFO.DEVICE_HEIGHT,
                count:  count
            }
        }
    },
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
    },
    menuButton(clickCallback) {
        return {
            x:          menuButtonX,
            y:          menuButtonY,
            w:          -1,
            h:          -1,
            normal_src: BUTTONS.menu.normal_src,
            press_src:  BUTTONS.menu.press_src,
            click_func: clickCallback
        }
    }
}
export {DEVICE_INFO, COLORS, CONTROLS, COMMON, PAGES}
