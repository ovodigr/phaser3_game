import constant from '../constant.js'
import arr from '../env.js'
import { createAnimation } from '../utils/common.js'
import {
    callTimer, addPreloadThings, showNewThings, addProgresBlock,
    addTopBlock,
    addHand,

    addTwoBlocks,
    addChooseBlock,
    clickOnBlock,
    addImg,
    addOverLay,
    addImageInCenter,
    animeGirl,
    showJoi,
    addSuperQuick,
    checkOrientationDisplay
} from '../utils/common.js'

export default class Game extends Phaser.Scene {

    constructor() {
        super("Game");
    }

    init(data) {
        this.data = data;
        this.scena = data.scena;
        this.select = data.select;

        this.things = data.things;

        this.numberDressPicked = data.numberDressPicked;
    }

    preload() {


        this.scale.on('orientationchange', function (orientation) {
            // console.log('orientationchange');
        });

        this.bind();

        let e = arr[this.scena][this.select];

        //add into preload things from preview scenes
        this.addPreloadThings(this.things);

        // remove textures
        if (this.scena == 2) {
            this.textures.remove('girl');
            this.textures.remove('room');
        }

        this.textures.remove('girl_changed1');
        this.textures.remove('girl_changed2');

        if (e !== undefined) {

            // Images
            this.load.image("girl", e.girl);

            this.load.image("girlHeadDefault", e.girlHeadDefault);

            this.load.spritesheet('girl_joi', e.girl_joi, { frameWidth: 1204, frameHeight: 2736 });

            this.load.image("market", e.market);

            if (e.girl_changed1 !== undefined && e.girl_changed1[this.numberDressPicked]['img'] !== "") {
                this.load.image("girl_changed1", e.girl_changed1[this.numberDressPicked]['img']);
                this.load.image("girl_changed2", e.girl_changed2[this.numberDressPicked]['img']);
            }

            this.load.image("room", e.room);
            this.load.image("clothesImgLeft", e.clothesImgLeft[this.numberDressPicked]);
            this.load.image("clothesImgRight", e.clothesImgRight[this.numberDressPicked]);

            this.load.image("hand", e.hand);

            this.load.html('chooseBlockLeft', e.chooseBlockLeft);//, 512, 512);
            this.load.html('chooseBlockRight', e.chooseBlockRight);//, 512, 512);
            this.load.html('chooseTextThing', e.chooseTextThing, 512, 512);

            this.load.html('progressBar', e.progressBar);

            this.load.css('cssProgressBar', e.cssProgressBar);

            this.load.css('cssChooseBlock', e.cssChooseBlock);

            this.load.css('cssChooseTextThing', e.cssChooseTextThing);
        }
    }



    create() {


        this.clicked = false;



        let e = arr[this.scena][this.select]

        this.arr = arr;

        let progress = arr["progress"][this.scena - 1];

        this.stopTimer = false;

        this.createAnimation('girl_joi_anim', 'girl_joi', 0, 2, 2, 1);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;


        this.orientationDisplay = this.checkOrientationDisplay();

        let posX, posY;

        if (this.orientationDisplay == 'landscape') {

            posX = this.cameras.main.width / 2;
            posY = this.cameras.main.height / 2.5;

        }
        else {
            posX = this.cameras.main.width / 2;
            posY = this.cameras.main.height / 2;
        }

        this.posX = posX;
        this.posY = posY;

        let block_leftX;
        let block_leftY = posY * 1.1;
        let block_rightX;
        let block_rightY = posY * 1.1;
        let scaleClothes = 0.8;
        let scaleHand = 0.5;


        this.addSuperQuick('market', posX * 0.2, posY * 0.3)

        this.addOverLay('room', posX, posY);

        this.girl = this.addImageInCenter('girl', posX, posY);

        this.girlHead = this.addImageInCenter('girlHeadDefault', posX, posY)
            .setDepth(2)

        this.callTimer(0, () => this.showNewThings(this.things, posX, posY), false);

        if ((constant[this.orientationDisplay].cloths.one + constant[this.orientationDisplay].cloths.two) * scaleClothes >= width) {
            // scale
            scaleClothes = width / (constant[this.orientationDisplay].cloths.one + constant[this.orientationDisplay].cloths.two) * scaleClothes;
        }
        else
            if ((constant[this.orientationDisplay].cloths.one + constant[this.orientationDisplay].cloths.two) * scaleClothes > width / 2) {
                //set 1/3
            }
            else {
                // set close girl, spase between blocks and maybe scale
                scaleClothes = scaleClothes * 1.2;
            }

        let spase = width - (constant[this.orientationDisplay].cloths.one + constant[this.orientationDisplay].cloths.two);//* scaleClothes;

        block_leftX = spase / 3;
        block_rightX = spase * 2 / 3 + constant[this.orientationDisplay].cloths.one;//* scaleClothes;

        this.addTwoBlocks(block_leftX, block_leftY, block_rightX, block_rightY, scaleClothes, e, this.hand)

        if (this.orientationDisplay == 'landscape') {
            document.querySelector('.chooseBlockLeft').style.height = '100px';
            document.querySelector('.chooseBlockLeft').style.width = '100px';
            document.querySelector('.chooseBlockRight').style.height = '100px';
            document.querySelector('.chooseBlockRight').style.width = '100px';

        }

        this.addTopBlock(posX, e);

        this.addHand(block_leftX, block_rightX, block_leftY, scaleHand, e);

    }


    bind() {
        this.createAnimation = createAnimation.bind(this);
        this.addProgresBlock = addProgresBlock.bind(this);

        this.addTopBlock = addTopBlock.bind(this);
        this.addHand = addHand.bind(this);

        this.addTwoBlocks = addTwoBlocks.bind(this);
        this.addChooseBlock = addChooseBlock.bind(this);

        this.clickOnBlock = clickOnBlock.bind(this);

        this.addImg = addImg.bind(this);
        this.addOverLay = addOverLay.bind(this);
        this.addImageInCenter = addImageInCenter.bind(this);
        this.animeGirl = animeGirl.bind(this);
        this.showJoi = showJoi.bind(this);

        this.callTimer = callTimer.bind(this);

        this.addPreloadThings = addPreloadThings.bind(this);

        this.showNewThings = showNewThings.bind(this);

        this.addSuperQuick = addSuperQuick.bind(this);

        this.checkOrientationDisplay = checkOrientationDisplay.bind(this);
    }
}