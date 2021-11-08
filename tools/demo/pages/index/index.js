import '../../components/index'


Page({
  onLoad() {
    this.onStart()
  },
  onShow() {
    // this.onStart()
  },
  onMount(val) {
    console.log('page onMount', val)
  },
  onUnmount() {
    console.log('page onUnmount')
  },
  onBut() {
    this.onStart()
    console.log('page onBut')
  }
})
