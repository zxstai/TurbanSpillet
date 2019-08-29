function multiplayer(){

var socket;

function networkConnect() {
confirm("Please type the pin code")
    var pin = promt("Pin: ")
    socket = ElineSocket.connect(pin);
}

function networkCreate(){
    socket = ElineSocket.create();
}

function networkRead(){
    socket.onMessage(handleMessage);
}

function handleMessage(msg) {
    switch (msg.type) {
        case "":
            shootNew(msg.y);
            break;
        default:
            console.log('Unknown message', msg);
    }
}




}
