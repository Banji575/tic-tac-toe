import { CurrentTurn } from '../scenes/mainScene'
import { Coord, Field } from './Field'

export class Square {
    typeChecked: CurrentTurn

  constructor(
    public gameObject: Phaser.GameObjects.Sprite,
    public coord: Coord,
    public isClick = false,
    public field: Field
  ) {
    this.init()
  }

  private init() {
    this.gameObject.setInteractive()
    this.gameObject.on('pointerdown', () => this.click())
  }

  public click(whoCheck:CurrentTurn = CurrentTurn.player) {
    if (this.isClick || this.field.tryOnClick(whoCheck) ) return

    const a = this.field.checkSquare()
    a.x = this.gameObject.x
    a.y = this.gameObject.y
    this.isClick = true
    this.typeChecked = whoCheck
    this.field.endTurn()
  }

  public testFillColor() {
    //const {x, y, width, height} = this.gameObject;
    this.gameObject.setTint(0xff00ff)
  }

  public resetTint() {
    setTimeout(() => {
      this.gameObject.setTint(0xffffff)
    }, 1000);
    
  }
}
