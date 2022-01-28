import { Field } from '../field/Field'
import { PoolObject } from '../PoolObject/PoolObject'
import { Bot } from '../Bot/Bot'
import { AI } from '../Bot/AI'

export enum CurrentTurn {
  player,
  enemy,
}
export default class MainScene extends Phaser.Scene {
  public currentTurn: CurrentTurn
  bot: Bot
  isStopGame:boolean = false

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.currentTurn = CurrentTurn.player

    const poolObject = new PoolObject(this)
    const field: Field = new Field(this, 50, 50, { x: 300, y: 300 }, poolObject)

    field.createField(5, 5)
    const ai = new AI()
    this.bot = new Bot(this, field, ai)
  }

  changeTurn() {
    if (this.currentTurn === CurrentTurn.player) {
      this.currentTurn = CurrentTurn.enemy
      this.bot.turn()
    } else {
      this.currentTurn = CurrentTurn.player
    }
  }

  victory(actor:CurrentTurn){
   //this.currentTurn = CurrentTurn.none
    console.log('victory main', actor)
    this.isStopGame = true
  }

  update() {}
}
