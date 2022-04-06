//Websocekt variables
const HOST = window.location.host;
const url = `ws://${HOST}/myWebsocket`;
const mywsServer = new WebSocket(url);


//DOM Elements
const chat = document.getElementById('chat');
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
    const stamp = new Date().toLocaleString();
    const row = chat.insertRow();
    const dateCell = row.insertCell(0)
    dateCell.innerText = stamp;
    dateCell.style.color = 'gray';
    row.insertCell(1).innerText = msg;
}

//enabling send message when connection is open
mywsServer.onopen = () => {
    console.log('WebSocket connection opened');
    sendBtn.disabled = false;
}

//handling message event
mywsServer.onmessage = (event) => {
    const { data } = event;
    console.log('message received: '+ data)
    msgGeneration(data);
}