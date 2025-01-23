import {push} from '@zos/router'
import {createWidget, event, prop, widget} from '@zos/ui'
import {LocalStorage} from '@zos/storage'
import {calculateSliderValue, CONTROLS} from './selectInterval.page.layout.js';
import {BUTTONS, COMMON, PAGES, TRANSLATION_KEYS} from '../layout/common.layout';

const selectedInterval = 'blinker.selectedInterval'
const selectedIntervalY = 'blinker.selectedIntervalY'
const storage = new LocalStorage()
let colors = []
let interval = 1000

Page({
    onInit(params) {
        for (let strColor of params.split(',')) {
            colors.push(parseInt(strColor))
        }
        let previousInterval = storage.getItem(selectedInterval);
        if (previousInterval) {
            interval = previousInterval
        }
    },
    build() {
        const controlsContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer())
        let header = controlsContainer.createWidget(widget.TEXT, COMMON.header(TRANSLATION_KEYS.selectInterval))
        //todo: replace slider with picker
        let sliderBar = controlsContainer.createWidget(widget.FILL_RECT, CONTROLS.sliderBar)
        let sliderControl = controlsContainer.createWidget(widget.CIRCLE, CONTROLS.sliderControl(storage.getItem(selectedIntervalY)))
        let sliderHover = controlsContainer.createWidget(widget.FILL_RECT, CONTROLS.sliderHover())
        let sliderText = controlsContainer.createWidget(widget.TEXT, CONTROLS.sliderText(interval))
        sliderHover.addEventListener(event.CLICK_UP, (info) => {
            sliderBarSetValue(sliderControl, info)
        })
        sliderHover.addEventListener(event.MOVE, (info) => {
            sliderBarSetValue(sliderControl, info)
        })

        const startButton = controlsContainer.createWidget(widget.BUTTON, BUTTONS.startButton(btn => {
            push({
                url:    PAGES.blinker,
                params: {colors: colors, interval: interval}
            })
        }))

        function sliderBarSetValue(sliderControl, info) {
            sliderControl.setProperty(prop.MORE, CONTROLS.sliderSetValue(info))
            sliderText.setProperty(prop.MORE, CONTROLS.sliderTextSetNewValue(info))
            interval = calculateSliderValue(info)
            storage.setItem(selectedInterval, interval)
            storage.setItem(selectedIntervalY, info.y)
        }
    }
});
