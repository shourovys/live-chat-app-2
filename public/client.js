const socket = io()

let textarea = document.getElementById('textarea');
console.log(textarea);
let massageContainer = document.querySelector('.massage-container')


let name;
do {
    name = prompt('Enter your chat name')
} while (!name);


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendUserMassage(e.target.value)
        console.log('click');
    }
})


function sendUserMassage(massage) {
    let msg = {
        user: name,
        massage: massage.trim()
    }

    // Append massage in dom
    appendMassage(msg, 'outgoing')
    textarea.value = "";
    scroll()
    //send to server
    socket.emit('massage', msg)
}


function appendMassage(msg, type) {
    let massageElement = document.createElement('div');
    let className = type
    massageElement.classList.add(className, 'massage')

    let markup = `
        <h3>${msg.user}</h3>
        <p>${msg.massage}</p>
    `
    massageElement.innerHTML = markup;
    massageContainer.appendChild(massageElement)
}


// receive outher user massage
socket.on('massage', (msg) => {
    appendMassage(msg, 'incoming')
    scroll()
})


function scroll() {
    massageContainer.scrollTop = massageContainer.scrollHeight;
}

