import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-stotage.service';
import 'rxjs/Rx';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService, public authService: AuthService, private router: Router) {
  }

  onSaveData() {
    this.dataStorageService.saveRecipes()
      .subscribe(
      (response) => { console.log('header.component.ts: response: ', response); },
      (error) => { console.log('error: ' + error); }
    );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    console.log('logout()...');
    this.authService.logout();
    this.router.navigate([ '/signin']);
  }

}
