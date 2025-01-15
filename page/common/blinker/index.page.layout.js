import {px} from '@zos/utils'
import {COLORS, DEVICE_INFO, PAGES, systemButtonSize, VIEW_CONTAINERS} from '../layout/common.layout'

const colorsCheckBoxX = DEVICE_INFO.DEVICE_WIDTH * 0.15
const colorsCheckBoxY = DEVICE_INFO.DEVICE_HEIGHT * 0.20
const colorsCheckBoxShift = 70
const colorsCheckBoxSize = px(systemButtonSize)

const colorsCheckBoxLabelX = colorsCheckBoxX + colorsCheckBoxShift
const colorsCheckBoxLabelW = DEVICE_INFO.DEVICE_WIDTH * 0.5
const colorsCheckBoxLabelH = colorsCheckBoxSize
const colorsCheckBoxLabelRadius = 20

function getColorsCheckBoxY(index) {
    return colorsCheckBoxY + colorsCheckBoxShift * index
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
    colorsCheckBox(index) {
        return {
            x: colorsCheckBoxX,
            y: getColorsCheckBoxY(index),
            w: colorsCheckBoxSize,
            h: colorsCheckBoxSize
        }
    },
    colorsCheckBoxLabel(index, color) {
        return {
            x:      colorsCheckBoxLabelX,
            y:      getColorsCheckBoxY(index),
            w:      colorsCheckBoxLabelW,
            h:      colorsCheckBoxLabelH,
            radius: colorsCheckBoxLabelRadius,
            color:  color
        }
    },
    colorsCheckBoxCover(index, color) {
        return {
            x:      0,
            y:      getColorsCheckBoxY(index),
            w:      DEVICE_INFO.DEVICE_WIDTH,
            h:      colorsCheckBoxLabelH,
            radius: 10,
            alpha: 50,
            color:  color
        }
    }
}

export {DEVICE_INFO, COLORS, VIEW_CONTAINERS, CONTROLS, PAGES}