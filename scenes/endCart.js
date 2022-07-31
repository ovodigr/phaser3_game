import constant from '../constant.js'
import arr from '../env.js'
import { createAnimation, callTimer, addOverLay, addSwipeBlock, addImg, checkOrientationDisplay } from '../utils/common.js'

export default class EndCart extends Phaser.Scene {

    constructor() {
        super("EndCart");
    }

    init(data) {
        this.data = data;
        this.scena = data.scena;
        this.select = data.select;
    }

    preload() {

        let e = arr[this.scena][this.select]

        // remove textures
        this.textures.remove('room');

        // Images
        this.load.image("room", e.room);
        this.load.image("swipe", e.swipe);
        this.load.html('endCartBlock', 'components/endCartBlock/endCartBlock.html', 512, 512);
        this.load.css('cssEndCartBlock', 'components/endCartBlock/style.css');

        this.bind();
    }

    handleStart(event) {

        console.log(event.touches[0].clientX, event.touches[0].clientY);
        this.touchStart = true;

        window.location.href = constant.url;
    }

    handleMove(event) {

        console.log(event.touches[0].clientX, event.touches[0].clientY);
        this.swipeStart = true;

        window.location.href = constant.url;
    }

    create() {

        document.addEventListener("touchstart", this.handleStart, false);

        document.addEventListener("touchmove", this.handleMove, false);

        let e = arr[this.scena][this.select]

        this.arr = arr;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.orientationDisplay = this.checkOrientationDisplay();

        let posX, posY;

        if (this.orientationDisplay == 'landscape') {
            posX = this.cameras.main.width / 2;
            posY = this.cameras.main.height / 3;

        }
        else {
            posX = this.cameras.main.width / 2;
            posY = this.cameras.main.height / 2;
        }

        this.posX = posX;
        this.posY = posY;

        this.addOverLay('room', posX, posY);

        this.swipe = this.addSwipeBlock('swipe', width / 2 + 20, height / 2 + 30, 3)

        this.tween = this.tweens.add({
            targets: this.swipe,
            x: width / 2 - 20,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        this.add.dom(posX, posY * 0.8)
            .createFromCache('endCartBlock')
            .setOrigin(0.5);

    }

    bind() {
        this.createAnimation = createAnimation.bind(this);
        this.addOverLay = addOverLay.bind(this);
        this.callTimer = callTimer.bind(this);
        this.addSwipeBlock = addSwipeBlock.bind(this);
        this.addImg = addImg.bind(this);
        this.checkOrientationDisplay = checkOrientationDisplay.bind(this);
    }
}