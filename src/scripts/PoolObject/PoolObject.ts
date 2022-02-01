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
    // this.createPool('o', this.poolX)
    // this.createPool('x', this.poolO)
    this.createPool('OAnim', this.poolX )
    this.createPool('XAnim', this.poolO)
  }

  private createPool(texture: string, pool: Phaser.GameObjects.Sprite[], count = 60) {
    for (let i = 0; i < count; i++) {
      const obj = this.scene.add.sprite(-100, -100, texture,8).setDepth(20).setScale(0.8)
      if(texture === 'OAnim'){
        obj.setTint(0xF148FC)
      }else{
        obj.setTint(0x00feca)
      }
      console.log(obj)
      pool.push(obj)
    }

    const framesO = this.scene.anims.generateFrameNumbers('OAnim', {
      frames: new Array(21).fill('').map((el, i) => i + 1)
  })
    const framesX = this.scene.anims.generateFrameNumbers('XAnim', {
      frames: new Array(25).fill('').map((el, i) => i + 1)
  })
  this.scene.anims.create({
    key: 'Oa',
    frames: framesO,
    frameRate: 24,
    repeat: 0
})
  this.scene.anims.create({
    key: 'Xa',
    frames: framesX,
    frameRate: 24,
    repeat: 0
})
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
