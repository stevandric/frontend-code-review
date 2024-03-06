import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChatComponent } from "./chat/chat.component";
import { CreateMessageComponent } from "./chat/message/create-message/create-message.component";
import { MessageComponent } from "./chat/message/message.component";
import { MessageService } from "./chat/message/message.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateMessageComponent,
    MessageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }