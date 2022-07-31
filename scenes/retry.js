import constant from '../constant.js'
import arr from '../env.js'
import { createAnimation, callTimer, checkOrientationDisplay } from '../utils/common.js'

export default class Retry extends Phaser.Scene {

    constructor() {
        super("Retry");
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

        this.load.html('retryBlock', 'components/retryBlock/retryBlock.html', 512, 512);

        this.load.css('cssRetryBlock', 'components/retryBlock/style.css');

        this.bind();

    }

    handleStart(event) {
        this.touchStart = true;
        window.location.href = constant.url;
    }

    create() {



        document.addEventListener("touchstart", this.handleStart, false);

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

        let retryBlock = this.add.dom(width / 2 - constant.retry.width + 300, height / 2 - constant.retry.height)
            .createFromCache('retryBlock')
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerup', () => {
                window.location.href = constant.url;
            });

        var tween = this.tweens.add({
            targets: retryBlock,
            x: width / 2 - constant.retry.width + 100,
            // ease: 'Power1',
            duration: 4000,
            yoyo: true,
            repeat: -1,
        });

    }

    bind() {
        // this.createAnimation = createAnimation.bind(this);

        // this.callTimer = callTimer.bind(this);
        this.checkOrientationDisplay = checkOrientationDisplay.bind(this);
    }

}