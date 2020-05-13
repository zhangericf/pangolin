import { Component, OnInit, OnDestroy } from '@angular/core';
import { PangolinsService } from '../_services/pangolins.service';
import { AuthenticationService } from '../_services/authentification.service';
import { SocketService } from '../_services/socket.service';
import { NgForm } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string;
  messages: string[] = [];
  numbUser = 0;

  constructor(
    public pangolinsService: PangolinsService,
    public authenticationService: AuthenticationService,
    private socketService: SocketService,
    public homeComponent: HomeComponent,
    ) { }

  ngOnInit() {
    this.socketService.setupSocketConnection();

    this.socketService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
      const container = document.getElementById('msgContainer');
      container.scrollTop = container.scrollHeight + container.clientHeight;
    });

    this.socketService.getNumberUser().subscribe((numbUser: number) => {
      this.numbUser = numbUser;
    });

    this.socketService.sendUser(this.authenticationService.currentPangolinValue.username);

    this.socketService.getConnectedUser().subscribe((data: string[]) => {
      this.homeComponent.users = data;
      console.log(this.homeComponent.users);
    });
  }

  sendMessage(form: NgForm) {
    if (this.pangolinsService.selectedPangolin) {
      this.socketService.sendPrivateMessage(
        this.pangolinsService.selectedPangolin.username ,
        this.authenticationService.currentPangolinValue.username + ' : ' + this.message);
      this.message = '';
    } else {
      this.socketService.sendMessage(this.authenticationService.currentPangolinValue.username + ' : ' + this.message);
      this.message = '';
    }

  }

  myMessage(message: string) {
    const user = (message.split(' '))[0];
    return this.authenticationService.currentPangolinValue.username === user;
  }

  ngOnDestroy() {
    this.socketService.disconnectUser(this.authenticationService.currentPangolinValue._id);
    this.socketService.socketDisconnect();
  }

}
