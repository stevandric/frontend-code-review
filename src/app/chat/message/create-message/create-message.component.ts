import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component',
})
export class CreateMessageComponent implements OnInit {
  messageForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      text: ['', Validators.required],
      status: ['draft']
    });
  }

  async onSubmit() {
    this.messageForm.get('status')?.setValue('pending');

    this.messageService.send(this.messageForm.get('text')?.value).subscribe(
      () => {
        this.messageForm.get('status')?.setValue('sent');
        this.messageService.add(this.messageForm.value);
        this.messageForm.reset({ text: '', status: 'draft' });
      },
      () => {
        this.messageForm.get('status')?.setValue('failed');
        this.messageForm.reset({ text: '', status: 'draft' });
      },
    )
  }
}