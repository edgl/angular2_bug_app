//modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BugRoutingModule } from './bug-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Service
import { BugService } from './service/bug.service';

// Component
import { BugListComponent } from './bug-list/bug-list.component';
import { BugDetailComponent } from './bug-detail/bug-detail.component';


@NgModule({
    imports : [ SharedModule, BugRoutingModule, ReactiveFormsModule ],
    declarations: [ BugListComponent, BugDetailComponent ],
    exports: [],
    providers: [ BugService ]
})

export class BugModule {}