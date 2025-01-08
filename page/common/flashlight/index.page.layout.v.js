import {getText} from '@zos/i18n';
import {px} from '@zos/utils'

import {COLORS, DEVICE_INFO, FLASHLIGHT, VIEW_CONTAINERS} from '../layout/common.layout'

// brightness control bar
const yCoefficient = 0.30
const hCoefficient = 0.45
const brightnessBarHeight = DEVICE_INFO.DEVICE_HEIGHT * hCoefficient
const brightnessBarWidth = 40
const brightnessBarLineWith = 4
const brightnessBarY = DEVICE_INFO.DEVICE_HEIGHT * yCoefficient
const brightnessBarX = (DEVICE_INFO.DEVICE_WIDTH - brightnessBarWidth - brightnessBarLineWith) / 2

const radius = brightnessBarWidth / 2
const max = brightnessBarY + brightnessBarHeight - radius
const min = brightnessBarY + radius

const textSize = 14
const textH = textSize + 2
const textW = textH * 3

// turn on/off button
const buttonSize = 88
const buttonXCoefficient = 0.4
const buttonYCoefficient = 0.80
const buttonX = (DEVICE_INFO.DEVICE_WIDTH - px(buttonSize)) / 2
const buttonY = DEVICE_INFO.DEVICE_HEIGHT * buttonYCoefficient
const turnOffLabel = getText('flashlightTurnOff')
const turnOnLabel = getText('flashlightTurnOn')

// menu button
const menuButtonSize = 88
const menuButtonYCoefficient = 0.02
const menuButtonX = (DEVICE_INFO.DEVICE_WIDTH - px(menuButtonSize)) / 2
const menuButtonY = DEVICE_INFO.DEVICE_HEIGHT * menuButtonYCoefficient

const CONTROLS = {
    brightness: {
        bar:     {
            x:          brightnessBarX,
            y:          brightnessBarY,
            w:          brightnessBarWidth,
            h:          brightnessBarHeight,
            radius:     20,// The rectangle's rounded corners.
            line_width: brightnessBarLineWith,
            color:      COLORS.SYS.SCROLL_BAR
        },
        control: {
            center_x: brightnessBarX + radius,
            center_y: min,
            radius:   radius,
            color:    COLORS.SYS.BUTTON,
            min:      min,
            max:      max
        },
        controlSetValue(value) {
            return {
                center_x: brightnessBarX + radius,
                center_y: value,
                radius:   radius,
                color:    COLORS.SYS.BUTTON
            }
        },
        button(state, clickCallback) {
            return {
                x:          buttonX,
                y:          buttonY,
                w:          -1,
                h:          -1,
                normal_src: (state ? 'fb_on.png' : 'fb_off.png'),
                press_src:  (state ? 'fb_on_pressed.png' : 'fb_off_pressed.png'),
                click_func: clickCallback
            }
        },
        buttonSwitch(state) {
            return {
                x:          buttonX,
                y:          buttonY,
                w:          -1,
                h:          -1,
                normal_src: (state ? 'fb_on.png' : 'fb_off.png'),
                press_src:  (state ? 'fb_on_pressed.png' : 'fb_off_pressed.png')
            }
        },
        text(value) {
            return {
                x:         (DEVICE_INFO.DEVICE_WIDTH - textH) / 2 - getTextYShift(value),
                y:         brightnessBarY - 20,
                w:         textW,
                h:         textH,
                color:     COLORS.TEXT.SUBTITLE,
                text_size: textSize,
                text:      value + ' %'
            }
        }
    },
    menu:       {
        button(clickCallback) {
            return {
                x:          menuButtonX,
                y:          menuButtonY,
                w:          -1,
                h:          -1,
                normal_src: 'menu.png',
                press_src:  'menu_pressed.png',
                click_func: clickCallback
            }
        }
    }
}

function getTextYShift(value) {
    if (value < 10) {
        return 0
    }
    if (value < 99) {
        return 3
    }
    return 8
}

function calculatePosition(info = {x: 0, y: 0}) {
    const result = Math.min(max, Math.max(min, info.y))
    return result
}

function toBrightnessPercentage(value) {
    let valueShifted = value - max
    return Math.abs(parseInt(valueShifted / (max - min) * 100))
}

export {DEVICE_INFO, COLORS, CONTROLS, VIEW_CONTAINERS, FLASHLIGHT, calculatePosition, toBrightnessPercentage}
