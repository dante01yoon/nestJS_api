import { Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Socket } from "socket.io";
@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server;
  @SubscribeMessage('fromClient')
  handleMessage(
    @MessageBody() message,
    @ConnectedSocket() client: Socket
  ) {
    console.log(client);
    console.log(message);
    this.server.emit("fromServer", message);
  }
}
