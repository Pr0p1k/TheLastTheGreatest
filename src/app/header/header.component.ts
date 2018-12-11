import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ajax} from 'rxjs/ajax';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  display = false;

  isLogin = true;

  firstPassword = '';

  secondPassword = '';

  username = '';

  ngOnInit() {
  }

  signIn() {
    if (this.firstPassword.length <= 6) {
      this.showError('Password is too short');
      return;
    }
    if (this.username.length <= 6) {
      this.showError('Username is too short');
      return;
    }

    ajax({
      url: '/login',
      method: 'POST',
      login: this.username,
      password: this.firstPassword
    });
  }

  register() {
    if (!this.checkPassword()) {
      this.showError('Password is invalid');
      return;
    }
    if (this.username.length <= 6) {
      this.showError('Username is too short');
      return;
    }

    ajax({
      url: '/registration',
      method: 'POST',
      login: this.username,
      password: this.firstPassword
    });
  }

  checkPassword() {
    return this.firstPassword === this.secondPassword && this.firstPassword.length >= 6;
  }

  constructor(private messageService: MessageService) {
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Ok', detail: 'Successfully registered'});
  }

  showError(msg: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: msg});
  }
}
