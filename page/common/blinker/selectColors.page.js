import {createWidget, event, prop, widget} from '@zos/ui'
import {push} from '@zos/router'
import {LocalStorage} from '@zos/storage'
import {showToast} from '@zos/interaction'

import {BUTTONS, COLORS, COMMON, CONTROLS, getText, PAGES} from './selectColors.page.layout.js';

const selectedColors = 'blinker.selectedColors'
const storage = new LocalStorage()
let checkbox_group = {}
let colorCheckBoxes = []

Page({
    build() {
        //draw color labels
        const colorsContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer(true, 0))
        const scrollBar = createWidget(widget.PAGE_SCROLLBAR, {target: colorsContainer})
        const backgroundContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer(false, 1))
        let index = 0
        for (let key in COLORS.FLASHLIGHT) {
            const color = COLORS.FLASHLIGHT[key]
            const label = colorsContainer.createWidget(widget.FILL_RECT, CONTROLS.colorsCheckBoxLabel(index, color))
            const cover = colorsContainer.createWidget(widget.FILL_RECT, CONTROLS.colorsCheckBoxCover(index, color))
            colorCheckBoxes.push({
                index: index,
                key:   key,
                color: color,
                label: label,
                cover: cover
            })
            index++
        }
        const bottom = colorsContainer.createWidget(widget.FILL_RECT, CONTROLS.colorsCheckBoxCover(index + 1, 0))

        //draw check boxes
        checkbox_group = colorsContainer.createWidget(widget.CHECKBOX_GROUP,
                CONTROLS.colorsCheckBoxGroup((group, index, checked) => {
                    const colorCheckBox = colorCheckBoxes[index];
                    if (colorCheckBox) {
                        colorCheckBox.cover.setProperty(prop.MORE,
                                CONTROLS.colorsCheckBoxActivateCover(index, colorCheckBox.color, checked))
                        colorCheckBox.checked = checked
                    }
                }))
        for (let colorCheckBox of colorCheckBoxes) {
            const button = checkbox_group.createWidget(widget.STATE_BUTTON, CONTROLS.colorsCheckBox(colorCheckBox.index))
            colorCheckBox.cover.addEventListener(event.CLICK_UP, (info) => {
                const checked = checkbox_group.getProperty(prop.CHECKED, button)
                const newState = checked ? prop.UNCHECKED : prop.CHECKED
                checkbox_group.setProperty(newState, button)
            })
            colorCheckBox.button = button
        }
        checkbox_group.setProperty(prop.INIT, colorCheckBoxes[0].button)
        const previousSelection = storage.getItem(selectedColors) ? storage.getItem(selectedColors).split(',') : []
        for (let colorCheckBox of colorCheckBoxes) {
            if (previousSelection.includes(colorCheckBox.index.toString())) {
                checkbox_group.setProperty(prop.CHECKED, colorCheckBox.button)
            } else {
                checkbox_group.setProperty(prop.UNCHECKED, colorCheckBox.button)
            }
        }

        //draw confirm button
        const confirmButton = backgroundContainer.createWidget(widget.BUTTON, BUTTONS.startButton(btn => {
            const colors = []
            for (let colorCheckBox of colorCheckBoxes) {
                if (checkbox_group.getProperty(prop.CHECKED, colorCheckBox.button)) {
                    colors.push(colorCheckBox.color)
                }
            }
            if (colors.length === 1) {
                colors.push(COLORS.BLACK)
            }
            if (colors.length > 1) {
                push({
                    url:    PAGES.blinkerSelectInterval,
                    params: colors
                })
            } else {
                showToast(CONTROLS.selectColorToast)
            }
        }))
    }, onDestroy(options) {
        const selection = []
        for (let colorCheckBox of colorCheckBoxes) {
            if (checkbox_group.getProperty(prop.CHECKED, colorCheckBox.button)) {
                selection.push(colorCheckBox.index)
            }
        }
        storage.setItem(selectedColors, selection.toString())
    }
});
