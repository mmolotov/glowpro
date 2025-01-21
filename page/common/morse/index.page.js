import {createWidget, widget} from '@zos/ui'
import {push} from '@zos/router'
import {COLORS, CONTROLS, PAGES} from './index.page.layout.js';
import {getCurrentBrightnessSettings, logger, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {COMMON} from '../layout/common.layout';

let settings = {}
let intervals = []
Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        pauseScreenOff()
        setBrightnessSettings({autoBright: false, brightness: 100})
        intervals = JSON.parse(params).intervals
    },
    build() {
        logger.info('intervals: ', intervals)
        const coloredScreen = createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle())
    },
    onDestroy() {
        resetScreenOff()
        setBrightnessSettings(settings)
    }
});
