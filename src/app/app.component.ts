import { Component} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthorizationService } from './service/authorization.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router, private authorizationService: AuthorizationService) {
    this.router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event:NavigationStart) => {
        this.authorizationService.updateUserLogged()
    });
    };
}
