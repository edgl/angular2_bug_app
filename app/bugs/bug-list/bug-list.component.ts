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
        this.getUpdatedBugs();
    }

    getAddedBugs() {
        this.bugService.getAddedBugs()
            .subscribe(bug => {
                this.bugList.push(bug);
            },
            err => {
                console.error("Unable to get added bug - ", err);
            });
    }

    getUpdatedBugs() {
        this.bugService.changedListener()
            .subscribe(bug => {
                const bugIndex = this.bugList.map(index => index.id).indexOf(bug["id"]);
                this.bugList[bugIndex] = bug;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }

}