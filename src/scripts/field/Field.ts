import { Scene } from 'phaser'
import { PoolObject, typeSpriteCheck } from '../PoolObject/PoolObject'
import MainScene, { CurrentTurn } from '../scenes/mainScene'
import { Square } from './Square'

export interface Coord {
  x: integer
  y: integer
}

interface square {
  coord: Coord
  isClick: boolean
}

export class Field {
  paddingV: integer
  paddingH: integer

  arrayField: Array<Square[]> = []

  constructor(
    public scene: MainScene,
    cols: integer,
    rows: integer,
    public startPos: Coord,
    public poolObj: PoolObject
  ) {
    this.paddingH = 60
    this.paddingV = 60
  }

  createField(cols, rows) {
    for (let i = 0; i < rows; i++) {
      this.arrayField.push([])
      for (let j = 0; j < cols; j++) {
        const squareGO = this.scene.add.sprite(
          this.startPos.x + j * this.paddingH,
          this.startPos.y + i * this.paddingV,
          'square'
        )
        const square = new Square(squareGO, { x: squareGO.x, y: squareGO.y }, false, this)
        this.arrayField[i].push(square)
      }
    }
    console.log(this.arrayField)
  }

  private clearField(isOnlyTest = true) {
    if (isOnlyTest) {
      this.arrayField.forEach((el: Square[]) => {
        el.forEach((sq: Square) => {
          sq.resetTint()
        })
      })
    }
  }

  public getField(): Square[][] {
    return this.arrayField
  }

  public checkSquare(this): Phaser.GameObjects.Sprite {
    const sprite: Phaser.GameObjects.Sprite = this.poolObj.getObject(this.scene.currentTurn)
    return sprite
  }

  public endTurn() {
    this.clearField()
    this.scene.changeTurn()
    // setTimeout(() => {
    //   this.scene.changeTurn()
    // }, 1000)
  }
}
