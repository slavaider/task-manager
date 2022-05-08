import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public isLogged: boolean = this.auth.isLogged();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.trackLogin$.subscribe((value) => {
      this.isLogged = value;
    });
  }

}
