function timeString (timeMS: number) {
    return "" + extractTwoDigitNumber(timeMS, 1000 * 60 * 60, 24) + ":" + extractTwoDigitNumber(timeMS, 1000 * 60, 60) + ":" + extractTwoDigitNumber(timeMS, 1000, 60)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    wallTime += selectedMult
})
function toggleSelectedMult () {
    if (selectedMult == minSelectedMult) {
        selectedMult *= 60
    } else {
        selectedMult = minSelectedMult
    }
}
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    wallTime += selectedMult
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    toggleSelectedMult()
})
function extractTwoDigitNumber (num: number, divider: number, modNum: number) {
    auxString = "" + Math.round(num / divider) % modNum
    while (auxString.length < 2) {
        auxString = "0" + auxString
    }
    return auxString
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    toggleSelectedMult()
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    wallTime += 0 - selectedMult
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    wallTime += 0 - selectedMult
})
let prevTime = 0
let time = 0
let auxString = ""
let minSelectedMult = 0
let selectedMult = 0
minSelectedMult = 60 * 1000
selectedMult = 60 * 1000
let fontHeight = 18
let wallTime = 60 * 60 * 1000
let textSprite = textsprite.create("00:00:00")
textSprite.setMaxFontHeight(fontHeight)
textSprite.x = scene.screenWidth() / 2
textSprite.y = fontHeight / 2 + 1
let sleepKirby = assets.image`sleep`
let cleanImage = assets.image`clear`
let mySprite = sprites.create(cleanImage, SpriteKind.Player)
game.onUpdate(function () {
    time = game.runtime() + wallTime
    textSprite.setText(timeString(game.runtime() + wallTime))
    while (time >= 24 * 60 * 60 * 1000) {
        time += 0 - 24 * 60 * 60 * 1000
    }
    if (time > 20 * 60 * 60 * 1000 && time < 22 * 60 * 60 * 1000) {
        mySprite.setImage(sleepKirby)
    } else {
        mySprite.setImage(cleanImage)
    }
    if (wallTime >= 24 * 60 * 60 * 1000) {
        wallTime += 0 - 24 * 60 * 60 * 1000
    }
    if (wallTime < 0) {
        wallTime += 24 * 60 * 60 * 1000
    }
    prevTime = game.runtime()
    if (prevTime > game.runtime()) {
        textSprite.setText("Error")
    }
})
