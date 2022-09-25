import { Scene } from 'phaser';

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })
    this.objects = {};
    this.controls = {};
    this.score = 0;
  }

  create() {
    this.add.image(400, 300, 'bg')

    this.addPacman()
    this.addRuby()
    this.addScores()

    this.physics.add.overlap(this.objects.ruby, this.objects.pacman, this.onObjectsOverlap, null, this)
    this.sound.add('thud')
    this.initControls()
  }

  onObjectsOverlap() {
    const {x, y} = this.getRandCoordinates();
    this.objects.ruby.x = x;
    this.objects.ruby.y = y;
    this.score++;
    this.objects.score.text = `score: ${this.score}`;
    this.tweens.add({
      targets: this.objects.pacman,
      duration: 100,
      angle: -180,
      ease: 'Power2',
      yoyo: true
    })
    this.sound.play('thud', { volume: 0.75 })
  }

  initControls() {
    this.controls.arrows = this.input.keyboard.createCursorKeys();
  }

  addRuby() {
    const {x, y} = this.getRandCoordinates();
    this.objects.ruby = this.physics.add.image(x, y,'ruby').setDisplaySize(30, 30)
  }

  addPacman() {
    this.objects.pacman = this.physics.add.image(400, 200, 'pacman').setDisplaySize(50, 50)
    this.objects.pacman.setCollideWorldBounds(true)
    this.objects.pacman.body.onWorldBounds = true
    this.objects.pacman.setBounce(1)
    this.objects.pacman.lastCoordinates = {
      x: this.objects.pacman.x,
      y: this.objects.pacman.y,
    };
  }

  addScores() {
    this.objects.score = this.add.text(20, 20, `score: ${this.score}`, {
      font: '20px Arial',
      fill: '#fff'
    })
  }

  getRandCoordinates() {
    return {
      x: Phaser.Math.Between(100, 700),
      y: Phaser.Math.Between(100, 500)
    }
  }

  update() {
    if (this.controls.arrows.right.isDown) {
      this.objects.pacman.x += 3
    }
    if (this.controls.arrows.left.isDown) {
      this.objects.pacman.x -= 3
    }
    if (this.controls.arrows.up.isDown) {
      this.objects.pacman.y -= 3
    }
    if (this.controls.arrows.down.isDown) {
      this.objects.pacman.y += 3
    }
  }
}
