import { Field } from '../field/Field'
import { PoolObject } from '../PoolObject/PoolObject'
import { Bot } from '../Bot/Bot'
import { AI } from '../Bot/AI'
import { UI } from '../UI'

export enum CurrentTurn {
  player,
  enemy,
  none
}
export default class MainScene extends Phaser.Scene {
  public currentTurn: CurrentTurn
  bot: Bot
  isStopGame: boolean = false
  ui: UI

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.currentTurn = CurrentTurn.player
    this.ui = new UI(this)
    const poolObject = new PoolObject(this)
    const field: Field = new Field(this, 50, 50, { x:360-((64*5)/2-32) , y: Number(this.game.config.height/2) - (((64*5)/2-32))   }, poolObject)

    field.createField(5, 5)
    const ai = new AI()
    this.bot = new Bot(this, field, ai)
    this.ui.renderText('turn ' + CurrentTurn[this.currentTurn].toString())
  }

  changeTurn() {
    if (this.isStopGame) return

    if (this.currentTurn === CurrentTurn.player) {
      this.currentTurn = CurrentTurn.enemy
      this.bot.turn()
    } else {
      this.currentTurn = CurrentTurn.player
    }
    this.ui.renderText('turn ' + CurrentTurn[this.currentTurn].toString())
  }

  victory() {
    //this.currentTurn = CurrentTurn.none
    this.isStopGame = true
    this.ui.renderText(CurrentTurn[this.currentTurn].toString() + ' victory')
    this.ui.showRestartButton()
  }
  restart() {
    this.scene.restart()
    this.isStopGame = false
  }
  update() {}
}
