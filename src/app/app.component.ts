import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  template: `
    <p>
      chat works!!
    </p>
  `,
  styles: ``
})
class ChatComponent {

}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      ChatComponent
  ],
  template: `
    <h1>{{ title }}</h1>
    <app-chat></app-chat>
  `,
})
export class AppComponent {
  title = 'Chat';
}
