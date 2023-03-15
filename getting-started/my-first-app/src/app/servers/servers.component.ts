import { Component } from '@angular/core';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.css']
})
export class ServersComponent {
    allowNewServer: boolean = false
    serverCreationStatus: string = 'No server was created!'
    serverName: string = 'temp'
    serverCreated: boolean = false
    servers = ['TestServer1', 'TestServer2']

    constructor() {
        setTimeout(() => {
            this.allowNewServer = true
        }, 2000)
    }
    
    ngOnInit() {

    }

    onCreateServer() {
        this.serverCreated = true
        this.servers.push(this.serverName)
        this.serverCreationStatus = `Server was created! -> ${this.serverName}`
    }

    onUpdateServerName(event: Event) {
        this.serverName = (<HTMLInputElement>event.target).value
    }
}
