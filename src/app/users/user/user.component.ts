import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = {
      id: this._route.snapshot.params.id,
      name: this._route.snapshot.params.name
    }

    this._route.params.subscribe((params: Params) => {
      console.log("++: ", params);

      this.user.id = params.id;
      this.user.name = params.name;
    });

    console.log("**: ", this.user);
  }

}
