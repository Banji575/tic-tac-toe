import { CurrentTurn } from '../scenes/mainScene'

export enum typeSpriteCheck {
  x,
  o
}

export class PoolObject {
  poolX: Phaser.GameObjects.Sprite[] = []
  poolO: Phaser.GameObjects.Sprite[] = []

  constructor(public scene: Phaser.Scene) {
    this.init()
  }

  private init() {
    this.createPool('o', this.poolX)
    this.createPool('x', this.poolO)
  }

  private createPool(texture: string, pool: Phaser.GameObjects.Sprite[], count = 30) {
    for (let i = 0; i < count; i++) {
      const obj = this.scene.add.sprite(-100, -100, texture).setDepth(20).setScale(0.2)
      pool.push(obj)
    }
    return this[texture]
  }

  public getObject(type: CurrentTurn): Phaser.GameObjects.Sprite {
    let objArr: Phaser.GameObjects.Sprite[]

    if (type === CurrentTurn.player) {
      objArr = this.poolO
    } else {
      objArr = this.poolX
    }

    const obj: Phaser.GameObjects.Sprite = objArr.splice(0, 1)[0]
    objArr.push(obj)

    return obj
  }
}
