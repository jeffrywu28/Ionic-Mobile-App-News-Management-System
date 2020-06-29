import { Component, OnInit } from '@angular/core';
import { GlobalNewsService } from '../global-news.service';
import { berita } from '../berita.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase';
import { tag } from '../tag.model';
@Component({
  selector: 'app-addberita',
  templateUrl: './addberita.page.html',
  styleUrls: ['./addberita.page.scss'],
})
export class AddberitaPage implements OnInit {

  user = firebase.auth().currentUser.email;
  beritabaru: berita;
  judulberita: string;
  namaeditor: string;
  isiberita: string;
  tagberita: string[];
  date: Date;
  public tagList: tag[] = [];
  allet: any;

  constructor(
    public global: GlobalNewsService,
    private router: Router,
    private alert : AlertController
  ) {
    this.beritabaru = {
      id: "",
      judul: "",
      uploader: "",
      editor: "",
      uploadDate: new Date,
      isi: "",
      tagID: []
    }
  }

  loadTagList() {
    this.global.getAllTags().subscribe(
      data => {
        this.tagList = data.map(
          tagRead => {
            return tagRead.payload.doc.data();
          }
        );
      }
    );
  }

  ngOnInit() {
    this.loadTagList();
  }

  simpandata() {
    this.beritabaru = {
      id: "",
      judul: this.judulberita,
      uploader: this.user,
      editor: "",
      uploadDate: new Date,
      isi: this.isiberita,
      tagID: this.tagberita
    }

    try {
      this.global.addBerita(this.beritabaru);
      this.AllertAll("Success","Add Berita Berhasil!")
    } catch (err) {
      this.AllertAll("Error","Input kurang")
    }
    
  }

  async AllertAll(header:string, message:string){
    this.allet = await this.alert.create({
      header:header,
      message:message,
      buttons: ['ok']
    })
    await this.allet.present()
  }

  //   console.log(this.beritabaru);
  //   this.global.addBerita(this.beritabaru);
  //   this.router.navigate(['/home']);
  // }
  discard() {
    this.router.navigate(['/home']);
  }
}
