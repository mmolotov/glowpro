import {px} from '@zos/utils'

import {BUTTONS, COLORS, DEVICE_INFO, PAGES, standardButtonSize, COMMON} from '../layout/common.layout'

// brightness control bar
const yCoefficient = 0.15
const hCoefficient = 0.7
const brightnessBarHeight = DEVICE_INFO.DEVICE_HEIGHT * hCoefficient
const brightnessBarWidth = 50
const brightnessBarRadius = 25
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
const buttonSize = px(standardButtonSize)
const buttonXCoefficient = 0.98
const buttonYCoefficient = 0.50
const buttonX = (DEVICE_INFO.DEVICE_WIDTH - buttonSize) * buttonXCoefficient
const buttonY = (DEVICE_INFO.DEVICE_HEIGHT - buttonSize) * buttonYCoefficient

// menu button
const menuButtonSize = px(standardButtonSize)
const menuButtonXCoefficient = 1 - buttonXCoefficient
const menuButtonYCoefficient = buttonYCoefficient
const menuButtonX = (DEVICE_INFO.DEVICE_WIDTH - menuButtonSize) * menuButtonXCoefficient
const menuButtonY = (DEVICE_INFO.DEVICE_HEIGHT - menuButtonSize) * menuButtonYCoefficient

const CONTROLS = {
    brightness: {
        bar:     {
            x:          brightnessBarX,
            y:          brightnessBarY,
            w:          brightnessBarWidth,
            h:          brightnessBarHeight,
            radius:     brightnessBarRadius,// The rectangle's rounded corners.
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
                normal_src: BUTTONS.flashlightSrc(state),
                press_src:  BUTTONS.flashlightPressSrc(state),
                click_func: clickCallback
            }
        },
        buttonSwitch(state) {
            return {
                x:          buttonX,
                y:          buttonY,
                w:          -1,
                h:          -1,
                normal_src: BUTTONS.flashlightSrc(state),
                press_src:  BUTTONS.flashlightPressSrc(state)
            }
        },
        text(value) {
            return {
                x:         (DEVICE_INFO.DEVICE_WIDTH - textH) / 2 - getTextYShift(value),
                y:         brightnessBarY + brightnessBarHeight,
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
                normal_src: BUTTONS.menu.normal_src,
                press_src:  BUTTONS.menu.press_src,
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

export {DEVICE_INFO, COLORS, CONTROLS, COMMON, PAGES, calculatePosition, toBrightnessPercentage}
