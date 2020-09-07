import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { DataServiceService } from '../data-service.service';
import { title } from 'process';

export const queryUpload = gql`
  mutation insertVideo($userID : ID!, $title: String, $thumbnail: String, $day: Int, $month: Int, $year: Int, $description: String, $sourceLink: String, $category: String,$videoLength: Int, $location: String, $premium: Boolean, $restriction: Boolean){
    createVideo(input:{
      userID: $userID
      title: $title
      thumbnail: $thumbnail
      day: $day
      Month: $month
      Year: $year
      descriptions: $description
      sourceLink: $sourceLink
      category: $category
      VideoLength: $videoLength
      location: $location
      premium: $premium
      restriction: $restriction
    }){
      videoID
    }
  }
  `

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.sass']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  user: any
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  image : File
  thumbnailURL: string
  message: string

  title: string
  description: string
  day: number
  month: number
  year: number
  location: string
  category: string
  videoLength: number
  premium: Boolean
  restriction: Boolean


  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private apollo: Apollo, private data: DataServiceService) { }

  ngOnInit() {
    this.startUpload();
    this.message = localStorage.getItem('userID')
    this.user = JSON.parse(localStorage.getItem("user"))
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  uploadImage(files: FileList){
    this.image = files.item(0)
    const path = `thumbnail/${Date.now()}_${this.image.name}`
    const ref = this.storage.ref(path)
    this.task = this.storage.upload(path, this.image)
    this.task.snapshotChanges().pipe(
      finalize( async() => {
        this.thumbnailURL = await ref.getDownloadURL().toPromise();
      })
    ).subscribe(url => {
      if(url){
        console.log(url)
      }
    })
  }

  inputValidation(){
    var elementTitle = document.getElementById('title')
    var elementDescription = document.getElementById('description')
    var elementCategory = document.getElementById('category')
    var elementLocation = document.getElementById('location')
    var elementPremium = document.getElementById('premium')
    var elementRestriction = document.getElementById('restriction')

    this.title = (elementTitle as HTMLInputElement).value
    this.description = (elementDescription as HTMLTextAreaElement).value

    var sel = (elementCategory as HTMLSelectElement).selectedIndex
    this.category = (elementCategory as HTMLSelectElement).options[sel].value

    sel = (elementLocation as HTMLSelectElement).selectedIndex
    this.location = (elementLocation as HTMLSelectElement).options[sel].value

    this.premium = (elementPremium as HTMLInputElement).checked
    this.restriction = (elementRestriction as HTMLInputElement).checked

    var date = new Date()
    this.day = date.getDate()
    this.month = date.getMonth()
    this.year = date.getFullYear()

    if(this.title == ""){
      alert("Upload failed, title must be filled !")
      return
    }else{
      this.insertToDatabase()
      alert("upload success")
    }
  }

  insertToDatabase(){
    this.apollo.mutate({
      mutation: queryUpload, variables: {
        userID: localStorage.getItem('userID'),
        title: this.title,
        thumbnail: this.thumbnailURL,
        day: this.day,
        month: this.month,
        year: this.year,
        description: this.description,
        sourceLink: this.downloadURL,
        category: this.category,
        videoLength: 300,
        location: this.location,
        premium: this.premium,
        restriction: this.restriction
      }
    }).subscribe(result => console.log("success"))
  }
}
