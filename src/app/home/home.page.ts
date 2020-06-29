import { Component } from '@angular/core';
import { GlobalNewsService } from '../global-news.service';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { berita } from '../berita.model';
import { tag } from '../tag.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //menyimpan isi kategori berita
  // kategoriBerita = ['nasional','ekonomi','technology','kesehatan'];
  public beritaList : berita[] = [];
  public tagList : tag[] = [];
  public currentTagID : string = "None";

  constructor(
    public global:GlobalNewsService, 
    public router: Router
  ) {
    
  }

  goToBerita(beritaID : string){
    this.router.navigate(['/berita',beritaID]);
  }
  gotoEdit(beritaID : string){
    this.router.navigate(['/edit-news',beritaID]);
  }
  gotoDelete(beritaID : string){
    this.global.deleteBerita(beritaID);
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
  // onCategoryChange(category){
  //   console.log(category)
  // }
}
