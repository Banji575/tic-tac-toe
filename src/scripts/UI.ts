import MainScene from "./scenes/mainScene"

export class UI {
  text: Phaser.GameObjects.Text
  button: Phaser.GameObjects.Sprite
  uiRect:Phaser.GameObjects.Graphics

  constructor(public scene: MainScene) {
    this.init()
  }

  private init() {
    const width = Number(this.scene.game.config.width)

    this.text = this.scene.add.text(width / 2, 0, 'hello world', { font: '32px Arial' })
    this.text.setTintFill(0xffd300).setOrigin(0.5,-0.5)

    this.button = this.scene.add.sprite(width/2, 0 + this.text.height, 'restart').setOrigin(0).setInteractive().setVisible(false).setDepth(30)
    this.button.on('pointerdown', this.onClick,this)

    this.uiRect = this.scene.add.graphics().setDepth(29).setVisible(false);
    this.uiRect.fillStyle(0x042A3D,1);
    this.uiRect.fillRoundedRect(-10, -10, 2000, 2000)
  }

  private onClick(){
      this.scene.restart()
      this.button.setVisible(false)
      this.uiRect.setVisible(false)
  }
  public renderText(text: string) {
    this.text.text = text
  }

  public showRestartButton(){
      this.button.setVisible(true)
      this.uiRect.setVisible(true).setAlpha(0.6)
  }
}
