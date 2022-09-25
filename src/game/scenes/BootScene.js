import { Scene } from 'phaser'
import bg from '@/game/assets/img/bg.png'
import pacman from '@/game/assets/img/pacman.png'
import ruby from '@/game/assets/img/ruby.png'
import thudMp3 from '@/game/assets/sounds/thud.mp3'
import thudOgg from '@/game/assets/sounds/thud.ogg'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('bg', bg)
    this.load.image('pacman', pacman)
    this.load.image('ruby', ruby)
    this.load.audio('thud', [thudMp3, thudOgg])
  }

  create () {
    this.scene.start('PlayScene')
  }
}
