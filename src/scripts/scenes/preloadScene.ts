export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('square', 'assets/img/square.png')
    this.load.image('x', 'assets/img/x.png')
    this.load.image('o', 'assets/img/o.png')
    this.load.image('restart', 'assets/img/restart.png')
  }

  create() {
    this.scene.start('MainScene')

  }
}
