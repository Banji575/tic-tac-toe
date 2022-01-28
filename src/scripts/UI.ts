import MainScene from "./scenes/mainScene"

export class UI {
  text: Phaser.GameObjects.Text
  button: Phaser.GameObjects.Sprite
  constructor(public scene: MainScene) {
    this.init()
  }

  private init() {
    const width = Number(this.scene.game.config.width)

    this.text = this.scene.add.text(width / 2, 0, 'hello world', { font: '32px Arial' })
    this.text.setFill('0x0ff000')

    this.button = this.scene.add.sprite(width/2, 0 + this.text.height, 'restart').setOrigin(0).setInteractive().setVisible(false).setDepth(30)
    this.button.on('pointerdown', this.onClick,this)


  }

  private onClick(){
      this.scene.restart()
      this.button.setVisible(false)

  }
  public renderText(text: string) {
    this.text.text = text
  }

  public showRestartButton(){
      this.button.setVisible(true)
    
  }
}
