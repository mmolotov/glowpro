import {createWidget, widget} from '@zos/ui'
import {push} from '@zos/router'
import {Time} from '@zos/sensor';
import {showToast} from '@zos/interaction'

import {CONTROLS} from './recorder.page.layout.js';
import {BUTTONS, PAGES} from '../layout/common.layout';

const TIME = new Time()

Page({
    build() {

        const intervals = []
        const label = createWidget(widget.TEXT, CONTROLS.recorderLabel())
        const morseButton = createWidget(widget.BUTTON, CONTROLS.morseButton(btn => {
            intervals.push(TIME.getTime())
        }))
        const startButton = createWidget(widget.BUTTON, BUTTONS.startButton(btn => {
            if (intervals.length === 0) {
                showToast(CONTROLS.emptyRecordToast)
            } else {
                push({
                    url:    PAGES.morse,
                    params: {intervals: intervals}
                })
            }
        }))
    }
});
