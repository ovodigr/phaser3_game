import constant from '../constant.js'

function createAnimation(key, texture, start, end, frameRate, repeat) {
    this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers(texture, { start: start, end: end }),
        frameRate: frameRate,
        repeat: repeat,
    });
}

function callTimer(delay, callback, loop) {

    this.time.addEvent({
        delay: delay,                // ms
        callback: callback,
        loop: loop
    })
}

function addPreloadThings(things) {

    if (things !== undefined)
        things.forEach(elem => {

            this.load.image(elem['name'], elem['thing']['img']);
        })
}

function showNewThings(things, posX, posY) {

    things.forEach(elem => {
        if (elem['name'] != '21' && elem['name'] != '22')
            this.addImageInCenter(elem['name'], posX, posY, elem['thing']['depth'])
    })

}

function addProgresBlock(posX, arr, e) {

    this.add.dom(posX, 30)
        .createFromCache('progressBar')
        .setOrigin(0.5);

    for (let i = 0; i < e.scena; i++)
        document.querySelector(arr["progress"][i]).classList.add("show")
}

function addTopBlock(posX, e) {

    this.add.dom(posX, 30)
        .createFromCache('chooseTextThing')
        .setOrigin(0.5);

    document.querySelector('.textThing').innerHTML = e.thingBlockText
}

function addHand(block_leftX, block_rightX, block_leftY, scaleHand, e) {


    this.callTimer(e.delayHandTime, () => {

        if (!this.stopTimer) {

            this.image = this.add.image(block_leftX + constant[this.orientationDisplay].cloths.one / 2, block_leftY + constant[this.orientationDisplay].hand, 'hand')
                .setScale(scaleHand)

            this.tween = this.tweens.add({
                targets: this.image,
                x: block_rightX + constant[this.orientationDisplay].cloths.two / 2,
                duration: 2000,
                yoyo: true,
                repeat: -1,
            });
        }
    }, false);


}


function addTwoBlocks(block_leftX, block_leftY, block_rightX, block_rightY, scaleClothes, e, hand) {
    this.addChooseBlock(
        'chooseBlockLeft', '.chooseBlockImgLeft',
        block_leftX, block_leftY,
        scaleClothes,
        e.scena + 1,
        1,
        e,
        hand);

    this.addChooseBlock(
        'chooseBlockRight', '.chooseBlockImgRight',
        block_rightX, block_rightY,
        scaleClothes,
        e.scena + 1,
        2,
        e,
        hand);
}

function addChooseBlock(name, img, blockX, blockY, scaleClothes, scena, select, e, hand) {
    let textBlockOne = this.add.dom(blockX, blockY)
        .createFromCache(name)
        .setOrigin(0)
        .setScale(scaleClothes)
        .setInteractive()
        // .setDepth(1)
        .on('pointerup', () => {

            if (!this.clicked)
                this.clickOnBlock(img, scena, select, e, hand);

        });

    if (img === '.chooseBlockImgLeft')
        document.querySelector(img).src = e.clothesImgLeft[this.numberDressPicked];
    else
        document.querySelector(img).src = e.clothesImgRight[this.numberDressPicked];

}


function clickOnBlock(img, scena, select, e, hand) {

    this.stopTimer = true;

    this.clicked = true;

    if (this.tween !== undefined)
        this.tween.stop();

    if (this.image !== undefined)
        this.image.destroy();

    if (scena < 5) {
        this.callTimer(0, () => this.showJoi(this.posX, this.posY), false);

        document.querySelector('.topPickBlock').style.display = 'none';

        this.addProgresBlock(this.posX, this.arr, e)

        if (this.scena === 1)
            this.girl.destroy();


        if (img === '.chooseBlockImgLeft' && e.girl_changed1[this.numberDressPicked]['img'] !== "") {

            this.addImageInCenter('girl_changed1', this.posX, this.posY, e.girl_changed1[this.numberDressPicked]['depth'])

            this.things.push({
                'name': scena.toString() + select.toString(),
                'thing': e.girl_changed1[this.numberDressPicked],
            });

        }
        else
            if (e.girl_changed1[this.numberDressPicked]['img'] !== "") {

                this.addImageInCenter('girl_changed2', this.posX, this.posY, e.girl_changed2[this.numberDressPicked]['depth'])

                this.things.push({
                    'name': scena.toString() + select.toString(),
                    'thing': e.girl_changed2[this.numberDressPicked],
                });

            }
    }

    let number;

    if (this.scena === 1) {
        number = select;
    }
    else {
        number = this.numberDressPicked;
    }

    if (scena < 5) {
        this.callTimer(2000, () => {

            this.scene.start("Game", {

                "scena": scena,
                "select": select,

                "numberDressPicked": number,

                "things": this.things
            });
        }, false);
    }
    else {
        this.callTimer(300, () => {

            this.scene.start("Screen", {
                "scena": 5,

                "numberDressPicked": number,

                "select": select,

                "things": this.things
            })
        }, false);
    }
}

function addImg(imgName, posX, posY) {

    return this.add.sprite(posX, posY, imgName);
}

function addOverLay(imgName, posX, posY) {
    let img = this.add.sprite(posX, posY, imgName)
}

function addImageInCenter(imgName, posX, posY, depth) {

    let img = this.add.sprite(posX, posY, imgName)
        .setDepth(depth)
        .setScale(constant[this.orientationDisplay].girl.scale)
        .setOrigin(constant[this.orientationDisplay].girl.OriginX, constant[this.orientationDisplay].girl.OriginY)

    return img
}

function animeGirl(name, posX, posY) {

    this.girl = this.add.sprite(posX, posY, name)
        .setDepth(2)
        .setScale(constant[this.orientationDisplay].girl.scale)
        .setOrigin(constant[this.orientationDisplay].girl.OriginX, constant[this.orientationDisplay].girl.OriginY);

    this.girl.anims.play(name);

}

function showJoi(posX, posY) {

    this.animeGirl('girl_joi_anim', posX, posY);
}



function showIntoSurprise(posX, posY, text) {

    document.querySelector('.textBox').innerHTML = text;

    this.animeGirl('girl_surprized_anim', posX, posY);
}

function showIntoJoi(posX, posY, text) {

    document.querySelector('.textBox').innerHTML = text;
    this.animeGirl('girl_joi_anim', posX, posY);
}


function showSad(posX, posY) {


    this.animeGirl('girl_sad_anim', posX, posY);
}

function addSuperQuick(name, posX, posY) {

    return this.addImg(name, posX, posY)
        .setDepth(3)
        .setScale(.3)
        .setInteractive()
        .on('pointerup', () => {

            window.location.href = constant.url;

        });
}

function addSwipeBlock(name, posX, posY, depth) {

    return this.addImg(name, posX, posY)
        .setDepth(depth)
        .setScale(.3)
        .setInteractive()
        .on('pointerup', () => {

            window.location.href = constant.url;

        });
}

function checkOrientationDisplay() {
    if (this.cameras.main.height > this.cameras.main.width)
        return 'portrait'
    else
        return 'landscape'
}

export {
    showIntoSurprise,
    showIntoJoi,


    createAnimation,
    callTimer,

    addPreloadThings,
    showNewThings,

    addProgresBlock,
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
    showSad,

    addSuperQuick,

    addSwipeBlock,

    checkOrientationDisplay
}