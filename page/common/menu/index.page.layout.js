import {getText} from '@zos/i18n';
import {px} from '@zos/utils'

import {BUTTONS, COLORS, DEVICE_INFO, standardButtonSize, TRANSLATION_KEYS} from '../layout/common.layout'

const buttonsShift = px(20)
const buttonSize = px(standardButtonSize)
const xCoefficient = 0.2
const yCoefficient = 0.2
const buttonX = DEVICE_INFO.DEVICE_WIDTH * xCoefficient
const buttonYShift = buttonSize + buttonsShift

function getButtonY(index) {
    return DEVICE_INFO.DEVICE_HEIGHT * yCoefficient + buttonYShift * index
}

const textSize = 35
const textH = textSize * 1.5
const textW = textH * 4
const textShift = px(20)
const textX = buttonX + buttonSize + textShift

function getTextY(index) {
    return getButtonY(index) + (buttonSize - textH) / 2
}

const CONTROLS = {
    button(index, normal_src, press_src, clickCallback) {
        return {
            x:          buttonX,
            y:          getButtonY(index),
            w:          -1,
            h:          -1,
            normal_src: normal_src,
            press_src:  press_src,
            click_func: clickCallback
        }
    },
    text(index, textKey) {
        return {
            x:         textX,
            y:         getTextY(index),
            w:         textW,
            h:         textH,
            color:     COLORS.TEXT.SUBTITLE,
            text_size: textSize,
            text:      getText(textKey)
        }
    },
    flashlightButton(clickCallback) {
        return CONTROLS.button(0, BUTTONS.flashlightOff.normal_src, BUTTONS.flashlightOff.press_src, clickCallback)
    },
    flashlightText() {
        return CONTROLS.text(0, TRANSLATION_KEYS.flashlight)
    },
    blinkerButton(clickCallback) {
        return CONTROLS.button(1, BUTTONS.blinker.normal_src, BUTTONS.blinker.press_src, clickCallback)
    },
    blinkerText() {
        return CONTROLS.text(1, TRANSLATION_KEYS.blinker)
    },
    morseButton(clickCallback) {
        return CONTROLS.button(2, BUTTONS.morse.normal_src, BUTTONS.morse.press_src, clickCallback)
    },
    morseText() {
        return CONTROLS.text(2, TRANSLATION_KEYS.morse)
    }
}

export {CONTROLS}