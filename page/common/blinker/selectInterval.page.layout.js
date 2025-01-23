import {getText} from '@zos/i18n';
import {align, text_style} from '@zos/ui'

import {COLORS, DEVICE_INFO, TRANSLATION_KEYS} from '../layout/common.layout'

//slider
const sliderValueMin = 100
const sliderValueMax = 1_000
const sliderValueStep = 50
// slider bar
const yCoefficient = 0.2
const xCoefficient = 0.6
const hCoefficient = 0.55
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
const textH = textSize
const textW = textH * 5
const textXCoefficient = 0.2
const textYCoefficient = 0.5
const textX = DEVICE_INFO.DEVICE_WIDTH * textXCoefficient
const textY = DEVICE_INFO.DEVICE_HEIGHT * textYCoefficient - textH / 2

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
            x:          textX,
            y:          textY,
            w:          textW,
            h:          textH,
            color:      COLORS.TEXT.TITLE,
            text_size:  textSize,
            align_h:    align.RIGHT,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       Math.min(sliderValueMax, Math.max(sliderValueMin, value)) + ' ' + getText(TRANSLATION_KEYS.milis)
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

export {CONTROLS, calculateSliderValue}