import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { StuffListComponent } from './part-one/stuff-list/stuff-list.component';
import { NewEditAssignmentComponents } from './part-one/edit-assignment/edit-assignment.component';
import { SingleAssignmentComponent } from './part-one/single-assignment/single-assignment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { AddAssignmentComponent } from './part-four/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './part-four/edit-assignment/edit-assignment.component';

import { NoteAssignmentComponent } from './part-four/note-assignments/note-assignments.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PartOneComponent,
    PartThreeComponent,
    PartFourComponent,
    DefaultComponent,
    HeaderComponent,
    StuffListComponent,
    NewEditAssignmentComponents,
    SingleAssignmentComponent,
    NoteAssignmentComponent,
    LoginComponent,
    SignupComponent,
    AddAssignmentComponent,
    EditAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
