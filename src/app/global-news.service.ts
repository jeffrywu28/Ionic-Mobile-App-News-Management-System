import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { berita } from './berita.model';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { tag } from './tag.model';
import { user } from './user.model';
import { map } from 'rxjs/operators';
import { comment } from './comment.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GlobalNewsService {
  beritaCol : AngularFirestoreCollection<berita>;
  tagCol : AngularFirestoreCollection<tag>;
  userCol : AngularFirestoreCollection<user>;
  commentCol: AngularFirestoreCollection<comment>;

  constructor(private fireStore:AngularFirestore) { 
    this.beritaCol = this.fireStore.collection<berita>('berita');
    this.tagCol = this.fireStore.collection<tag>('tag');
    this.userCol = this.fireStore.collection<user>('user');
    this.commentCol = this.fireStore.collection<comment>('comment');
  }

  addBerita(berita : berita){
    this.beritaCol.add(berita);
  }
  deleteBerita(idberita : string){
    this.beritaCol.doc(idberita).delete();
  }
  updateBerita(beritaKey:string, berita: berita){
    this.beritaCol.doc(beritaKey).update(
      {
        judul : berita.judul,
        uploader: berita.uploader,
        editor: berita.editor,
        uploadDate: berita.uploadDate,
        isi: berita.isi,
        tagID: berita.tagID
      }
    );
  }
  getBeritaByID(id: string):AngularFirestoreDocument<berita>{
    return this.beritaCol.doc(id);
  }
  getAllBerita(){
    return this.beritaCol.snapshotChanges();
  }

  addTag(tag: tag){
    this.tagCol.doc(tag.tagID).set(tag);
  }
  deleteTag(tag: tag){
    this.tagCol.doc(tag.tagID).delete();
  }
  updateTag(tag: tag){
    this.tagCol.doc(tag.tagID).update(
      {
        tagName: tag.tagName,
        tagDescription: tag.tagDescription        
      }
    );
  }
  getTagByID(tagID: string):AngularFirestoreDocument<tag>{
    return this.tagCol.doc(tagID);
  }
  getAllTags(){
    return this.tagCol.snapshotChanges();
  }

  addUser(user: user){
    this.userCol.doc(user.email).set(user);
  }
  deleteUser(user: user){
    this.userCol.doc(user.email).delete();
  }
  updateUser(user:user){
    this.userCol.doc(user.email).update(
      {
        username: user.username,
      }
    );
  }
  getUserInfo(email:string):AngularFirestoreDocument<user>{
    return this.userCol.doc(email);
  }

  addComment(comment: comment){
    return this.commentCol.add(comment);
  }
  updateComment(commentKey: string, comment: comment){
    return this.commentCol.doc(commentKey).update(
      {
        targetBeritaKey: comment.targetBeritaKey,
        submitterKey: comment.submitterKey,
        comment: comment.comment,
        submitDate: comment.submitDate,
      }
    );
  }
  getAllComments(){
    return this.commentCol.snapshotChanges();
  }
  getCommentByID(commentKey: string){
    return this.commentCol.doc(commentKey);
  }
  deleteComment(commentKey: string){
    return this.commentCol.doc(commentKey).delete();
  }
}
