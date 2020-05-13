import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PangolinsService } from './pangolins.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: SocketIOClient.Socket;

  constructor(private pangolinService: PangolinsService) { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  socketDisconnect() {
    this.socket.disconnect();
  }

  public sendUser(userId: string) {
    this.socket.emit('user_id', userId);
  }

  public disconnectUser(userId2: string) {
    this.socket.emit('disconnected_id', userId2);
  }

  public sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }

  public sendPrivateMessage(to: string, message: string) {
    this.socket.emit('private message', to, message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
      if (this.pangolinService.selectedPangolin) {
        console.log("he");
        this.socket.on('private message' + this.pangolinService.selectedPangolin.username, (message: string) => {
          observer.next(message);
        });
      } else {
        this.socket.on('chat message', (message: string) => {
          observer.next(message);
        });
      }
    });
  }

  public getConnectedUser = () => {
    return new Observable((observer) => {
        this.socket.on('users', (users) => {
            observer.next(users);
        });
    });
  }

  public getNumberUser = () => {
    return new Observable((observer) => {
      this.socket.on('stats', (numbUser) => {
          observer.next(numbUser);
      });
    });
  }
}
