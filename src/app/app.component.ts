import { Component } from '@angular/core';

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