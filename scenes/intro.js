import constant from '../constant.js'

import {
    showIntoSurprise,
    showIntoJoi,
    addImg,
    addOverLay,
    addImageInCenter,
    animeGirl,
    createAnimation,
    callTimer,
    checkOrientationDisplay
} from '../utils/common.js'

export default class Intro extends Phaser.Scene {

    constructor() {
        super("Intro");
    }
    preload() {

        // Images
        this.load.image("girlStart", "assets/images/girl_default.png");
        this.load.image("overlayStart", "assets/images/overlayStart.png");
        this.load.image("textBox", "assets/images/textBox.png");

        this.load.spritesheet('girl_surprized', 'assets/images/girl_surprized_animation.png', { frameWidth: 1204, frameHeight: 2736 });
        this.load.spritesheet('girl_joi', 'assets/images/girl_joi_animation.png', { frameWidth: 1204, frameHeight: 2736 });

        this.load.html('textBlock', 'components/textBlock/textBlock.html', 512, 512);

        this.load.css('cssTextBlock', 'components/textBlock/style.css');

        this.bind();
    }

    create() {

        this.orientationDisplay = this.checkOrientationDisplay();

        let posX, posY;

        if (this.orientationDisplay == 'landscape') {

            posX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            posY = this.cameras.main.worldView.y + this.cameras.main.height / 3;

        }
        else {
            posX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            posY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        }

        // createAnimation(key, texture, start, end, frameRate, repeat)
        this.createAnimation('girl_surprized_anim', 'girl_surprized', 0, 2, 2, 1);
        this.createAnimation('girl_joi_anim', 'girl_joi', 0, 2, 2, 1);

        this.addOverLay('overlayStart', posX, posY);

        let girl = this.addImageInCenter('girlStart', posX, posY);

        let textBlock = this.add.dom(posX, posY)
            .createFromCache('textBlock');

        if (this.orientationDisplay == 'landscape') {
            document.querySelector('.wrap1').style.height = '250px';

        }

        // if (posY < 800 && posX < 380)
        //     document.querySelector('.wrap1').style.height = '40vh';

        this.callTimer(0, () => this.showIntoSurprise(posX, posY, constant[this.orientationDisplay].intro.text1), false);

        this.callTimer(2000, () => this.showIntoJoi(posX, posY, constant[this.orientationDisplay].intro.text2), false);

        this.callTimer(3000, () => this.scene.start("Game", {
            "scena": 1,
            "select": 1,
            "numberDressPicked": 1,
            "things": [],
        }), false);
    }

    bind() {
        this.createAnimation = createAnimation.bind(this);
        this.addImg = addImg.bind(this);
        this.addOverLay = addOverLay.bind(this);
        this.addImageInCenter = addImageInCenter.bind(this);
        this.animeGirl = animeGirl.bind(this);
        this.showIntoSurprise = showIntoSurprise.bind(this);
        this.showIntoJoi = showIntoJoi.bind(this);
        this.callTimer = callTimer.bind(this);
        this.checkOrientationDisplay = checkOrientationDisplay.bind(this);

    }
}