import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Dev } from 'src/app/services/database.service';



@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {
  developers: Dev[] = [];
  products: Observable<any[]>;
  developer = {};
  product = {};

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        //DUAS FORMAS DE SE FAZER ALGO ASSINCRONAMENTE
        this.db.getDevs().subscribe(devs => {
          console.log('devs changed : ', devs)
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }

  addDeveloper(){
    let skills = this.developer['skills'].split(',');
    skills = skills.map(skill => skill.trim());

    this.db.addDeveloper(this.developer['name'], skills, this.developer['img'])
            .then(_ => {
              this.developer = {};
            });
  }

  addProduct(){
    this.db.addProduct(this.product['name'], this.product['creator'])
            .then(data => {
              this.product = {};
            });
  }

}
