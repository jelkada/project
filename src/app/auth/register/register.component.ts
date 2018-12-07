
import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') myForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    console.log('Calling ... this.authService.registerUser(email, password)');
    const email = form.value.email;
    const password = form.value.password;
    this.authService.registerUser(email, password);
  }
}
