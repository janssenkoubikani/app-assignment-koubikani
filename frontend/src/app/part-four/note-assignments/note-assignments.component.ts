import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { mimeType } from '../mime-type.validator';
import { Assignment } from '../../models/Assignment.model';

@Component({
  selector: 'app-note-assignments',
  templateUrl: './note-assignments.component.html',
  styleUrls: ['./note-assignments.component.scss']
})
export class NoteAssignmentComponent implements OnInit {

  public assignmentForm: FormGroup;
  public assignment: Assignment;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private stuffService: StuffService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.stuffService.getassignmentById(params.id).then(
          (assignment: Assignment) => {
            this.assignment = assignment;
            this.assignmentForm = this.formBuilder.group({
              nom: [assignment.nom, Validators.required],
              dateRendu: [assignment.dateRendu, Validators.required],
              auteur: [assignment.auteur, Validators.required],
              image: [assignment.imageUrl, Validators.required, mimeType],
              remarques: [assignment.remarques, Validators.required],
              note: [assignment.note, Validators.required]
            });
            this.imagePreview = assignment.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const assignment = new Assignment();
    assignment._id = this.assignment._id;
    assignment.nom = this.assignmentForm.get('nom').value;
    assignment.dateRendu = this.assignmentForm.get('dateRendu').value;
    assignment.auteur = this.assignmentForm.get('auteur').value;
    assignment.imageUrl = '';
    assignment.remarques = this.assignmentForm.get('remarques').value;
    assignment.note = this.assignmentForm.get('note').value;
    assignment.userId = this.userId;
    this.stuffService.modifyassignmentWithFile(this.assignment._id, assignment, this.assignmentForm.get('image').value).then(
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
    console.log(file);
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
