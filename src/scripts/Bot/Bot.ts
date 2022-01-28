import { Field } from '../field/Field'
import { Square } from '../field/Square'
import MainScene, { CurrentTurn } from '../scenes/mainScene'
import { AI } from './AI'

export class Bot {
  constructor(public scene: MainScene, public field: Field, public ai: AI) {}

  public turn() {
    this.checkEmptySquare()
    //Класс AI принимает двумерный массив поля, и возвращает оптимальную для хода клетку

    const result = this.ai.fieldAnalys(this.field.getField())
    result?.click(CurrentTurn.enemy)
  }

  checkEmptySquare() {
    const field = this.field.getField()
    field.forEach((elem: Square[]) => {
      elem.forEach((square: Square) => {
        if (!square.isClick) {
        }
      })
    })
  }
}
