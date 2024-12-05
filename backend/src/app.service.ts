import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hellou mafrendz!';
  }
  getData() {
    return {
      name: "string_html",
      value: "<h1>QR-code generator</h1>"
    }
  }
}
