import { Component, Input } from "@angular/core";

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
export class MessageComponent {
  @Input() message!: Message;
  @Input() no!: number;
}