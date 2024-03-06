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