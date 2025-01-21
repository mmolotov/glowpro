import {createWidget, prop, widget} from '@zos/ui'
import {setScrollMode} from '@zos/page'
import {showToast} from '@zos/interaction'

import {COLORS, COMMON, CONTROLS} from './index.page.layout.js';
import {getCurrentBrightnessSettings, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';

let settings = {}

Page({
    onInit(params) {
        settings = getCurrentBrightnessSettings()
        pauseScreenOff()
    },
    build() {
        setScrollMode(CONTROLS.scrollMode(Object.keys(COLORS.FLASHLIGHT).length))

        let state = true
        let index = 0
        for (let key in COLORS.FLASHLIGHT) {
            const color = COLORS.FLASHLIGHT[key]
            const coloredScreen = createWidget(widget.FILL_RECT, COMMON.fullScreenRectangle(color, index++))
        }
        const scrollBar = createWidget(widget.PAGE_SCROLLBAR, {})

        let controlsContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer(false, 1))
        let turnOffButton = controlsContainer.createWidget(widget.BUTTON, CONTROLS.flashLightButton(state, (btn) => {
            setScreenBrightness(state ? 0 : 100)
        }))
        setScreenBrightness(100)
        showToast(CONTROLS.selectColorToast)

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
        resetScreenOff()
        setBrightnessSettings(settings)
    }
})