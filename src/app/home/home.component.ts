import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit() {

	}

	onLoadServer(id: number): void {
		/* Using Absolute Path */
		// this._router.navigate(['/servers']);


		/* Using Relative Path */
		// this._router.navigate(['servers'], { relativeTo: this._route });

		this._router.navigate(['servers', id, 'edit'], {
			queryParams: {
				allowEdit: 1,
			},
			fragment: 'loadingData'
		});
	}

}
