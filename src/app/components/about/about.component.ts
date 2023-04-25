import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  public title: string;
  public subtitle: string;
  public email: string;

    constructor(){ 
        this.title = 'Aarón José Chavarría Esquivel';
        this.subtitle = 'Informatica empresarial';
        this.email = 'aaron010199@gmail.com';
    }

    ngOnInit(): void {
      
    }

}
