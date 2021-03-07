import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { StuffListComponent } from './part-one/stuff-list/stuff-list.component';
import { NewEditAssignmentComponents } from './part-one/edit-assignment/edit-assignment.component';
import { SingleAssignmentComponent } from './part-one/single-assignment/single-assignment.component';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { AddAssignmentComponent } from './part-four/add-assignment/add-assignment.component';
import {NoteAssignmentComponent} from './part-four/note-assignments/note-assignments.component'
import { EditAssignmentComponent } from './part-four/edit-assignment/edit-assignment.component';


const routes: Routes = [
  { path: 'part-one', component: PartOneComponent,
    children: [
      { path: 'add-assignment', component: AddAssignmentComponent },
      { path: 'all-stuff', component: StuffListComponent },
      { path: 'assignment/:id', component: SingleAssignmentComponent },
      { path: 'edit-assignment/:id', component: EditAssignmentComponent },
      {path:'note-assignments/:id', component:NoteAssignmentComponent, canActivate:[AuthGuard]},
      { path: '', pathMatch: 'full', redirectTo: 'all-stuff' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'part-three', component: PartThreeComponent,
    children: [
      { path: 'add-assignment', component: NewEditAssignmentComponents, canActivate: [AuthGuard] },
      { path: 'all-stuff', component: StuffListComponent, canActivate: [AuthGuard] },
      { path: 'assignment/:id', component: SingleAssignmentComponent, canActivate: [AuthGuard] },
      { path: 'edit-assignment/:id', component: EditAssignmentComponent, canActivate: [AuthGuard] },
      {path:'note-assignments/:id', component:NoteAssignmentComponent, canActivate:[AuthGuard]},
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'part-four', component: PartFourComponent,
    children: [
      { path: 'new-assignment', component: AddAssignmentComponent, canActivate: [AuthGuard] },
      { path: 'all-stuff', component: StuffListComponent, canActivate: [AuthGuard] },
      { path: 'assignment/:id', component: SingleAssignmentComponent, canActivate: [AuthGuard] },
      { path: 'edit-assignment/:id', component: EditAssignmentComponent, canActivate: [AuthGuard] },
      {path:'note-assignments/:id', component:NoteAssignmentComponent, canActivate:[AuthGuard]},
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'all-stuff' }
    ]
  },
  { path: 'default', component: DefaultComponent },
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
