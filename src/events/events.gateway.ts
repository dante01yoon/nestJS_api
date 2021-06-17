import { MessageBody, SubscribeMessage, WebSocketGateway, ConnectedSocket, WsResponse, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@WebSocketGateway(80)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server: Server
  private logger: Logger = new Logger("EventsGateway");

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ): WsResponse<unknown> {
    const event = "message";
    return { event, data };
  }

  @SubscribeMessage("events")
  onEvent(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ): Observable<WsResponse<unknown>> {
    const event = "events";
    const response = [1, 2, 3];

    return from(response)
      .pipe(
        map(data => ({ event, data })),
      )
  }
}
