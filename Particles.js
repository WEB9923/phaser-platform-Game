
class Particles extends Phaser.Scene {
    constructor() {
        super('Particles');
    }
    preload(){
        this.load.image('sky','./images/sky.png');
        this.load.image('ground','./images/platform.png');
        this.load.image('star','./images/star.png');
        this.load.image('bomb','./images/bomb.png');

        this.load.spritesheet('dude','./images/dude.png', {
           frameWidth:32,
           frameHeight:48
        });
    }
    create(){
        this.add.image(400,400,'sky');
        /// platforms
        const platforms = this.physics.add.staticGroup();
        platforms.create(400,568,'ground').setScale(2).refreshBody();
        platforms.create(600,400,'ground');
        platforms.create(50,250,'ground');
        platforms.create(740,220,'ground');

        this.player = this.physics.add.sprite(100,400,'dude');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        //animation
        this.anims.create({
            key:'turn',
            frames:[{key:'dude',frame:4}],
            frameRate:20
        });
        this.anims.create({
           key:'right',
           frames: this.anims.generateFrameNumbers('dude',{start:5,end:8}),
            frameRate:10,
            repeat: -1
        });
        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
            frameRate:10,
            repeat: -1
        });

        //stars
        const stars = this.physics.add.group({
           key:'star',
           repeat:13,
           setXY:{x:12,y:0,stepX:70}
        });
        stars.children.iterate(function(child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.30));
        });
        this.physics.add.collider(stars,platforms);
        this.physics.add.overlap(this.player, stars, collect, null, this);
        /// bombs
        const bomb = this.physics.add.group();
        this.physics.add.collider(bomb, platforms);

        this.physics.add.collider(this.player,bomb, bombTouched, null, this);
        //bomb collision
        function bombTouched(player, bomb){
            this.physics.pause();
            this.player.setTint(0xff000);
            this.player.anims.play('turn')
        }
        /// score text
        const scoreText = this.add.text(20,20,'score:0',{
           fontSize:'35px',
           fill:'#cccccc'
        });
        let score = 0;
        //stars colision
        function collect(players, star){
            star.disableBody(true, true);
            score += 1;
            scoreText.setText('score:' + score)
        }
    }
    update(){
        const cursors = this.input.keyboard.createCursorKeys();
        if(cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('left',true);
        } else if(cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right',true);
        } else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if(cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-400);
        }
    }
}