import {createWidget, event, widget} from '@zos/ui'
import {push} from '@zos/router'
import {Time} from '@zos/sensor';
import {showToast} from '@zos/interaction'

import {CONTROLS} from './recorder.page.layout.js';
import {BUTTONS, PAGES, TOASTS} from '../layout/common.layout';

const TIME = new Time()

Page({
    build() {

        const intervals = []
        let start = 0
        let end = 0
        let saveClick = false
        const label = createWidget(widget.TEXT, CONTROLS.recorderLabel())
        const morseButton = createWidget(widget.BUTTON, CONTROLS.morseButton())

        morseButton.addEventListener(event.MOVE_OUT, (info) => {
            saveClick = false
        })
        morseButton.addEventListener(event.CLICK_DOWN, (info) => {
            saveClick = true
            start = TIME.getTime()
        })
        morseButton.addEventListener(event.CLICK_UP, (info) => {
            if (saveClick) {
                end = TIME.getTime()
                intervals.push([start, end])
                saveClick = false
            }
        })
        const startButton = createWidget(widget.BUTTON, BUTTONS.startButton(btn => {
            if (intervals.length === 0) {
                showToast(TOASTS.emptyRecordToast)
            } else {
                push({
                    url:    PAGES.morse,
                    params: {intervals: intervals}
                })
            }
        }))
    }
});
