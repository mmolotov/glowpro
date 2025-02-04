import {CONTROLS as CONTROLS_COMMONS} from './recorder.page.layout'
import {COMMON, DEVICE_INFO, TRANSLATION_KEYS} from '../layout/common.layout';

const CONTROLS = CONTROLS_COMMONS

const recorderLabelXCoefficient = 0.05;
CONTROLS.recorderLabel = function () {
    let props = COMMON.header(TRANSLATION_KEYS.morseSetup)
    props.x = DEVICE_INFO.DEVICE_WIDTH * recorderLabelXCoefficient
    props.w = DEVICE_INFO.DEVICE_WIDTH - DEVICE_INFO.DEVICE_WIDTH * recorderLabelXCoefficient
    props.y = px(60)
    props.h = px(115)
    return props
}

export {CONTROLS}