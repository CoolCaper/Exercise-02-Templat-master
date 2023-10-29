class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png');
        this.load.image('wall', 'wall.png');
        this.load.image('oneway', 'one_way_wall.png');
    }

    create() {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 150
        }
        this.p1score = 0;
        this.p1Percent = 0.0
        this.p1Shots = 0;
        // add background grass
        this.grass = this.add.image(9, 0, 'grass').setOrigin(0, 0);
        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4);
        this.cup.body.setOffset(this.cup.width / 4);
        this.cup.body.setImmovable(true);
        //ball        
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball') 
        this.ball.body.setCircle(this.ball.width / 2);
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(.5);
        this.ball.body.setDamping(true).setDrag(0.5)
        this.SHOT_VELOCITY_X_MIN = 100
        this.SHOT_VELOCITY_X_MAX = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
        this.ball.hole = false;
        
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        wallA.setX(Phaser.Math.Between(0 - wallA.width / 2, width - wallA.width / 2))
        wallA.body.setImmovable(true);

        
        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width, width - wallB.width /2));
        wallB.body.setImmovable(true);
        
        this.walls = this.add.group([wallA, wallB])
        
        this.ball.body.setCollideWorldBounds(true)
        //one way
        this.oneWay = this.physics.add.sprite(0, height / 4 * 3, 'oneway');
        
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width - this.oneWay.width/2))
        this.oneWay.body.setImmovable(true);
        
        this.oneWay.body.checkCollision.down = false;
        this.input.on('pointerdown', (pointer) => {
          
            let shotDirection
            pointer.y <= this.ball.y ? shotDirection = 1 : shotDirection = -1
            let shotDirectionX            
            pointer.x <= this.ball.x ? shotDirectionX = 1 : shotDirectionX = -1
            this.ball.body.setVelocityX(Phaser.Math.Between(this.SHOT_VELOCITY_X_MIN, this.SHOT_VELOCITY_X_MAX) * shotDirectionX)            
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection)
            this.p1Shots++
            this.p1Percent = ((this.p1score / this.p1Shots) * 100).toString();
            let arr = this.p1Percent.split('.');
            this.shots.text = 'Shots: ' + this.p1Shots
            this.scorePercent.text = 'Hit: ' + arr[0] + '%';
        });

        
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            this.ball.body.setVelocityX(0);
            this.ball.body.setVelocityY(0);
            this.ball.x = width / 2
            this.ball.y = (height - height / 10)
            this.p1score++;
            this.scoreLeft.text = 'Score: ' + this.p1score;
            this.p1Percent = ((this.p1score / this.p1Shots) * 100).toString();
            let arr = this.p1Percent.split('.');
            this.scorePercent.text = 'Hit: ' + arr[0] + '%';
        })
        
        this.physics.add.collider(this.ball, this.walls)
        this.physics.add.collider(this.ball, this.oneWay)
        
        this.scoreLeft = this.add.text(width / 10, (height / 11), 'Score: ' + this.p1score, scoreConfig);
        this.scorePercent = this.add.text(width / 10, (height / 7), 'Hit: ' + this.p1Percent + '%', scoreConfig);
        this.shots = this.add.text(width / 10, height / 25, 'Shots: ' + this.p1Shots, scoreConfig);
    }

    update() {
        //if hole in reset 
        //counters
    }
}