import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {auth} from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import { GlobalNewsService } from '../global-news.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  allet: any
  user: string
  username: string
  password: string
  constructor(public afAuth: AngularFireAuth,private alert : AlertController,private route: Router, private global : GlobalNewsService) { }

  ngOnInit() {
  }

  async signup() {
    const {user,password, username} = this
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(user,password)
      this.global.userCol.doc(user).set(
        {
          email: user,
          role: 0,
          username: username
        }
      );
      this.AllertAll("Success","Akun anda sudah dibuat.")
      this.route.navigate(['login'])
    } catch (err) {
      if(err.code === "auth/email-already-in-use"){
        this.AllertAll("Error","User Sudah ada!")
      }else if (err.code === "auth/invalid-email"){
        this.AllertAll("Error","Format Email yang anda masukkan salah! isi dengan benar.")
      }else{
        this.AllertAll("Success",err.code)
      }
        
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

  clearForm(){
    this.password=''; this.user='', this.username='';
  }
}
