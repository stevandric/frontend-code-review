import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message/message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.all().subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}