import { Component, OnInit } from '@angular/core';
import { BugService } from '../service/bug.service';
import { Bug } from '../model/bug';

@Component ({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: [ 'bug-list.component.css' ]
})

export class BugListComponent implements OnInit { 

    private bugList: Bug[] = [];

    constructor(private bugService: BugService ) {  }

    ngOnInit() {
        this.getAddedBugs();
    }

    getAddedBugs() {
        this.bugService.getAddedBugs()
            .subscribe(bug => {
                this.bugList.push(bug);
                console.log(this.bugList); // TODO: Remove
            },
            err => {
                console.error("Unable to get added bug - ", err);
            });
    }

    addBug() {

    }

}