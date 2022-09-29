let socket = io()

const name = prompt("Ismingizni kiriting")

const container = document.querySelector('.container')

const h4 = document.createElement('h3')
h4.textContent = 'Siz chatga kirdingiz'
container.appendChild(h4)

socket.emit('user-joined', { name })

socket.on('new-user-joined', data => {
    const h4 = document.createElement('h3')
    h4.textContent = `${data} chatga kirdi`
    container.appendChild(h4)
})

form.addEventListener('submit', e => {
    e.preventDefault()

    const { message } = e.target

    const h5 = document.createElement('h5')
    h5.textContent = `You: ${message.value}`
    container.appendChild(h5)

    socket.emit('new-message', {
        name,
        message: message.value
    })

    e.target.message.value = ''
})

socket.on('new-user-message', ({ name, message }) => {
    const h5 = document.createElement('h5')
    h5.textContent = `${name}: ${message}`
    container.appendChild(h5)
})

input.addEventListener('keyup', e => {
    socket.emit('user-typing', {
        name,
        message: e.target.value
    })
})

const h5 = document.createElement('h5')

socket.on('typing', ({ name, message }) => {
    h5.textContent = null
    h5.textContent = `${name} is typing ${message}...`
    container.appendChild(h5)

    if(h5.textContent) {
        setTimeout(() => {
            h5.remove()
        }, 1000)
    }
})