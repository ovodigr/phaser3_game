import constant from '../constant.js'

import { createAnimation } from '../utils/common.js'
// import { callTimer } from '../utils/common.js'

export default class Tutorial extends Phaser.Scene {

    constructor() {
        super("Tutorial");
    }


    init(data) {
        this.data = data;
    }


    preload() {
        // Images
        this.load.image("girlStart", "assets/images/girl_default.png");
        this.load.image("overlayStart", "assets/images/overlayStart.png");
        this.load.image("cloths1_1", "assets/images/cloths1_1.png");
        this.load.image("cloths1_2", "assets/images/cloths1_2.png");

        this.load.image("hand", "assets/images/hand.png");

        // this.load.spritesheet('girl_surprized', 'assets/images/girl_surprized_animation.png', { frameWidth: 1204, frameHeight: 2736 });
        // this.load.spritesheet('girl_joi', 'assets/images/girl_joi_animation.png', { frameWidth: 1204, frameHeight: 2736 });


        this.load.html('chooseBlockLeft', 'components/chooseBlock/chooseBlockLeft.html', 512, 512);
        this.load.html('chooseBlockRight', 'components/chooseBlock/chooseBlockRight.html', 512, 512);

        this.load.html('chooseTextThing', 'components/chooseTextThing/chooseTextThing.html', 512, 512);

        // this.load.html('textBlockTwo', 'components/textBlock/textBlockTwo.html', 512, 512);

        this.load.css('cssChooseBlock', 'components/chooseBlock/style.css');

        this.load.css('cssChooseTextThing', 'components/chooseTextThing/style.css');

        // thisload.audio('sfx', ['assets/audio/SoundEffects/squit.mp3', 'assets/audio/SoundEffects/squit.ogg']);

        this.createAnimation = createAnimation.bind(this);

        // this.callTimer = callTimer.bind(this);


    }


    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const screenCenterX = this.cameras.main.worldView.x + width / 2;
        const screenCenterY = this.cameras.main.worldView.y + height / 2;
        let block_leftX;
        let block_leftY = screenCenterY * 1.2;
        let block_rightX;
        let block_rightY = screenCenterY * 1.2;
        let scaleClothes = 0.8;
        let scaleHand = 0.5;

        this.addOverLay('overlayStart', screenCenterX, screenCenterY);
        let girl = this.addImageInCenter('girlStart', screenCenterX, screenCenterY);

        //scale
        {
            if ((constant.cloths.one + constant.cloths.two) * scaleClothes >= width) {
                // scale
                scaleClothes = width / (constant.cloths.one + constant.cloths.two) * scaleClothes;

                // console.log('scale', scaleClothes);
            }
            else
                if ((constant.cloths.one + constant.cloths.two) * scaleClothes > width / 2) {
                    //set 1/3
                    // console.log('set 1/3', scaleClothes);
                }
                else {
                    // set close girl, spase between one img and maybe scale
                    scaleClothes = scaleClothes * 1.2;

                    // console.log('set close girl', scaleClothes);
                }
        }

        let spase = width - (constant.cloths.one + constant.cloths.two);// * scaleClothes;
        block_leftX = spase / 3;
        block_rightX = spase * 2 / 3 + constant.cloths.one;//* scaleClothes;

        this.add.dom(block_leftX, block_leftY)
            .createFromCache('chooseBlockLeft')
            .setOrigin(0)
            .setScale(scaleClothes)
            .setInteractive()
            .on('pointerup', () => this.scene.start("Game", {
                "scena": 3,
                "select": 1,

                'delayHandTime': 2000,

                "clothesImgLeft": "assets/images/cloths1_1.png",
                "clothesImgRight": "assets/images/cloths1_2.png",

                "room": "assets/images/room.png",

                "hand": "assets/images/hand.png",

                "girl": "assets/images/girl_default.png",
                "chooseBlockLeft": "components/chooseBlock/chooseBlockLeft.html",
                "chooseBlockRight": "components/chooseBlock/chooseBlockRight.html",
                "chooseTextThing": "components/chooseTextThing/chooseTextThing.html",
                "cssChooseBlock": "components/chooseBlock/style.css",
                "cssChooseTextThing": "components/chooseTextThing/style.css",
                "thingBlockText": "Choose your bag"
            }));

        document.querySelector('.chooseBlockImgLeft').src = 'assets/images/cloths1_1.png';


        this.add.dom(block_rightX, block_rightY)
            .createFromCache('chooseBlockRight')
            .setOrigin(0)
            .setScale(scaleClothes)
            .setInteractive()
            .on('pointerup', () => this.scene.start("Game", {
                "scena": 3,
                "select": 2,
            }));

        document.querySelector('.chooseBlockImgRight').src = 'assets/images/cloths1_2.png';


        let chooseTextThing = this.add.dom(screenCenterX, 30)
            .createFromCache('chooseTextThing')
            .setOrigin(0.5);

        document.querySelector('.textThing').innerHTML = 'Choose your dress';

        var image = this.add.image(block_leftX + constant.cloths.one / 2, block_leftY + constant.cloths.one * 2, 'hand')
            .setScale(scaleHand)

        var tween = this.tweens.add({
            targets: image,
            x: block_rightX + constant.cloths.two / 2,
            // ease: 'Power1',
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });
    }



    initStartValues() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const screenCenterX = this.cameras.main.worldView.x + width / 2;
        const screenCenterY = this.cameras.main.worldView.y + height / 2;


        let block_leftX;
        let block_leftY = screenCenterY * 1.2;

        let block_rightX;
        let block_rightY = screenCenterY * 1.2;
    }

    addImg(imgName, displayWidth, displayHeight) {

        this.add.sprite(displayWidth, displayHeight, imgName);
    }

    addOverLay(imgName, screenCenterX, screenCenterY) {
        let img = this.add.sprite(screenCenterX, screenCenterY, imgName)
        // .setScale(2)
    }

    addImageInCenter(imgName, displayWidth, displayHeight) {

        let img = this.add.sprite(displayWidth, displayHeight, imgName)
            .setScale(constant.girl.scale)
            .setOrigin(constant.girl.OriginX, constant.girl.OriginY);
    }

    animeGirl(name, screenCenterX, screenCenterY) {

        this.girl = this.add.sprite(screenCenterX, screenCenterY, name)
            .setScale(constant.girl.scale)
            .setOrigin(constant.girl.OriginX, constant.girl.OriginY);

        this.girl.anims.play(name);

    }

    showSurprise(screenCenterX, screenCenterY) {

        let textBlockOne = this.add.dom(screenCenterX, screenCenterY).createFromCache('textBlockOne');
        this.animeGirl('girl_surprized_anim', screenCenterX, screenCenterY);
    }

    showJoi(screenCenterX, screenCenterY) {

        let textBlockOne = this.add.dom(screenCenterX, screenCenterY).createFromCache('textBlockTwo');
        this.animeGirl('girl_joi_anim', screenCenterX, screenCenterY);
    }

}