import { setStatusBarVisible } from '@zos/ui'

App({
  globalData: {},
  onCreate(options) {
    setStatusBarVisible(false)
    console.log("app on create invoke");
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
  },
});
