import {createWidget, prop, widget} from '@zos/ui'
import {Time} from '@zos/sensor';
import {getCurrentBrightnessSettings, logger, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {COLORS, COMMON} from '../layout/common.layout';

let settings = {}
let timestamps = []
const TIME = new Time()

const minInterval = 200
const blinkInterval = 80
const splitInterval = 1000

Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        pauseScreenOff()
        setBrightnessSettings({autoBright: false, brightness: 100})
        timestamps = JSON.parse(params).intervals
    },
    build() {
        const coloredScreen = createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle())

        const totalDuration = timestamps[timestamps.length - 1] - timestamps[0];
        const intervals = timestamps.map((time, index) => {
            if (index === 0) {
                return 0;
            }
            return time - timestamps[0];
        });
        logger.info('timestamps: ', timestamps)
        logger.info('totalDuration: ', totalDuration)
        logger.info('intervals: ', intervals)

        blink(coloredScreen)
        for (const interval of intervals) {
            setTimeout(() => {
                blink(coloredScreen)
            }, interval)
        }
        setInterval(() => {
            for (const interval of intervals) {
                setTimeout(() => {
                    blink(coloredScreen)
                }, interval)
            }
        }, totalDuration + splitInterval)

        function blink(coloredScreen) {
            coloredScreen.setProperty(prop.MORE, COMMON.fullScreenRectangle(COLORS.FLASHLIGHT.WHITE))
            setTimeout(() => {
                coloredScreen.setProperty(prop.MORE, COMMON.fullScreenRectangle(COLORS.BLACK))
            }, blinkInterval)
        }
    },
    onDestroy() {
        resetScreenOff()
        setBrightnessSettings(settings)
    }
});
