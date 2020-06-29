import { Component, OnInit } from '@angular/core';
import { berita } from '../berita.model';
import { Observable } from 'rxjs';
import { GlobalNewsService } from '../global-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { tag } from '../tag.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.page.html',
  styleUrls: ['./edit-news.page.scss'],
})
export class EditNewsPage implements OnInit {

  public beritaRead: berita;
  public beritaObservable: Observable<berita>;
  public beritaKey: string = "";
  public tagList: tag[] = [];
  public allet: any;

  constructor(
    public global: GlobalNewsService,
    private route: ActivatedRoute,
    private alert: AlertController,
    private router: Router) {
    this.beritaRead = {
      id: "",
      judul: "",
      uploader: "",
      editor: "",
      uploadDate: new Date,
      isi: "",
      tagID: []
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('idBerita')) {
          return;
        }
        this.beritaKey = paramMap.get('idBerita');
      }
    );
  }

  getBerita(): AngularFirestoreDocument<berita> {
    return this.global.getBeritaByID(this.beritaKey);
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

  ionViewWillEnter() {
    this.loadTagList();
    this.beritaObservable = this.getBerita().valueChanges();
    console.log(this.beritaObservable);
    this.beritaObservable.subscribe(
      berita => {
        this.beritaRead = berita;
      }
    );
  }

  saveEdit() {

    try {
      this.beritaRead.editor = firebase.auth().currentUser.email;
      console.log(this.beritaRead);
      this.global.updateBerita(this.beritaKey, this.beritaRead);
      this.AllertAll("Success", "Berita Berhasil Diedit!")
      this.router.navigate(['/home']);
      
    } catch (err) {
      this.AllertAll("Error", "Input Salah atau berita tidak ada")
    }


  }

  discard() {
    this.router.navigate(['/home']);
  }

  async AllertAll(header: string, message: string) {
    this.allet = await this.alert.create({
      header: header,
      message: message,
      buttons: ['ok']
    })
    await this.allet.present()
  }
}
