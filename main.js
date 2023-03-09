
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y:450},
            debug: true
        }
    },
    scene: [ Particles ]
}
const particles = new Phaser.Game(config)
