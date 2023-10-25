window.addEventListener('keydown', (event) => {
    if (player.preventInput) return

    switch (event.key.toLowerCase()) {
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]

                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width && // Если игрок сталкивается с дверью
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y <= door.position.y + door.height &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y
                ) {
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    door.play()
                    return // то мы не выполняем код ниже
                }
            }


            if (player.velocity.y === 0) {
                player.velocity.y = -10
            }
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})