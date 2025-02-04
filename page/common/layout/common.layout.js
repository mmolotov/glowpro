import {getDeviceInfo} from '@zos/device';
import {getText} from '@zos/i18n';
import {align, text_style} from '@zos/ui'
import {px} from '@zos/utils'
import {SCROLL_MODE_SWIPER} from '@zos/page'

export const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = getDeviceInfo();

export const DEVICE_INFO = {
    DEVICE_WIDTH:     DEVICE_WIDTH,
    DEVICE_WIDTH_PX:  px(DEVICE_WIDTH),
    DEVICE_HEIGHT:    DEVICE_HEIGHT,
    DEVICE_HEIGHT_PX: px(DEVICE_HEIGHT)
}

export const COLORS = {
    // see https://www.figma.com/design/bY5cr0QN41npTOTO642Did/Zepp-OS-3.0-Library-Circular-(Community)?node-id=31-3&node-type=canvas
    SYS:        {
        BUTTON:                   0x515151,
        BUTTON_PRESSED:           0x313131,
        BUTTON_HIGHLIGHT:         0x0986D4,
        BUTTON_HIGHLIGHT_PRESSED: 0x234F7C,
        HIGHLIGHT:                0x0986D4,
        HIGHLIGHT_DISABLED:       0x10283F,
        PAGE_BACKGROUND:          0x000000,
        SCROLL_BAR:               0xA0A0A0
    },
    TEXT:       {
        BUTTON:   0xFFFFFF,
        LINK:     0x059AF7,
        TITLE:    0xFFFFFF,
        WARNING:  0xD14221,
        SUBTITLE: 0xB2B2B2
    },
    AUXILIARY:  {
        AUX_01: 0x03B5AA,
        AUX_02: 0x7B9E89,
        AUX_03: 0x399E5A,
        AUX_04: 0xF7B538,
        AUX_05: 0xE9C46A,
        AUX_06: 0xE09200,
        AUX_07: 0xF2559D,
        AUX_08: 0x7B29CC,
        AUX_09: 0x984CE5,
        AUX_10: 0xFB4B4E,
        AUX_11: 0xF20000,
        AUX_12: 0xDB5461,
        AUX_13: 0xFB4B4E,
        AUX_14: 0xDBDBDB,
        AUX_15: 0xCACFD6,
        AUX_16: 0xCF9D4F,
        AUX_17: 0xDE6D30,
        AUX_18: 0xAA2F2F,
        AUX_19: 0x8B4060,
        AUX_20: 0x9B3642,
        AUX_21: 0x3CA4CE,
        AUX_22: 0xDB6363,

        PAI_1: 0xDCBE4B,
        PAI_2: 0x6FCDF2,
        PAI_3: 0x37CCBD,

        HR_RELAX:     0x969DB8,
        HR_MAXIMUM:   0xC42742,
        HR_ANAEROBIC: 0xCE581A,
        HR_AEROBIC:   0xDFA032,
        HR_BURNING:   0x2EC06E,
        HR_WARM_UP:   0x229EBE
    },
    FLASHLIGHT: {
        WHITE:     0xFFFFFF,
        RED:       0xF20000,
        ORANGE:    0xDE6D30,
        YELLOW:    0xF7B538,
        GREEN:     0x399E5A,
        BLUE:      0x3CA4CE,
        DARK_BLUE: 0x0000FF,
        PURPLE:    0x984CE5,
        PINK:      0xF2559D
    },
    flashlightColor(index, fallback = COLORS.FLASHLIGHT.WHITE) {
        let color = COLORS.FLASHLIGHT[Object.keys(COLORS.FLASHLIGHT)[index]];
        return color ? color : fallback
    },
    BLACK: 0x000000
}

export const PAGES = {
    blinker:               'page/common/blinker/blinker.page',
    blinkerSelectColors:   'page/common/blinker/selectColors.page',
    blinkerSelectInterval: 'page/common/blinker/selectInterval.page',
    flashlight:            'page/common/flashlight/index.page',
    menu:                  'page/common/menu/index.page',
    morse:                 'page/common/morse/index.page',
    morseSetup:            'page/common/morse/recorder.page'
}

