import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Assignment } from '../../models/Assignment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class NewEditAssignmentComponents implements OnInit {

  assignment: Assignment;
  assignmentForm: FormGroup;
  loading = false;
  errorMessage: string;
  part: number;

  private partSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private state: StateService,
              private stuffService: StuffService) { }

  ngOnInit() {
    this.loading = true;
    this.assignmentForm = this.formBuilder.group({
      nom: [null, Validators.required],
      dateRendu: [null, Validators.required],
      auteur: [null, Validators.required],
      imageUrl: [null, Validators.required],
      remarques: [null, Validators.required]
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {
        this.stuffService.getassignmentById(params.id).then(
          (assignment: Assignment) => {
            this.assignment = assignment;
            this.assignmentForm.get('nom').setValue(this.assignment.nom);
            this.assignmentForm.get('dateRendu').setValue(this.assignment.dateRendu);
            this.assignmentForm.get('auteur').setValue(this.assignment.auteur);
            this.assignmentForm.get('imageUrl').setValue(this.assignment.imageUrl);
            this.assignmentForm.get('remarques').setValue(this.assignment.remarques);
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const assignment = new Assignment();
    assignment.nom = this.assignmentForm.get('nom').value;
    assignment.dateRendu = this.assignmentForm.get('dateRendu').value;
    assignment.auteur = this.assignmentForm.get('auteur').value;
    assignment.imageUrl = this.assignmentForm.get('imageUrl').value;
    assignment.remarques = this.assignmentForm.get('remarques').value;
    assignment._id = new Date().getTime().toString();
    assignment.userId = this.assignment.userId;
    this.stuffService.modifyassignment(this.assignment._id, assignment).then(
      () => {
        this.assignmentForm.reset();
        this.loading = false;
        switch (this.part) {
          case 1:
          case 2:
            this.router.navigate(['/part-one/all-stuff']);
            break;
          case 3:
            this.router.navigate(['/part-three/all-stuff']);
            break;
          case 4:
            this.router.navigate(['/part-four/all-stuff']);
            break;
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
