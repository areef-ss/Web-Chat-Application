import {WebSocketServer,WebSocket} from 'ws'
const wss=new WebSocketServer({port : 8080})
interface User{
    socket:WebSocket,
    room:string
}

let userCount=0;
let allSockets:User[]=[];

wss.on("connection",function(socket){
   
    socket.on("message",function(message){
        const parsedMessage=JSON.parse(message as unknown as string);
        if(parsedMessage.type=="join"){
            allSockets.push({
                socket,
                room:parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type=="chat"){
            //let currentUerRoom=allSockets.find((x)=>x.room==socket).room;
            let currentUerRoom=null;
            //let currentUerRoomObj=null;
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.socket==socket){
                    // currentUerRoom=allSockets[i]?.room;
                    currentUerRoom=allSockets[i]?.room;
                    break;
                }
            }
            //currentUerRoomObj?.socket.send(parsedMessage.payload.message);


            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.room==currentUerRoom && allSockets[i]?.socket!=socket){
                    allSockets[i]?.socket.send(parsedMessage.payload.message);
                }

            }
        }

    })
   
})