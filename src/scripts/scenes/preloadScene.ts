export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('square', 'assets/img/squareNew.png')
    this.load.image('x', 'assets/img/x.png')
    this.load.image('o', 'assets/img/o.png')
    this.load.image('restart', 'assets/img/restartNew.png')
    this.load.spritesheet('OAnim', 'assets/img/X/O.png', {frameWidth:64, frameHeight:64})
    this.load.spritesheet('XAnim', 'assets/img/X/X.png',{frameWidth:64, frameHeight:64}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     )
  }

  create() {
    this.scene.start('MainScene')

  }
}
