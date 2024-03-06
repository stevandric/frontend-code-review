import { Component, Injectable, Input, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable()
class MessageService {
  messages: Message[] = [];

  constructor(private http: HttpClient) { }

  all() {
    return this.http.get<any>('http://127.0.0.1:4010/messages').pipe(
      map((data: any) => data.messages.map((message: any) => new Message(message.text, message.status)))
    );
  }

  async add(message: Message) {
    this.messages.push(message);
  }
}

class Message {
  text: string;
  status: string;
  constructor(message: string, status: string) {
    this.text = message;
    this.status = status;
  }

  empty() {
    return this.text === '';
  }
}

@Component({
  selector: 'app-message',
  template: `
    <div style="background-color: #fff;">
      <span class="block bg-slate-200 text-slate-500">#{{no}} - {{ message.status }}</span>
      <div class="p-2" [ngClass]="{'text-slate-500': message.status === 'draft'}">
        {{message.text}}
      </div>
    </div>
  `,
})
class MessageComponent {
  @Input() message!: Message;
  @Input() no!: number;
}

@Component({
  selector: 'app-chat',
  providers: [MessageService],
  template: `
    <div>
      <div *ngFor="let message of messages; index as i;">
        <app-message [message]="message" [no]="i"></app-message>
      </div>
    </div>
  `,
})
class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.all().subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }
}

@Component({
  selector: 'app-create-message',
  providers: [MessageService],
  template: `
    <div *ngIf="!messageForm.get('text').value">
      <app-message [message]="message" no="preview"></app-message>
    </div>
    <form [formGroup]="messageForm" (submit)="onSubmit()">
      <label class="mt-4">
        <div>Write Message</div>
        <textarea class="block w-full" formControlName="text"></textarea>
      </label>

      <button
        type="submit"
        [disabled]="messageForm.invalid || messageForm.get('status').value === 'pending'"
        class="pointer bg-blue-400 py-2 px-4 mt-2 w-full"
        [ngClass]="{'bg-gray-400': messageForm.get('status').value === 'pending'}"
      >
        Send
      </button>
    </form>
  `,
})
class CreateMessageComponent implements OnInit {
  messageForm!: FormGroup;

  constructor(private messageService: MessageService, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      text: ['', Validators.required],
      status: ['draft']
    });
  }

  async onSubmit() {
    this.messageForm.get('status')?.setValue('pending');
    try {
      await this.http.post('http://127.0.0.1:4010/messages/send', { text: this.messageForm.get('text')?.value }).toPromise();
      this.messageForm.get('status')?.setValue('sent');
    } catch (error) {
      this.messageForm.get('status')?.setValue('failed');
    }
    await this.messageService.add(this.messageForm.value);
    this.messageForm.reset({ text: '', status: 'draft' });
  }
}

@Component({
  selector: 'app-root',
  template: `
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl my-8">{{ title }}</h1>
      <app-chat></app-chat>
      <app-create-message></app-create-message>
    </div>
  `,
})
export class AppComponent {
  title = 'Chat';
}

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }