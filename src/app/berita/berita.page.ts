import { Component, OnInit } from '@angular/core';
import { berita } from '../berita.model';
import { Observable } from 'rxjs';
import { GlobalNewsService } from '../global-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { comment } from '../comment.model';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { user } from '../user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-berita',
  templateUrl: './berita.page.html',
  styleUrls: ['./berita.page.scss'],
})
export class BeritaPage implements OnInit {

  public beritaRead: berita;
  public beritaObservable: Observable<berita>;
  public beritaID: string = "";
  public commentList = [];
  public commentMode : boolean = false;
  public commentName: string = "";
  public comment : string = "";
  public currentUser : user = {
    email : "",
    role: 0,
    username: ""
  };
  public userObservable : Observable<user>;
  alert: any;
  public deleteMode = true;
  user : string;

  constructor(
    public global: GlobalNewsService,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    private alertController : AlertController
  ) { 
    this.beritaRead = {
      id: "",
      judul: "",
      uploader: "",
      editor: "",
      uploadDate: new Date,
      isi: "",
      tagID: [""]
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('idBerita')) {
          return;
        }
        this.beritaID = paramMap.get('idBerita');
      }
    );
    try {
      this.user = firebase.auth().currentUser.email;
    } catch (error) {
      this.user = '';
    }
  }

  getBerita() : AngularFirestoreDocument<berita>{
    return this.global.getBeritaByID(this.beritaID);
  }

  ionViewWillEnter() {
    this.loadBerita();
    this.loadComments();
    console.log(`Current email: ${this.user}`);
    this.loadUserRole();
  }

  loadUserRole(){
    if (this.user != '') {
      this.userObservable = this.global.getUserInfo(this.user).valueChanges();
      this.userObservable.subscribe(
        curUser => {
          this.currentUser = curUser;
        }
      );
    }
  }

  toggleDeleteMode(){
    if (this.currentUser.role > 0) {
      this.deleteMode = !this.deleteMode;
    }
    console.log(this.deleteMode);
  }

  toggleCommentMode(){
    this.commentMode = !this.commentMode;
    this.commentName = "";
    this.comment = "";
  }

  loadBerita(){
    this.beritaObservable = this.getBerita().valueChanges();
    // console.log(this.beritaObservable);
    this.beritaObservable.subscribe(
      berita => {
        this.beritaRead = berita;
        // console.log(this.beritaRead);
      }
    );
  }

  loadComments(){
    this.global.getAllComments().subscribe(
      action => {
        this.commentList = action.map(
          commentRead => {
            var name = commentRead.payload.doc.data()['submitterKey'];

            return {
              targetBeritaKey: commentRead.payload.doc.data()['targetBeritaKey'],
              submitterName: name,
              comment: commentRead.payload.doc.data()['comment'],
              submitDate: commentRead.payload.doc.data()['submitDate'],
              id: commentRead.payload.doc.id
            }
          }
        ).filter(
          comment => {
            // console.log(comment);
            return comment.targetBeritaKey == this.beritaID;
          }
        );
      }
    );
  }

  addComment(){
    console.log(firebase.auth().currentUser);
    try {
      var name = firebase.auth().currentUser.email;
    } catch (TypeError) {
      var name = this.commentName;
    }
    console.log(name);

    this.global.addComment(
      {
        comment: this.comment,
        submitDate: new Date(),
        submitterKey: name,
        targetBeritaKey: this.beritaID
      }
    );
    this.toggleCommentMode();
  }

  deleteComment(commentid: string){
    try {
      this.global.deleteComment(commentid);
      this.AlertAll("Success", "Komentar berhasil dihapus.")
    } catch (error) {
      this.AlertAll("Failure", "Komentar gagal dihapus. " + error.code);
    }
  }

  canDelete(){
    // try {
    //   var bool: boolean;
    //   var name = firebase.auth().currentUser.email;
    //   this.userObservable = this.global.getUserInfo(name).valueChanges();
    //   this.userObservable.subscribe(
    //     curUser => {
    //       this.currentUser = curUser;
    //       if (curUser.role > 0) bool = true;
    //     }
    //   );
    //   console.log(bool);
    // } catch (error) {
    //   return false;
    // }
  }
  
  async AlertAll(header:string, message:string){
    this.alert = await this.alertController.create({
      header:header,
      message:message,
      buttons: ['ok']
    })
    await this.alert.present()
  }
}
