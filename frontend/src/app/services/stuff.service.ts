import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Assignment } from '../models/Assignment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(private http: HttpClient) {}

  private stuff: Assignment[] = [
    {
      _id: '324sdfmoih3',
      nom: 'Mon objet',
      dateRendu: new Date('2021-12-13'),
      auteur: 'A propos de mon objet',
      imageUrl: 'https://c.pxhere.com/photos/30/d6/photographer_camera_lens_slr_photography_hands-1079029.jpg!d',
      remarques: 'A propos de mon objet',
      note:10,
      userId: 'will'
    },
    {
      _id: '324sdfmoih4',
      nom: 'Mon objet 2',
      dateRendu: new Date('2021-12-13'),
      auteur: 'A propos de mon objet',
      imageUrl: 'https://c.pxhere.com/photos/30/d6/photographer_camera_lens_slr_photography_hands-1079029.jpg!d',
      remarques: 'A propos de mon objet',
      note:10,
      userId: 'will'
    },
  ];
  public stuff$ = new Subject<Assignment[]>();

  getStuff() {
    this.http.get('http://localhost:3000/api/stuff').subscribe(
      (stuff: Assignment[]) => {
        if (stuff) {
          this.stuff = stuff;
          this.emitStuff();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitStuff() {
    this.stuff$.next(this.stuff);
  }

  getassignmentById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/stuff/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewassignment(assignment: Assignment) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/stuff', assignment).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewassignmentWithFile(assignment: Assignment, image: File) {
    return new Promise((resolve, reject) => {
      const assignmentData = new FormData();
      assignmentData.append('assignment', JSON.stringify(assignment));
      assignmentData.append('image', image, assignment.nom);
      this.http.post('http://localhost:3000/api/stuff', assignmentData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyassignment(id: string, assignment: Assignment) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/stuff/' + id, assignment).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyassignmentWithFile(id: string, assignment: Assignment, image: File | string) {
    return new Promise((resolve, reject) => {
      let assignmentData: Assignment | FormData;
      if (typeof image === 'string') {
        assignment.imageUrl = image;
        assignmentData = assignment;
      } else {
        assignmentData = new FormData();
        assignmentData.append('assignment', JSON.stringify(assignment));
        assignmentData.append('image', image, assignment.nom);
      }
      this.http.put('http://localhost:3000/api/stuff/' + id, assignmentData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteassignment(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/stuff/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
