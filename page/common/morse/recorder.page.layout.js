import {px} from '@zos/utils'
import {getText} from '@zos/i18n';

import {COLORS, COMMON, DEVICE_INFO, TRANSLATION_KEYS} from '../layout/common.layout'

const morseButtonW = DEVICE_INFO.DEVICE_WIDTH * 0.6
const morseButtonH = DEVICE_INFO.DEVICE_HEIGHT * 0.3

const CONTROLS = {
    recorderLabel() {
        let props = COMMON.header(TRANSLATION_KEYS.morseSetup)
        props.y = px(60)
        props.h = px(115)
        return props
    },
    morseButton(callback) {
        return {
            x:            (DEVICE_INFO.DEVICE_WIDTH - morseButtonW) * 0.5,
            y:            (DEVICE_INFO.DEVICE_HEIGHT - morseButtonH) * 0.6,
            w:            morseButtonW,
            h:            morseButtonH,
            radius:       30,
            normal_color: COLORS.SYS.BUTTON,
            press_color:  COLORS.SYS.BUTTON_PRESSED,
            click_func:   callback
        }
    },
    emptyRecordToast: {
        content: getText(TRANSLATION_KEYS.morseEmptyRecord)
    }
}

export {CONTROLS}