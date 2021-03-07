import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Assignment } from '../../models/Assignment.model';
import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-assignment',
  templateUrl: './single-assignment.component.html',
  styleUrls: ['./single-assignment.component.scss']
})
export class SingleAssignmentComponent implements OnInit, OnDestroy {

  public assignment: Assignment;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private stuffService: StuffService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-assignment');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.stuffService.getassignmentById(params.id).then(
          (assignment: Assignment) => {
            this.loading = false;
            this.assignment = assignment;
          }
        );
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        if (part >= 3) {
          this.userId = this.auth.userId;
        }
      }
    );
  }

  onGoBack() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/all-stuff']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/all-stuff']);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/all-stuff']);
    }
  }

  onModify() {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-assignment/' + this.assignment._id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-assignment/' + this.assignment._id]);
        break;
      case 4:
        this.router.navigate(['/part-four/edit-assignment/' + this.assignment._id]);
        break;
    }
  }

  onNote() {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-assignment/' + this.assignment._id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-assignment/' + this.assignment._id]);
        break;
      case 4:
        this.router.navigate(['/part-four/note-assignments/' + this.assignment._id]);
        break;
    }
  }

  onDelete() {
    this.loading = true;
    this.stuffService.deleteassignment(this.assignment._id).then(
      () => {
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
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
