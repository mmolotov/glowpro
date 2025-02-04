import {getText} from '@zos/i18n';

import {CONTROLS as CONTROLS_COMMONS} from './index.page.layout'
import {TRANSLATION_KEYS} from '../layout/common.layout';

const CONTROLS = CONTROLS_COMMONS

CONTROLS.disclaimer = function (confirmCallback) {
    return {
        content:  getText(TRANSLATION_KEYS.disclaimerText_r),
        autoHide: false,
        onClick:  confirmCallback
    }
}

export {CONTROLS}