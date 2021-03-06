import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BugService } from '../service/bug.service';
import { Bug } from '../model/bug';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';


@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: ['bug-detail.component.css'],
})

export class BugDetailComponent implements OnInit {
    private modalId = "bugModal";
    private bugForm: FormGroup;
    @Input() currentBug: Bug = new Bug(null, null, null, 1, 1, null, null);

    constructor(private formB: FormBuilder, private bugService: BugService) { }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(bug?: Bug) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(null, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     status: new FormControl(1, Validators.required),
        //     description: new FormControl(null, Validators.required),
        //     severity: new FormControl(1, Validators.required)
        // });
        if (bug) {
            this.currentBug = new Bug(
                bug.id,
                bug.title,
                bug.description,
                bug.status,
                bug.severity,
                bug.createdBy,
                bug.createdDate,
                bug.updatedBy,
                bug.updatedDate
            );
        }

        this.bugForm = this.formB.group({
            title: [this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status, Validators.required],
            description: [this.currentBug.description, Validators.required],
            severity: [this.currentBug.severity, Validators.required]
        });
    }

    submitForm() {
        console.log(this.bugForm);
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];
        if (this.currentBug.id) {
            this.updateBug();
        } else {
            this.addBug();
        }
        this.freshForm();
    }

    addBug() {
        this.bugService.addBug(this.currentBug);
    }

    updateBug() {
        this.bugService.updateBug(this.currentBug);
    }

    freshForm() {
        this.bugForm.reset({ status: 1, severity: 1 });
        this.cleanBug();
    }

    cleanBug() {
        this.currentBug = new Bug(null, null, null, 1, 1, null, null, null, null);
    }
}