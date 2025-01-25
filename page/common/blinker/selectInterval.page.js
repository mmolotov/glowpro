import {createWidget, widget} from '@zos/ui'
import {LocalStorage} from '@zos/storage'
import {push} from '@zos/router'
import {CONTROLS, pickerIntervals, pickerValueMax} from './selectInterval.page.layout.js';
import {COMMON, PAGES} from '../layout/common.layout';

const selectedInterval = 'blinker.selectedInterval'
const storage = new LocalStorage()
let colors = []
let intervals = pickerIntervals
let interval = pickerValueMax

Page({
    onInit(params) {
        for (let strColor of params.split(',')) {
            colors.push(parseInt(strColor))
        }
        let previousInterval = storage.getItem(selectedInterval);
        if (previousInterval) {
            interval = previousInterval
        }
    },
    build() {
        const controlsContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer())
        const picker = controlsContainer.createWidget(widget.WIDGET_PICKER,
                CONTROLS.picker(interval, (picker, event_type, column_index, select_index) => {
                    if (event_type === 1) {
                        interval = intervals[select_index]
                        storage.setItem(selectedInterval, interval)
                    }
                    if (event_type === 2) {
                        push({
                            url:    PAGES.blinker,
                            params: {colors: colors, interval: interval}
                        })
                    }
                }))
    }
});
