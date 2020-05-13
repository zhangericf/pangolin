import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PangolinRegisterComponent } from './pangolins/pangolin-register/pangolin-register.component';
import { PangolinLoginComponent } from './pangolins/pangolin-Login/pangolin-Login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SocketService } from './_services/socket.service';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './pangolins/profile/profile.component';

@NgModule({
   declarations: [
      AppComponent,
      PangolinRegisterComponent,
      PangolinLoginComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      ChatComponent,
      ProfileComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      routing
   ],
   providers: [
      SocketService,
      HomeComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
