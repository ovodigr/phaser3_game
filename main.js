import Intro from './scenes/intro.js'
import Tutorial from './scenes/tutorial.js'
import Game from './scenes/game.js'
import Screen from './scenes/screen.js'
import EndCart from './scenes/endCart.js'
import Retry from './scenes/retry.js'
const MAX_SIZE_WIDTH_SCREEN = 4920
const MAX_SIZE_HEIGHT_SCREEN = 4080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 1540
const SIZE_HEIGHT_SCREEN = 1960

var WIDTH = window.screen.availWidth * window.devicePixelRatio;
var HEIGHT = window.screen.availHeight * window.devicePixelRatio;


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,

        parent: 'game',
        width: WIDTH, // SIZE_WIDTH_SCREEN,
        height: HEIGHT,//SIZE_HEIGHT_SCREEN,
        min: {
            width: MIN_SIZE_WIDTH_SCREEN,
            height: MIN_SIZE_HEIGHT_SCREEN
        },
        max: {
            width: MAX_SIZE_WIDTH_SCREEN,
            height: MAX_SIZE_HEIGHT_SCREEN
        }
    },
    dom: {
        createContainer: true
    },


    scene: [Intro, Tutorial, Game, Screen, EndCart, Retry]//, Preload]//, Credits, Title]//, Menu, Game]
}

const game = new Phaser.Game(config)

// Global
game.debugMode = false
game.embedded = true // game is embedded into a html iframe/object

game.sceneTitleStarted = false
game.showfadeOutBg = false
game.mainAnimationWasShown = false

game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}

// game.orientation = "portrait"
// game.orientation = "landscape"


