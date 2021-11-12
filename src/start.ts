import {
  NOT_BOOTSTRAP,
  NOT_MOUNT,
  NOT_UNMOUNT,
  UNMOUNT,
} from './helpers'
import {
  settingCanvas,
  renderCanvas,
  destroyCanvas
} from './core'

export function start(vm) {
  switch (vm.posterStatus) {
    case NOT_BOOTSTRAP:
    case UNMOUNT:
      settingCanvas(vm)
      break
    case NOT_MOUNT:
      renderCanvas(vm)
      break
    case NOT_UNMOUNT:
      destroyCanvas(vm)
      break
    default:
      Error('corejs: posterStatus try')
  }
}
