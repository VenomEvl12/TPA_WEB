import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import gql from 'graphql-tag';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass']
})
export class UploaderComponent {

  constructor () {}

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

}
