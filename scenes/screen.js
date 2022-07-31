import constant from '../constant.js'
import arr from '../env.js'
import {
    createAnimation, callTimer, addPreloadThings, showNewThings,
    addImg,
    addOverLay,
    addImageInCenter,
    animeGirl,
    showJoi,
    showSad,
    addSuperQuick,
    checkOrientationDisplay
} from '../utils/common.js'
export default class Screen extends Phaser.Scene {

    constructor() {
        super("Screen");
    }

    init(data) {
        this.data = data;
        this.scena = data.scena;
        this.select = data.select;
        this.numberDressPicked = data.numberDressPicked;

        this.things = data.things;

    }

    preload() {

        let e = arr[this.scena][this.select]

        // remove textures
        this.textures.remove('room');

        //load market
        this.load.image("market", e.market);

        // Images
        this.load.image("girl", e.girl);
        this.load.image("men", e.men);

        this.load.image("room", e.room);

        this.load.html('screenBlock', 'components/screenBlock/screenBlock.html', 512, 512);

        this.load.css('cssScreenBlock', 'components/screenBlock/style.css');

        this.load.spritesheet('girl_joi', e.girl_joi, { frameWidth: 1204, frameHeight: 2736 });
        this.load.spritesheet('girl_sad', e.girl_sad, { frameWidth: 1204, frameHeight: 2736 });

        this.createAnimation = createAnimation.bind(this);

        this.bind();

        //add into preload things from preview scenes
        this.addPreloadThings(this.things);
    }

    create() {

        let e = arr[this.scena][this.select]

        this.arr = arr;

        let progress = arr["progress"][this.scena - 1];


        this.createAnimation('girl_joi_anim', 'girl_joi', 0, 2, 2, 1);

        this.createAnimation('girl_sad_anim', 'girl_sad', 0, 2, 2, 1);

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

        this.addSuperQuick('market', posX * 0.2, posY * 0.3)

        this.addOverLay('room', posX, posY);

        this.girl = this.add.sprite(posX * 0.75, posY, 'girl')
            .setDepth(1)
            .setScale(constant[this.orientationDisplay].girl.scale)
            .setOrigin(constant[this.orientationDisplay].girl.OriginX, constant[this.orientationDisplay].girl.OriginY)


        this.men = this.add.sprite(posX * 1.25, posY, 'men')
            .setDepth(0)
            .setScale(constant[this.orientationDisplay].men.scale)
            .setOrigin(constant[this.orientationDisplay].men.OriginX, constant[this.orientationDisplay].men.OriginY)

        this.showNewThings(this.things, posX * 0.75, posY)

        let textBlock = this.add.dom(posX, posY * 1.1)
            .createFromCache('screenBlock');

        // amazing screen  and endCart
        if (this.numberDressPicked === 1) {

            document.querySelector('.textBox').innerHTML = e.menGoodText;

            this.callTimer(0, () => this.showJoi(posX * 0.75, posY), false);

            //load endCart screen
            this.callTimer(3000, () => this.scene.start("EndCart", {
                "scena": 6,
                "select": this.select,
            }), false);
        }
        // lose screen
        else {
            document.querySelector('.textBox').innerHTML = e.menBadText;

            this.callTimer(300, () => this.showSad(posX * 0.75, posY), false);

            //load retry screen
            this.callTimer(3000, () => this.scene.start("Retry", {
                "scena": 6,
                "select": this.select,
            }), false);
        }
    }

    bind() {
        this.createAnimation = createAnimation.bind(this);

        this.addImg = addImg.bind(this);
        this.addOverLay = addOverLay.bind(this);
        this.addImageInCenter = addImageInCenter.bind(this);
        this.animeGirl = animeGirl.bind(this);
        this.showJoi = showJoi.bind(this);
        this.showSad = showSad.bind(this);
        this.callTimer = callTimer.bind(this);

        this.addPreloadThings = addPreloadThings.bind(this);

        this.showNewThings = showNewThings.bind(this);
        this.addSuperQuick = addSuperQuick.bind(this);

        this.checkOrientationDisplay = checkOrientationDisplay.bind(this);
    }

}