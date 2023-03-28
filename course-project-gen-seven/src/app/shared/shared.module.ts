import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "../alert/alert.component";
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder.directive";
import { LoggingService } from "../services/logging.service";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    // entryComponents: [
    //   AlertComponent
    // ],
    // providers: [LoggingService]
})
export class SharedModule { }
// There can be more shared-modules. In each we can group features
