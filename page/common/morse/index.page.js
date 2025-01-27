import {createWidget, prop, widget} from '@zos/ui'
import {getCurrentBrightnessSettings, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {COLORS, COMMON} from '../layout/common.layout';

const splitInterval = 1000
let settings = {}
let timestamps = []

Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        pauseScreenOff()
        setBrightnessSettings({autoBright: false, brightness: 100})
        timestamps = JSON.parse(params).intervals
    },
    build() {
        const coloredScreen = createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle())

        const totalDuration = timestamps[timestamps.length - 1][1] - timestamps[0][0];
        const intervals = timestamps.map((timePair, index) => {
            let interval = 0
            if (index !== 0) {
                interval = timePair[0] - timestamps[0][0];
            }
            return {
                interval: interval,
                duration: (timePair[1] - timePair[0])
            };
        });

        doBlinkIteration(intervals);
        setInterval(() => {
            doBlinkIteration(intervals);
        }, totalDuration + splitInterval)

        function doBlinkIteration(blinkIntervals = intervals) {
            for (const interval of blinkIntervals) {
                setTimeout(() => {
                    blink(coloredScreen, interval.duration)
                }, interval.interval)
            }
        }

        function blink(coloredScreen, duration) {
            coloredScreen.setProperty(prop.MORE, COMMON.fullScreenRectangle(COLORS.FLASHLIGHT.WHITE))
            setTimeout(() => {
                coloredScreen.setProperty(prop.MORE, COMMON.fullScreenRectangle(COLORS.BLACK))
            }, duration)
        }
    },
    onDestroy() {
        resetScreenOff()
        setBrightnessSettings(settings)
    }
});
