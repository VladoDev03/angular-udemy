import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { DataStorageService } from "../services/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false
    private userSub: Subscription

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true
            // console.log(user)
            // console.log(!user)
            // console.log(!!user)
            this.isAuthenticated = !!user
        })
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout() {
        this.authService.logout()
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }
}