import { CanComponentDeactivate } from './../../guards/can-deactivate.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-edit-server',
	templateUrl: './edit-server.component.html',
	styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
	server: { id: number, name: string, status: string };
	serverName = '';
	serverStatus = '';
	allowEdit: boolean = false;
	changesSaved: boolean = false;

	constructor(private serversService: ServersService,
		private _route: ActivatedRoute,
		private _router: Router) { }

	ngOnInit() {
		this._route.queryParams.subscribe((params: Params) => {
			this.allowEdit = params['allowEdit'] === '1' ? true : false;
		});

		this.server = this.serversService.getServer(1);
		this.serverName = this.server.name;
		this.serverStatus = this.server.status;
	}

	onUpdateServer() {
		this.changesSaved = true;
		this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
		this._router.navigate(['../'], { relativeTo: this._route });
	}

	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if(!this.allowEdit) {
			return true;
		}

		if(this.serverName !== this.server.name || this.serverStatus !== this.server.status) {
			if(!this.changesSaved) {
				return confirm("Do you want to discard the changes?");
			}
			else {
				return true;
			}
		}
	}

}
