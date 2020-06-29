import { Component, OnInit } from '@angular/core';
import {auth} from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'
import {AngularFireAuth} from '@angular/fire/auth'
import { berita } from '../berita.model';
import { tag } from '../tag.model';
import { GlobalNewsService } from '../global-news.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { user } from '../user.model';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public beritaList : berita[] = [];
  public tagList : tag[] = [];
  public currentTagID : string = "None";
  allet: any
  show = false;
  tdelete = false;
  public userObservable : Observable<user>;
  public currentUser : user = {
    email : "",
    role: 0,
    username: ""
  };

  constructor(public afAuth: AngularFireAuth,private alert : AlertController,private router: Router, public global:GlobalNewsService) { }

  // ngOnInit() {
  // }
  //get current user
  user = firebase.auth().currentUser.email;

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
  ngOnInit() {
  }
  
  goToBerita(beritaID : string){
    this.router.navigate(['/berita',beritaID]);
  }
  addBerita(){
    this.router.navigate(['/addberita']);
  }
  logout(){
    this.afAuth.signOut();
    this.router.navigate(['home'])
  }
  gotoEdit(beritaID : string){
    this.router.navigate(['/edit-news',beritaID]);
  }
  gotoDelete(beritaID : string){
    // this.global.deleteBerita(beritaID);
    // this.AllertAll("Success","Berita Deleted!")
    // let alet = this.alert.create({
    //   message: 'Do you want to delete?',
    //   buttons:[
    //     {
    //       text: 'cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         this.AllertAll("Success","Berita Not Deleted!");
    //       }
    //     },
    //     {
    //       text: 'Confirm',
    //       role: 'confirm',
    //       handler: () => {
    //         this.tdelete = true;
    //         this.AllertAll("Success","Berita Deleted!");
    //       }
    //     }
    //   ]
    // });
    this.AllertDel(beritaID);
    this.router.navigate(['/home']);
  }

  ionViewWillEnter() {
    this.listAllBerita();
    this.global.getAllTags().subscribe(
      tagAction => {
        this.tagList = tagAction.map(
          tag => {
            return {
              tagID: tag.payload.doc.id,
              tagName: tag.payload.doc.data()['tagName'],
              tagDescription: tag.payload.doc.data()['tagDescription']
            }
          }
        );
      }
    );
    this.loadUserRole();
  }

  listAllBerita(){
    this.global.getAllBerita().subscribe(
      data => {
        this.beritaList = data.map(
          berita => {
            return {
              id: berita.payload.doc.id,
              editMode: false,
              judul: berita.payload.doc.data()['judul'],
              uploader: berita.payload.doc.data()['uploader'],
              editor: berita.payload.doc.data()['editor'],
              uploadDate: berita.payload.doc.data()['uploadDate'],
              isi: berita.payload.doc.data()['isi'],
              tagID: berita.payload.doc.data()['tagID']
            }
          }
        );
      }
    );
  }

  searchByTitle(searchPhrase: string){
    this.global.getAllBerita().subscribe(
      data => {
        this.beritaList = data.map(
          berita => {
            return {
              id: berita.payload.doc.id,
              editMode: false,
              judul: berita.payload.doc.data()['judul'],
              uploader: berita.payload.doc.data()['uploader'],
              editor: berita.payload.doc.data()['editor'],
              uploadDate: berita.payload.doc.data()['uploadDate'],
              isi: berita.payload.doc.data()['isi'],
              tagID: berita.payload.doc.data()['tagID']
            }
          }
        ).filter(
          berita => {
            return berita.judul.toLowerCase().includes(searchPhrase.toLowerCase())
          }
        );
      }
    );
  }

  filterByTagID(tagIDFilter: string){
    this.global.getAllBerita().subscribe(
      data => {
        this.beritaList = data.map(
          berita => {
            return {
              id: berita.payload.doc.id,
              judul: berita.payload.doc.data()['judul'],
              uploader: berita.payload.doc.data()['uploader'],
              editor: berita.payload.doc.data()['editor'],
              uploadDate: berita.payload.doc.data()['uploadDate'],
              isi: berita.payload.doc.data()['isi'],
              tagID: berita.payload.doc.data()['tagID']
            }
          }
        ).filter(
          berita => {
            return berita.tagID.includes(tagIDFilter);
          }
        );
      }
    );
  }
  async AllertDel(beritaID: string){
    this.allet = await this.alert.create({
      message: 'Do you want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            // console.log('Cancel clicked');
            // this.tdelete = false;
            this.AllertAll("Success","Berita Not Deleted!");
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // this.tdelete = true;
            // console.log('Buy clicked');
            this.global.deleteBerita(beritaID);
            this.AllertAll("Success","Berita Deleted!");
          }
        }
      ]
    });
    await this.allet.present();
    // if(this.tdelete == true){
    //   this.global.deleteBerita(beritaID);
    //   this.AllertAll("Success","Berita Deleted!");
    // }else{
    //   this.AllertAll("Success","Berita Not Deleted!");
    // }
  }
  async AllertAll(header:string, message:string){
    this.allet = await this.alert.create({
      header:header,
      message:message,
      buttons: ['ok']
    })
    await this.allet.present()
  }
  // toggleDetails(data) {
  //   if (data.showDetails) {
  //       data.showDetails = false;
  //       data.icon = 'ios-add-circle-outline';
  //   } else {
  //       data.showDetails = true;
  //       data.icon = 'ios-remove-circle-outline';
  //   }
  // }

  showNews(){
    if(this.show == true){
      this.show = false
    } 
    else if(this.show == false){
      this.show = true
    }
  }
}
