import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Assignment } from '../../models/Assignment.model';
import { mimeType } from '../mime-type.validator';
import {MatDatepickerModule} from '@angular/material';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  public assignmentForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private stuffService: StuffService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.assignmentForm = this.formBuilder.group({
      nom: [null, Validators.required],
      dateRendu: [null, Validators.required],
      auteur: [null, Validators.required],
      image: [null, Validators.required, mimeType],
      remarques: [null, Validators.required],
    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const assignment = new Assignment();
    assignment.nom = this.assignmentForm.get('nom').value;
    assignment.dateRendu = this.assignmentForm.get('dateRendu').value;
    assignment.auteur = this.assignmentForm.get('auteur').value;
    assignment.imageUrl = '';
    assignment.remarques = this.assignmentForm.get('remarques').value;
    assignment.userId = this.userId;
    this.stuffService.createNewassignmentWithFile(assignment, this.assignmentForm.get('image').value).then(
      () => {
        this.assignmentForm.reset();
        this.loading = false;
        this.router.navigate(['/part-four/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.assignmentForm.get('image').patchValue(file);
    this.assignmentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.assignmentForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
