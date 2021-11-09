import '../../components/index'


Page({
  onLoad() {
    // console.group('onLoad')
    // this.onStart()
    // console.groupEnd()
  },
  onShow() {
    // console.group('onShow')
    // this.onStart()
    // console.groupEnd()
  },
  onBootstrap: [
    async (vm) => {
      console.log('onBootstrap-1', vm)
    },
    async (vm) => {
      console.log('onBootstrap-2', vm)
    },
    async (vm) => {
      console.log('onBootstrap-3', vm)
    }
  ],
  onMount(val) {
    console.log('page onMount', val)
  },
  onUnmount() {
    console.log('page onUnmount')
  },
  onBut() {
    console.group('onBut')
    this.onStart()
    console.groupEnd()
  }
})
