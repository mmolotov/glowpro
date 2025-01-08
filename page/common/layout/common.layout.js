import {getDeviceInfo} from '@zos/device';
import {px} from '@zos/utils';

export const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = getDeviceInfo();

export const DEVICE_INFO = {
    DEVICE_WIDTH:     DEVICE_WIDTH,
    DEVICE_WIDTH_PX:  px(DEVICE_WIDTH),
    DEVICE_HEIGHT:    DEVICE_HEIGHT,
    DEVICE_HEIGHT_PX: px(DEVICE_HEIGHT)
}

export const COLORS = {
    // see https://www.figma.com/design/bY5cr0QN41npTOTO642Did/Zepp-OS-3.0-Library-Circular-(Community)?node-id=31-3&node-type=canvas
    SYS:       {
        BUTTON:                   0x515151,
        BUTTON_PRESSED:           0x313131,
        BUTTON_HIGHLIGHT:         0x0986D4,
        BUTTON_HIGHLIGHT_PRESSED: 0x234F7C,
        HIGHLIGHT:                0x0986D4,
        HIGHLIGHT_DISABLED:       0x10283F,
        PAGE_BACKGROUND:          0x000000,
        SCROLL_BAR:               0xA0A0A0
    },
    TEXT:      {
        BUTTON:   0xFFFFFF,
        LINK:     0x059AF7,
        TITLE:    0xFFFFFF,
        WARNING:  0xD14221,
        SUBTITLE: 0xB2B2B2
    },
    SECONDARY: {
        _01: 0x03B5AA,
        _02: 0x7B9E89,
        _03: 0x399E5A,
        _18: 0xAA2F2F,
        _20: 0x9B3642
    }
}
export const VIEW_CONTAINERS = {
    fullScreenContainer(scrollEnabled = false, zIndex = 0) {
        return {
            x:             0,
            y:             0,
            w:             DEVICE_INFO.DEVICE_WIDTH,
            h:             DEVICE_INFO.DEVICE_HEIGHT,
            scroll_enable: scrollEnabled ? 1 : 0,
            z_index:       zIndex
        }
    }
}

export const FLASHLIGHT = {
    WHITE: {
        x:      0,
        y:      0,
        w:      DEVICE_INFO.DEVICE_WIDTH,
        h:      DEVICE_INFO.DEVICE_HEIGHT,
        radius: 0,
        color:  COLORS.TEXT.TITLE
    }
}
