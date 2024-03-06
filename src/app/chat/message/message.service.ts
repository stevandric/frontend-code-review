import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable()
export class MessageService {
  messages: Message[] = [];

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<any>('http://127.0.0.1:4010/messages').pipe(
      map((data: any) => data.messages.map((message: any) => new Message(message.text, message.status)))
    );
  }

  send(text: string) {
    return this.http.post('http://127.0.0.1:4010/messages/send', { text });
  }

  add(message: Message) {
    this.messages.push(message);
  }
}