//Websocekt variables
const HOST = window.location.host;
const url = `ws://${HOST}/myWebsocket`;
const mywsServer = new WebSocket(url);


//DOM Elements
const myMessages = document.getElementById('messages');
const myInput = document.getElementById('message');
const sendBtn = document.getElementById('send');

sendBtn.disabled = true;

// Send message when button is clicked
sendBtn.addEventListener('click', sendMsg, false);

// Send message when Enter-key is pressed
myInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMsg();
    }
});

//Sending message from client
function sendMsg() {
    myInput.select();
    mywsServer.send(myInput.value);
}

//Creating DOM element to show received messages on browser page
function msgGeneration(msg) {
    const newMessage = document.createElement('p');
    const stamp = new Date().toLocaleString();
    newMessage.innerText = `${stamp}: ${msg}`;
    myMessages.appendChild(newMessage);
}

//enabling send message when connection is open
mywsServer.onopen = function() {
    sendBtn.disabled = false
}

//handling message event
mywsServer.onmessage = function(event) {
    const { data } = event
    msgGeneration(data)
}