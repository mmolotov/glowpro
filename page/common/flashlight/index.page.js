// import {calculatePosition, CONTROLS, FLASHLIGHT, toBrightnessPercentage, VIEW_CONTAINERS} from 'zosLoader:./index.page.[pf].layout.js';
import {calculatePosition, CONTROLS, FLASHLIGHT, toBrightnessPercentage, VIEW_CONTAINERS} from './index.page.layout.v.js';
import {CONSTANTS, getCurrentBrightnessSettings, logger, pauseScreenOff, resetScreenOff, setBrightnessSettings} from '../../../utils';
import {push} from '@zos/router'

import {createWidget, event, prop, widget} from '@zos/ui'

let settings = getCurrentBrightnessSettings()

Page({
    build() {
        pauseScreenOff()
        let state = true

        let backgroundContainer = createWidget(widget.VIEW_CONTAINER, VIEW_CONTAINERS.fullScreenContainer())
        let background = backgroundContainer.createWidget(widget.FILL_RECT, FLASHLIGHT.WHITE)
        let controlsContainer = createWidget(widget.VIEW_CONTAINER, VIEW_CONTAINERS.fullScreenContainer(false, 1))
        let menuButton = controlsContainer.createWidget(widget.BUTTON, CONTROLS.menu.button((btn) => {
            push({url: CONSTANTS.PAGES.menu})
        }))
        let brightnessValue = controlsContainer.createWidget(widget.TEXT, CONTROLS.brightness.text(100))
        let brightnessControl = controlsContainer.createWidget(widget.CIRCLE, CONTROLS.brightness.control)
        let brightnessBar = controlsContainer.createWidget(widget.STROKE_RECT, CONTROLS.brightness.bar)

        let turnOffButton = controlsContainer.createWidget(widget.BUTTON, CONTROLS.brightness.button(state, (btn) => {
            switchState(btn, brightnessControl)
        }))

        brightnessBar.addEventListener(event.CLICK_UP, (info) => {
            brightnessBarSetValue(brightnessControl, info)
        })
        brightnessBar.addEventListener(event.MOVE, (info) => {
            brightnessBarSetValue(brightnessControl, info)
        })
        setFlashLightBrightness(100)

        function switchState(turnOffButton, brightnessControl) {
            turnButtonSwitchState(turnOffButton, !state)
            brightnessBarSetValue(brightnessControl,
                    state ? {x: CONTROLS.brightness.control.max, y: 0} : {x: 0, y: CONTROLS.brightness.control.max})
        }

        function turnButtonSwitchState(turnOffButton, newState) {
            state = newState
            turnOffButton.setProperty(prop.MORE, CONTROLS.brightness.buttonSwitch(state))
        }

        function brightnessBarSetValue(brightnessControl, info) {
            let newPosition = calculatePosition(info)
            brightnessControl.setProperty(prop.MORE, CONTROLS.brightness.controlSetValue(newPosition))
            setFlashLightBrightness(toBrightnessPercentage(newPosition))
        }

        function setFlashLightBrightness(value) {
            logger.debug('> > > set brightness ' + value)
            setBrightnessSettings({autoBright: false, brightness: value})
            setBrightnessTextValue(value)
            if (value === 0) {
                turnButtonSwitchState(turnOffButton, false)
            } else if (value > 0) {
                turnButtonSwitchState(turnOffButton, true)
            }
        }

        function setBrightnessTextValue(value) {
            brightnessValue.setProperty(prop.MORE, CONTROLS.brightness.text(value))
        }
    },
    onDestroy() {
        resetScreenOff()
        setBrightnessSettings(settings)
    }
})