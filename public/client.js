const socket = io();
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');
var name;
do{
    name = prompt("Please enter your name: ");
}while(!name)
textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})
const sendMessage = (message)=>{
    let msg = {
        user: name,
        message: message.trim()
    }
    //Append the message
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();
    //send to server
    socket.emit('sendMessage',msg)
}
const appendMessage = (msg,type)=>{
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
`;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}
//Receive message
socket.on('receiveMessage', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
  });
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}