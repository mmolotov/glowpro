import {createWidget, event, widget} from '@zos/ui'
import {push} from '@zos/router'
import {CONTROLS} from './index.page.layout.js';
import {PAGES} from '../layout/common.layout';

Page({
    build() {
        let flashlightButton = createWidget(widget.BUTTON, CONTROLS.flashlightButton((btn) => {
            push({url: PAGES.flashlight})
        }));
        let flashlightText = createWidget(widget.TEXT, CONTROLS.flashlightText())
        flashlightText.addEventListener(event.CLICK_UP, (e) => {
            push({url: PAGES.flashlight})
        })

        let blinkerButton = createWidget(widget.BUTTON, CONTROLS.blinkerButton((btn) => {
            push({url: PAGES.blinkerSelectColors})
        }));
        let blinkerText = createWidget(widget.TEXT, CONTROLS.blinkerText())
        blinkerText.addEventListener(event.CLICK_UP, (e) => {
            push({url: PAGES.blinkerSelectColors})
        })

        let morseButton = createWidget(widget.BUTTON, CONTROLS.morseButton((btn) => {
            push({url: PAGES.morseSetup})
        }));
        let morseText = createWidget(widget.TEXT, CONTROLS.morseText())
        morseText.addEventListener(event.CLICK_UP, (e) => {
            push({url: PAGES.morseSetup})
        })
    }
});
