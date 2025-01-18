import {createWidget, prop, widget} from '@zos/ui'

import {getCurrentBrightnessSettings, logger, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {COMMON, CONTROLS} from './blinker.page.layout.js';

let colors = []
let interval = 500
let settings = {}

Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        let paramsObject = JSON.parse(params);
        colors = paramsObject.colors
        interval = paramsObject.interval
        logger.debug('colors: ', colors)
        logger.debug('interval: ', interval)
    },
    build() {
        pauseScreenOff()
        setBrightnessSettings({autoBright: false, brightness: 100})
        logger.info(colors)
        const backgroundContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer())
        const coloredScreen = backgroundContainer.createWidget(widget.FILL_RECT, CONTROLS.fullScreenRectangle(colors[0]))

        let index = 0
        setInterval(() => {
            if (index >= colors.length) {
                index = 0
            }
            coloredScreen.setProperty(prop.MORE, CONTROLS.fullScreenRectangle(colors[index]))
            index++
        }, interval)
    },
    onDestroy() {
        resetScreenOff()
        setBrightnessSettings(settings)
    }
});
