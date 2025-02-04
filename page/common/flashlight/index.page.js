import {createWidget, prop, widget} from '@zos/ui'
import {getSwiperIndex, setScrollMode} from '@zos/page'
import {showToast} from '@zos/interaction'
import {LocalStorage} from '@zos/storage'

import {COLORS, COMMON, CONTROLS} from './index.page.layout.js';
import {getCurrentBrightnessSettings, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {TOASTS} from '../layout/common.layout';

const colorsCount = Object.keys(COLORS.FLASHLIGHT).length;
const selectedColor = 'flashlight.selectedColor'
const storage = new LocalStorage()
let settings = {}

Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        pauseScreenOff()
    },
    build() {
        setScrollMode(COMMON.scrollMode(colorsCount))
        let state = true
        let index = 0
        for (let key in COLORS.FLASHLIGHT) {
            const color = COLORS.FLASHLIGHT[key]
            const coloredScreen = createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle(color, index++))
        }
        const scrollBar = createWidget(widget.PAGE_SCROLLBAR, {})
        COMMON.swipeToSelectedScreen(storage.getItem(selectedColor));
        let controlsContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer(false, 1))
        let turnOffButton = controlsContainer.createWidget(widget.BUTTON, CONTROLS.flashLightButton(state, (btn) => {
            setScreenBrightness(state ? 0 : 100)
        }))
        setScreenBrightness(100)
        showToast(TOASTS.swipeToSelectColorToast)

        function turnButtonSwitchState(turnOffButton, newState) {
            state = newState
            turnOffButton.setProperty(prop.MORE, CONTROLS.flashLightButtonSwitch(state))
        }

        function setScreenBrightness(value) {
            setBrightnessSettings({autoBright: false, brightness: value})
            if (value === 0) {
                turnButtonSwitchState(turnOffButton, false)
            } else if (value > 0) {
                turnButtonSwitchState(turnOffButton, true)
            }
        }
    },
    onDestroy() {
        storage.setItem(selectedColor, getSwiperIndex())
        resetScreenOff()
        setBrightnessSettings(settings)
    }
})