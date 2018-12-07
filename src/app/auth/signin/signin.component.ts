
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Recipe} from '../../recipes/recipe.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnDestroy {

  public hideError = true;
  private loggedIn = false;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    this.subscription = this.authService.signinStatus.subscribe (
      (data: boolean) => {
        this.loggedIn = data;
        if (this.loggedIn) {
          this.router.navigate([ '/recipes']);
        } else {
          this.hideError = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
