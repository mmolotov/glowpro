import {createWidget, event, prop, widget} from '@zos/ui'
import {push} from '@zos/router'
import {BUTTONS, COLORS, COMMON, CONTROLS, PAGES} from './selectColors.page.layout.js';

Page({
    build() {
        let colorCheckBoxes = []
        const colorsContainer = createWidget(widget.VIEW_CONTAINER, COMMON.fullScreenContainer(true, 0))
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

        const checkbox_group = colorsContainer.createWidget(widget.CHECKBOX_GROUP,
                CONTROLS.colorsCheckBoxGroup((group, index, checked) => {
                    let colorCheckBox = colorCheckBoxes[index];
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

        const startButton = backgroundContainer.createWidget(widget.BUTTON, BUTTONS.startButton(btn => {
            let colors = []
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
            }
        }))
    }
});
