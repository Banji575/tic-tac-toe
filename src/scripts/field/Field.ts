import { PoolObject } from '../PoolObject/PoolObject'
import MainScene, { CurrentTurn } from '../scenes/mainScene'
import { Square } from './Square'

export interface Coord {
  x: integer
  y: integer
}

export class Field {
  paddingV: integer
  paddingH: integer
  countField: number = 0
  countCheckField: number = 0
  arrayField: Array<Square[]> = []
  countExtends: number = 2
  currentExtends: number = 0


  constructor(
    public scene: MainScene,
    cols: integer,
    rows: integer,
    public startPos: Coord,
    public poolObj: PoolObject
  ) {
    this.paddingH = 64
    this.paddingV = 64
  }

  public tryOnClick(target: CurrentTurn): boolean {
    let res = false
    res = this.scene.isStopGame
    res = this.scene.currentTurn !== target
    return res
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
        squareGO.setAlpha(0.4)
        const square = new Square(squareGO, { x: squareGO.x, y: squareGO.y }, false, this)
        this.arrayField[i].push(square)
      }
    }
    this.countField = cols * rows
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
    // sprite.play('Xa')
    if(this.scene.currentTurn === CurrentTurn.enemy){
        sprite.play('Xa')
    }else{
      sprite.play('Oa')
    }
    
    this.countCheckField++
    return sprite
  }

  private calculateFillField() {
    const ratio = (this.countCheckField / this.countField) * 100
    if (ratio > 70) {
      this.expasionField()
    }
  }

  private expasionField() {
    if (this.scene.currentTurn === CurrentTurn.enemy) return
    if (this.currentExtends === this.countExtends) return
    const lineH: Square[] = []
    for (let i = 0; i < this.arrayField.length; i++) {
      const elem: Phaser.GameObjects.Sprite = this.arrayField[0][i].gameObject

      const square = this.scene.add.sprite(0, 0, 'square').setInteractive().setAlpha(0.4)

      const x = elem.x
      const y = elem.y - elem.height
      square.x = x
      square.y = y
      const sq = new Square(square, { x, y }, false, this)
      lineH.push(sq)
      this.countField++
    }
    this.arrayField.unshift(lineH)
    for (let i = 0; i < this.arrayField.length; i++) {
      const elem: Phaser.GameObjects.Sprite = this.arrayField[i][this.arrayField[i].length - 1].gameObject
      const square = this.scene.add.sprite(0, 0, 'square').setInteractive().setAlpha(0.4)
      const x = elem.x + elem.width
      const y = elem.y
      square.x = x
      square.y = y
      const sq = new Square(square, { x, y }, false, this)
      this.arrayField[i].push(sq)
      this.countField++
    }
    this.currentExtends++
  }

  private checkEndGame() {
    let verLineP: number = 0
    let horLineP: number = 0
    let verLineE: number = 0
    let horLineE: number = 0
    for (let i = 0; i < this.arrayField.length; i++) {
      for (let j = 0; j < this.arrayField.length; j++) {
        if (this.arrayField[i][j].isClick && this.arrayField[i][j].typeChecked === CurrentTurn.enemy) {
          horLineE++
        }
        if (this.arrayField[j][i].isClick && this.arrayField[j][i].typeChecked === CurrentTurn.enemy) {
          verLineE++
        }
        if (this.arrayField[i][j].isClick && this.arrayField[i][j].typeChecked === CurrentTurn.player) {
          horLineP++
        }
        if (this.arrayField[j][i].isClick && this.arrayField[j][i].typeChecked === CurrentTurn.player) {
          verLineP++
        }
      }
      if (horLineE === this.arrayField.length) {
        for (let t = 0; t < this.arrayField.length; t++) {
          this.arrayField[i][t].testFillColor()
        }
        this.scene.victory()
        return
      }
      if (verLineE === this.arrayField.length) {
        for (let t = 0; t < this.arrayField.length; t++) {
          this.arrayField[t][i].testFillColor()
        }
        this.scene.victory()
        return
      }
      if (horLineP === this.arrayField.length) {
        for (let t = 0; t < this.arrayField.length; t++) {
          this.arrayField[i][t].testFillColor()
          this.scene.victory()
          return
        }
      }
      if (verLineP === this.arrayField.length) {
        for (let t = 0; t < this.arrayField.length; t++) {
          this.arrayField[t][i].testFillColor()
          this.scene.victory()
          return
        }
      }
      horLineE = 0
      verLineE = 0
      horLineP = 0
      verLineP = 0
    }
    if(this.countField === this.countCheckField){
      this.scene.currentTurn = CurrentTurn.none
      this.scene.victory()
    }

  }

  public endTurn() {
    this.checkEndGame()
    this.clearField()
    this.calculateFillField()

    this.scene.changeTurn()
  }
}
