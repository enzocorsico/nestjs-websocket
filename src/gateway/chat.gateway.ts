import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {

  @WebSocketServer()
  server;

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any) {
    this.server.emit("message", payload);
  }
}
