import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth, User} from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  allet: any
  user: string
  password: string
  constructor(public afAuth: AngularFireAuth,private alert : AlertController,private route: Router) {}

  ngOnInit() {
  }

  async login() {
    const {user,password} = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(user,password)
      this.AllertAll("Success","Login Success")
      this.route.navigate(['welcome'])
    } catch (err) {
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        this.AllertAll("Error","User Not Found!")
      }
      this.AllertAll("Error","Username/Password tidak sesuai")
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

}
