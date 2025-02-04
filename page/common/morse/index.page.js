import {createWidget, prop, widget} from '@zos/ui'
import {getSwiperIndex, setScrollMode} from '@zos/page'
import {showToast} from '@zos/interaction'
import {LocalStorage} from '@zos/storage'

import {getCurrentBrightnessSettings, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {COLORS, COMMON, TOASTS} from '../layout/common.layout';

const colorsCount = Object.keys(COLORS.FLASHLIGHT).length;
const selectedColor = 'morse.selectedColor'
const storage = new LocalStorage()
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
        setScrollMode(COMMON.scrollMode(colorsCount))

        const coloredScreens = []
        for (let i = 0; i < colorsCount; i++) {
            coloredScreens.push(createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle(COLORS.BLACK, i)))
        }
        const scrollBar = createWidget(widget.PAGE_SCROLLBAR, {})
        COMMON.swipeToSelectedScreen(storage.getItem(selectedColor));

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
        showToast(TOASTS.swipeToSelectColorToast)

        doBlinkIteration(intervals, coloredScreens);
        setInterval(() => {
            doBlinkIteration(intervals, coloredScreens);
        }, totalDuration + splitInterval)

        function doBlinkIteration(blinkIntervals = intervals, screens = coloredScreens) {
            for (const interval of blinkIntervals) {
                setTimeout(() => {
                    blink(screens, interval.duration)
                }, interval.interval)
            }
        }

        function blink(screens = coloredScreens, duration = 1) {
            let index = getSwiperIndex() - 1
            const screen = screens[index]
            screen.setProperty(prop.MORE, COMMON.fullScreenRectangle(COLORS.flashlightColor(index), index))
            setTimeout(() => {
                screen.setProperty(prop.MORE, COMMON.fullScreenRectangle(COLORS.BLACK, index))
            }, duration)
        }
    },
    onDestroy() {
        storage.setItem(selectedColor, getSwiperIndex())
        resetScreenOff()
        setBrightnessSettings(settings)
    }
});
