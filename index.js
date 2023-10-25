const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

let parsedCollisions
let collisionBlocks
let background
let doors
const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 5,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 8,
            loop: false,
            imageSrc: '../img/king/enterDoor.png',
            onComplete: () => {
                gsap.to(overlay, {  // gsap - library for animations
                    opacity: 1,
                    onComplete: () => {
                        level++

                        if (level === 4) {
                            level = 1
                        }
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    }
})

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 754,
                        y: 272
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 335
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 770
            player.position.y = 256

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false
            }

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 10,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}







const keys = {
    w: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
}

const overlay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate)
    // Установить цвет заливки
    /*c.fillStyle = 'white'
    // Нарисовать прямоугольник (x, y, width, height)
    c.fillRect(0, 0, canvas.width, canvas.height)*/
    // clearRect - используется для очистки прямоугольной области холста,
    // Но так как очищает весь canvas, лучше перерисовать обычный фон за кадр

    background.draw()
    /*collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })*/
    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = '#16191c'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()

