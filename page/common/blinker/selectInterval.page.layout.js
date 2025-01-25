import {getText} from '@zos/i18n';

import {TRANSLATION_KEYS} from '../layout/common.layout'

//slider
const pickerValueMin = 100
const pickerValueMax = 1_000
const pickerValueStep = 50

const pickerIntervals = []
for (let i = pickerValueMin; i <= pickerValueMax; i += pickerValueStep) {
    pickerIntervals.push(i)
}

const CONTROLS = {
    picker(previousValue, callback) {
        return {
            nb_of_columns: 1,
            title:         getText(TRANSLATION_KEYS.selectInterval),
            data_config: [
                {
                    data_array:     pickerIntervals,
                    support_loop:   true,
                    init_val_index: pickerIntervals.indexOf(previousValue),
                    unit:           getText(TRANSLATION_KEYS.milis)
                }
            ],
            picker_cb:   callback
        }
    }
}

export {CONTROLS, pickerIntervals, pickerValueMax}