export const TRANSLATION_KEYS = {
    blinker:            'blinker',
    disclaimerText_r:   'disclaimer_text_r',
    disclaimerText_s:   'disclaimer_text_s',
    flashlight:         'flashlight',
    milis:              'ms',
    morse:              'morse',
    morseEmptyRecord:   'morse_empty_record',
    morseSetup:         'morse_setup',
    selectColor:        'select_color',
    selectColors:       'select_colors',
    selectInterval:     'select_interval',
    swipeToSelectColor: 'swipe_to_select_color'
}

export const COMMON = {
    fullScreenContainer(scrollEnabled = false, zIndex = 0) {
        return {
            x:             0,
            y:             0,
            w:             DEVICE_INFO.DEVICE_WIDTH,
            h:             DEVICE_INFO.DEVICE_HEIGHT,
            scroll_enable: scrollEnabled ? 1 : 0,
            z_index:       zIndex
        }
    },
    fullScreenRectangle(color = 0, index = 0, alpha = 255) {
        return {
            x:     0,
            y:     0 + DEVICE_INFO.DEVICE_HEIGHT * index,
            h:     DEVICE_INFO.DEVICE_HEIGHT,
            w:     DEVICE_INFO.DEVICE_WIDTH,
            color: color,
            alpha: alpha
        }
    },
    header(translationKey = '') {
        return {
            x:          DEVICE_INFO.DEVICE_WIDTH * 0.2,
            y:          px(40),
            w:          DEVICE_INFO.DEVICE_WIDTH * 3 / 5,
            h:          px(40),
            color:      COLORS.TEXT.TITLE,
            text_size:  35,
            align_h:    align.CENTER_H,
            align_v:    align.CENTER_V,
            text_style: text_style.NONE,
            text:       getText(translationKey)
        }
    },
    scrollMode(count = 0) {
        return {
            mode:    SCROLL_MODE_SWIPER,
            options: {
                height: DEVICE_INFO.DEVICE_HEIGHT,
                count:  count
            }
        }
    }
}
export const standardBottomButtonSize = 88
export const standardButtonSize = 88
export const systemButtonSize = 64

export const BUTTONS = {
    menu:           {
        normal_src: 'menu.png',
        press_src:  'menu_pressed.png'
    },
    flashlightOn:   {
        normal_src: 'fb_on.png',
        press_src:  'fb_on_pressed.png'
    },
    flashlightOff:  {
        normal_src: 'fb_off.png',
        press_src:  'fb_off_pressed.png'
    },
    confirm_button: {
        normal_src: 'confirm_button.png',
        press_src:  'confirm_button_pressed.png'
    },
    blinker:        {
        normal_src: 'blinker.png',
        press_src:  'blinker_pressed.png'
    },
    morse:          {
        normal_src: 'morse.png',
        press_src:  'morse_pressed.png'
    },
    flashlightSrc(state) {
        return state ? BUTTONS.flashlightOn.normal_src : BUTTONS.flashlightOff.normal_src
    },
    flashlightPressSrc(state) {
        return state ? BUTTONS.flashlightOn.press_src : BUTTONS.flashlightOff.press_src
    },
    startButton(clickCallback) {
        return {
            x:          0,
            y:          DEVICE_INFO.DEVICE_HEIGHT - px(standardBottomButtonSize),
            w:          DEVICE_INFO.DEVICE_WIDTH,
            h:          px(standardBottomButtonSize),
            normal_src: BUTTONS.confirm_button.normal_src,
            press_src:  BUTTONS.confirm_button.press_src,
            click_func: clickCallback
        }
    }
}

export const TOASTS = {
    swipeToSelectColorToast: {
        content: getText(TRANSLATION_KEYS.swipeToSelectColor)
    },
    selectColorToast:        {
        content: getText(TRANSLATION_KEYS.selectColor)
    },
    emptyRecordToast:        {
        content: getText(TRANSLATION_KEYS.morseEmptyRecord)
    }
}
