window.onload = function() {
    window.scrollTo(0,document.body.scrollHeight);
}

var socket = io("http://localhost:3000");
socket.on('connect',()=>{
    console.log(socket.id);
})
function sendMessage( a, b){
    var content = document.getElementById("msgbar").value;
    var s = socket.id;
    socket.emit("messageToServer",{content,cid:a,uid:b,s});
    return false;
}
// io.on("connection",(socket)=>{
    socket.on("messageFromServer",(data)=>{
        console.log(data);
        $("#allmsgdiv").append(
            "<div class='chatbubble'> <p class='author'>"+data.author.email+"</p><p>"+data.content+"</p><p class='timemsg'>"+data.timestmp.toLocaleString()+"</p></div>"
        );
    })
// });
