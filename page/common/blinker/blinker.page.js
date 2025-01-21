import {createWidget, prop, widget} from '@zos/ui'

import {getCurrentBrightnessSettings, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {COMMON} from './blinker.page.layout.js';

let colors = []
let interval = 500
let settings = {}

Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        pauseScreenOff()
        let paramsObject = JSON.parse(params);
        colors = paramsObject.colors
        interval = paramsObject.interval
    },
    build() {
        setBrightnessSettings({autoBright: false, brightness: 100})
        const coloredScreen = createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle(colors[0]))

        let index = 0
        setInterval(() => {
            if (index >= colors.length) {
                index = 0
            }
            coloredScreen.setProperty(prop.MORE, COMMON.fullScreenRectangle(colors[index]))
            index++
        }, interval)
    },
    onDestroy() {
        resetScreenOff()
        setBrightnessSettings(settings)
    }
});
