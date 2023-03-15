import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Server } from "./Server";
import { ServersService } from "./servers/servers.service";

@Injectable()
export class ServerResolver implements Resolve<Server> {
    constructor(private serversService: ServersService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id'])
    }
}