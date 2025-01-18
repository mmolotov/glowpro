import {px} from '@zos/utils'
import {BUTTONS, COLORS, COMMON, DEVICE_INFO, PAGES, systemButtonSize} from '../layout/common.layout'

const colorsCheckBoxX = DEVICE_INFO.DEVICE_WIDTH * 0.15
const colorsCheckBoxY = DEVICE_INFO.DEVICE_HEIGHT * 0.20
const colorsCheckBoxShift = 70
const colorsCheckBoxSize = px(systemButtonSize)

const colorsCheckBoxLabelX = colorsCheckBoxX + colorsCheckBoxShift
const colorsCheckBoxLabelW = DEVICE_INFO.DEVICE_WIDTH * 0.5
const colorsCheckBoxLabelH = colorsCheckBoxSize
const colorsCheckBoxLabelRadius = 20
const colorsCheckBoxCoverAlpha = 50

function getColorsCheckBoxY(index) {
    return colorsCheckBoxY + colorsCheckBoxShift * index
}

function getStartButtonY(index) {
    return getColorsCheckBoxY(index + 1)
}

const CONTROLS = {
    colorsCheckBoxGroup(checkCallback) {
        return {
            x:            0,
            y:            0,
            w:            DEVICE_INFO.DEVICE_WIDTH,
            h:            DEVICE_INFO.DEVICE_HEIGHT,
            select_src:   'selected.png',
            unselect_src: 'unselected.png',
            check_func:   checkCallback
        }
    },
    colorsCheckBox(index = 0) {
        return {
            x: colorsCheckBoxX,
            y: getColorsCheckBoxY(index),
            w: colorsCheckBoxSize,
            h: colorsCheckBoxSize
        }
    },
    colorsCheckBoxLabel(index = 0, color = 0) {
        return {
            x:      colorsCheckBoxLabelX,
            y:      getColorsCheckBoxY(index),
            w:      colorsCheckBoxLabelW,
            h:      colorsCheckBoxLabelH,
            radius: colorsCheckBoxLabelRadius,
            color:  color
        }
    },
    colorsCheckBoxCover(index = 0, color = 0) {
        return {
            x:      0,
            y:      getColorsCheckBoxY(index),
            w:      DEVICE_INFO.DEVICE_WIDTH,
            h:      colorsCheckBoxLabelH,
            radius: 10,
            alpha:  0,
            color:  color
        }
    },
    colorsCheckBoxActivateCover(index = 0, color = 0, checked = false) {
        let params = CONTROLS.colorsCheckBoxCover(index, color)
        params.alpha = checked ? colorsCheckBoxCoverAlpha : 0
        return params
    },
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

export {DEVICE_INFO, COLORS, COMMON, CONTROLS, PAGES, BUTTONS}