import { Field } from '../field/Field'
import { Square } from '../field/Square'
import { CurrentTurn } from '../scenes/mainScene'
import { Utils } from '../Utils'

interface behavior {
  list: Square[]
}

interface numberBehavior {
  gameObjects: Square[]
}

interface IBehaviorTree {
  [key: number]: behavior['list']
}

export class AI {
  currentBehaviorTree: IBehaviorTree
  isStep: boolean

  constructor() {
    this.resetParams()
  }

  resetParams() {
    this.currentBehaviorTree = {
      1: [],
      2: [],
      3: []
    }
    this.isStep = false
  }

  dicision(): Square | null {
    let square: Square | null = null
    Object.keys(this.currentBehaviorTree).forEach(key => {
      if (this.currentBehaviorTree[key].length === 0 || this.isStep) return
      this.currentBehaviorTree[key].forEach((sq: Square) => {
        if (this.isStep) return
        square = sq
        this.isStep = true
      })
    })
    console.log(this.currentBehaviorTree)
    return square
  }

  fieldAnalys(field: Square[][]) {
    for (let i = 0; i < field.length; i++) {
      this.lineAnalys(field[i])
    }
    this.createVerticalLine(field)
    const result = this.dicision()
    this.resetParams()
    return result
  }

  lineAnalys(line: Square[], isAddRansomSq: boolean = true) {
    let countFill: number = 0
    let emptySq: Square[] = []

    line.forEach((sq: Square) => {
      if (sq.isClick && sq.typeChecked === CurrentTurn.player) {
        countFill++
      } else if (!sq.isClick) {
        emptySq.push(sq)
        if (isAddRansomSq) {
          this.currentBehaviorTree[3].push(sq)
        }
      }
    })

    if (countFill >= line.length - 1 && (emptySq.length > 0)) {
      this.currentBehaviorTree[1].push(emptySq[0])
    }
    Utils.randomizerArr(this.currentBehaviorTree[3])
  }
  createVerticalLine(field: Square[][]) {
    for (let i = 0; i < field.length; i++) {
      const line: Square[] = []
      for (let j = 0; j < field.length; j++) {
        line.push(field[j][i])
      }
      this.lineAnalys(line, false)
    }
  }
}
