import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom:string = "";
  currentRoute:string = "";

  constructor(private authService:AuthService,
              private router:Router,
              private assigmmentsService:AssignmentsService) {
    console.log(router.url);
    //this.creerDonneesDeTest();
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });


  }

  login(){
    this.router.navigate(["/"]);
  }

  isLogged() {
    if(this.authService.isAuthenticated()) {
      this.nom = "Test";
    }
    return this.authService.isAuthenticated();
  }

  creerDonneesDeTest() {
    this.assigmmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Opération terminée, les 1000 données ont été insérées")

      // on refresh la page pour que la liste apparaisse
      // plusieurs manières de faire....
      window.location.reload();
    });
  }
}
