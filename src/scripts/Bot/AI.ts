import { Square } from '../field/Square'
import { CurrentTurn } from '../scenes/mainScene'
import { Utils } from '../Utils'

interface behavior {
  list: Square[]
}

interface aiResult{
  sq:Square | null,
  isVictory:boolean
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
      3: [],
      4: []
    }
    this.isStep = false
  }

  dicision(): Square | null {
    let square: Square | null = null
    let isVictory = false;
    Object.keys(this.currentBehaviorTree).forEach(key => {
      if (this.currentBehaviorTree[key].length === 0 || this.isStep) return
      this.currentBehaviorTree[key].forEach((sq: Square) => {
        if (this.isStep) return
        square = sq
        this.isStep = true
      })
    })

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
    let countFillPlayer: number = 0
    let countFillEnemy: number = 0
    let countNextEnmptyEnemySqIndexAfter: number = 0
    let countNextEnmptyEnemySqIndexBefore: number | null = null
    let emptySq: Square[] = []

    line.forEach((sq: Square, i: number) => {
      if (sq.isClick && sq.typeChecked === CurrentTurn.player) {
        countFillPlayer++
      } else if (!sq.isClick) {
        emptySq.push(sq)
        if (isAddRansomSq) {
          this.currentBehaviorTree[4].push(sq)
        }
      } else if (sq.isClick && sq.typeChecked == CurrentTurn.enemy) {
        countFillEnemy++
        if (i !== line.length - 1) {
          countNextEnmptyEnemySqIndexAfter = i + 1
        }

        if (countNextEnmptyEnemySqIndexBefore === null && i !== 0) {
          countNextEnmptyEnemySqIndexBefore = i - 1
        }
      }
    })

    if (countFillEnemy === line.length - 2) {
      line.forEach(el => (!el.isClick ? this.currentBehaviorTree[2].push(el) : null))
    }

    if (countFillEnemy > 0 && countFillPlayer === 0) {
      if (!line[countNextEnmptyEnemySqIndexAfter].isClick) {
        this.currentBehaviorTree[3].push(line[countNextEnmptyEnemySqIndexAfter])
      }
      if (countNextEnmptyEnemySqIndexBefore !== null && !line[countNextEnmptyEnemySqIndexAfter].isClick) {
        this.currentBehaviorTree[3].push(line[countNextEnmptyEnemySqIndexAfter])
      }
    }
    if (countFillPlayer >= line.length - 1 && emptySq.length > 0) {
      this.currentBehaviorTree[1].push(emptySq[0])
    }
    Utils.randomizerArr(this.currentBehaviorTree[4])
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
