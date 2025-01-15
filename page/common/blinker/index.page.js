import {createWidget, event, prop, widget} from '@zos/ui'
import {COLORS, CONTROLS} from './index.page.layout.js';

Page({
    build() {
        const checkbox_group = createWidget(widget.CHECKBOX_GROUP, CONTROLS.colorsCheckBoxGroup((group, index, checked) => {
            if (checked) {
                console.log('index', index)
                console.log('checked', checked)
            }
        }))

        let colorCheckBoxes = {}
        let index = 0
        for (let key in COLORS.FLASHLIGHT) {
            const color = COLORS.FLASHLIGHT[key]
            const label = checkbox_group.createWidget(widget.FILL_RECT, CONTROLS.colorsCheckBoxLabel(index, color))
            const cover = checkbox_group.createWidget(widget.FILL_RECT, CONTROLS.colorsCheckBoxCover(index, color))
            const button = checkbox_group.createWidget(widget.STATE_BUTTON, CONTROLS.colorsCheckBox(index))
            cover.addEventListener(event.CLICK_UP, (info) => {
                const checked = checkbox_group.getProperty(prop.CHECKED, button)
                const newState = checked ? prop.UNCHECKED : prop.CHECKED
                checkbox_group.setProperty(newState, button)
            })
            colorCheckBoxes[key] = {
                button: button,
                label:  label
            }
            index++
        }
        checkbox_group.setProperty(prop.INIT, colorCheckBoxes[Object.keys(colorCheckBoxes)[0]].button)
    }
});
