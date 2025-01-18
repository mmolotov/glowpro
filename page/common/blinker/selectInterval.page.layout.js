import {getText} from '@zos/i18n';

import {BUTTONS, COLORS, COMMON, DEVICE_INFO, PAGES, TRANSLATION_KEYS} from '../layout/common.layout'

//slider
const yCoefficient = 0.15
const xCoefficient = 0.2
const hCoefficient = 0.6
// slider bar
const sliderBarLineWith = 4
const sliderBarW = 100
const sliderBarRadius = sliderBarW / 2
const sliderBarH = DEVICE_INFO.DEVICE_HEIGHT * hCoefficient
const sliderBarY = DEVICE_INFO.DEVICE_HEIGHT * yCoefficient
const sliderBarX = DEVICE_INFO.DEVICE_WIDTH * xCoefficient //(DEVICE_INFO.DEVICE_WIDTH - sliderBarW - sliderBarLineWith)
//slider control
const sliderControlRadius = sliderBarRadius - sliderBarLineWith * 2
const sliderControlMax = sliderBarY + sliderBarH - sliderBarRadius
const sliderControlMin = sliderBarY + sliderBarRadius
const sliderControlX = sliderBarX + sliderBarRadius
//slider text
const textSize = 28
const textH = textSize * 1.2
const textW = textH * 5

const sliderValueMin = 100
const sliderValueMax = 1_000
const sliderValueStep = 50

const CONTROLS = {
    sliderControl(valueY = 0) {
        return {
            center_x: sliderControlX,
            center_y: Math.max(sliderControlMin, Math.min(sliderControlMax, valueY)),
            radius:   sliderControlRadius,
            color:    COLORS.TEXT.BUTTON
        }
    },
    sliderBar: {
        x:          sliderBarX,
        y:          sliderBarY,
        w:          sliderBarW,
        h:          sliderBarH,
        radius:     sliderBarRadius,// The rectangle's rounded corners.
        line_width: sliderBarLineWith,
        color:      COLORS.SYS.BUTTON_HIGHLIGHT
    },
    sliderHover() {
        let props = CONTROLS.sliderBar
        props.alpha = 0
        return props
    },
    sliderSetValue(info = {x: 0, y: 0}) {
        return {
            center_x: calculateSliderX(info),
            center_y: calculateSliderY(info),
            radius:   sliderControlRadius,
            color:    COLORS.TEXT.BUTTON
        }
    },
    sliderText(value) {
        return {
            x:         DEVICE_INFO.DEVICE_WIDTH / 2,
            y:         DEVICE_INFO.DEVICE_HEIGHT / 2,
            w:         textW,
            h:         textH,
            color:     COLORS.TEXT.TITLE,
            text_size: textSize,
            text:      Math.min(sliderValueMax, Math.max(sliderValueMin, value)) + ' ' + getText(TRANSLATION_KEYS.milis)
        }
    },
    sliderTextSetNewValue(info = {x: 0, y: 0}) {
        let props = this.sliderText()
        props.text = calculateSliderValue(info) + ' ' + getText(TRANSLATION_KEYS.milis)
        return props
    }
}

function calculateSliderX(info = {x: 0, y: 0}) {
    return sliderControlX
}

function calculateSliderY(info = {x: 0, y: 0}) {
    const result = Math.min(sliderControlMax, Math.max(sliderControlMin, info.y))
    return result
}

function calculateSliderValue(info = {x: 0, y: 0}) {
    const valueShifted = calculateSliderY(info) - sliderControlMax
    const valueInPercents = Math.abs(parseInt(valueShifted / (sliderControlMax - sliderControlMin) * 100))
    return sliderValueMin + Math.round((valueInPercents / 100) * (sliderValueMax - sliderValueMin) / sliderValueStep) * sliderValueStep
}

export {DEVICE_INFO, COLORS, COMMON, CONTROLS, PAGES, BUTTONS, calculateSliderY, calculateSliderValue}