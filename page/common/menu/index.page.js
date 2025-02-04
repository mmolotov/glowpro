import {createWidget, event, widget} from '@zos/ui'
import {push} from '@zos/router'
import {createModal, MODAL_CONFIRM} from '@zos/interaction'

import {CONTROLS} from 'zosLoader:./index.page.[pf].layout.js';
import {PAGES} from '../layout/common.layout';

Page({
    build() {
        const routeFlashlight = () => {
            push({url: PAGES.flashlight})
        }
        const routeBlinker = () => {
            showDisclaimer({url: PAGES.blinkerSelectColors})
        }
        const routeMorse = () => {
            showDisclaimer({url: PAGES.morseSetup})
        }
        const flashlightHover = createWidget(widget.FILL_RECT, CONTROLS.flashlightHover())
        flashlightHover.addEventListener(event.CLICK_UP, routeFlashlight)
        const flashlightButton = createWidget(widget.BUTTON, CONTROLS.flashlightButton(routeFlashlight));
        const flashlightText = createWidget(widget.TEXT, CONTROLS.flashlightText())
        flashlightText.addEventListener(event.CLICK_UP, routeFlashlight)

        const blinkerHover = createWidget(widget.FILL_RECT, CONTROLS.blinkerHover())
        blinkerHover.addEventListener(event.CLICK_UP, routeBlinker)
        const blinkerButton = createWidget(widget.BUTTON, CONTROLS.blinkerButton(routeBlinker));
        const blinkerText = createWidget(widget.TEXT, CONTROLS.blinkerText())
        blinkerText.addEventListener(event.CLICK_UP, routeBlinker)

        const morseHover = createWidget(widget.FILL_RECT, CONTROLS.morseHover())
        morseHover.addEventListener(event.CLICK_UP, routeMorse)
        const morseButton = createWidget(widget.BUTTON, CONTROLS.morseButton(routeMorse));
        const morseText = createWidget(widget.TEXT, CONTROLS.morseText())
        morseText.addEventListener(event.CLICK_UP, routeMorse)

        function showDisclaimer(pushParams) {
            const confirmCallback = (keyObj) => {
                const {type} = keyObj
                if (type === MODAL_CONFIRM) {
                    push(pushParams)
                } else {
                    disclaimer.show(false)
                }
            }
            const disclaimer = createModal(CONTROLS.disclaimer(confirmCallback))
            disclaimer.show(true)
        }
    }
});
