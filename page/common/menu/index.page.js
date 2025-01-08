// import {calculatePosition, CONTROLS, FLASHLIGHT, toBrightnessPercentage, VIEW_CONTAINERS} from 'zosLoader:./index.page.[pf].layout.js';
import {} from './index.page.layout.js';
import {logger} from '../../../utils';
import {createWidget, event, prop, widget} from '@zos/ui'
import {COLORS, DEVICE_INFO} from '../layout/common.layout';

// export const URL = 'common/menu/index.page'

Page({
    build() {
        logger.debug('page build invoked');
        createWidget(widget.TEXT, {
            x:         DEVICE_INFO.DEVICE_WIDTH / 2,
            y:         DEVICE_INFO.DEVICE_WIDTH / 2,
            w:         100,
            h:         20,
            color:     COLORS.TEXT.SUBTITLE,
            text_size: 14,
            text:      'MENU'
        });
    }
});
