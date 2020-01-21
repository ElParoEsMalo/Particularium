import { Teacher } from './../../core/model/teacher';
import { Student } from './../../core/model/student';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/servers/auth/auth.service';
import { DataService } from 'src/app/servers/data/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class SingUpServiceService {
	private userReg: User = {};
	
	constructor(private afAuth: AuthService, private afStore: DataService,public alert: AlertController, private routesv: Router) {

	}

	async register() {
		this.afAuth.setUser(this.userReg);
		return await this.afAuth.register().then(() => {
			this.showAlert("Welcome", "Sign Up successfully!!")
			this.routesv.navigateByUrl('/tipo-usuario');//Siguiente registro
			
		}).catch((err) => {
			console.log(err);//Alerta
		});
	}
	
	async addStudent(student: Student) {
		this.afAuth.setUser(this.userReg);
		return await this.afStore.addUserProfile(this.afAuth.getAuth().currentUser.uid, student).then(() => {
			this.routesv.navigateByUrl('/profile');//Siguiente registro
		}).catch((err) => {
			console.log(err);//Alerta
		});
	}
	async addTeacher(teacher: Teacher) {
		this.afAuth.setUser(this.userReg);
		return await this.afStore.addUserProfile(this.afAuth.getAuth().currentUser.uid, teacher).then(() => {
			this.routesv.navigateByUrl('/profile');//Siguiente registro
		}).catch((err) => {
			console.log(err);//Alerta
		});
	}



    /**
     * Getter $userReg
     * @return {User }
     */
	public get $userReg(): User {
		return this.userReg;
	}

    /**
     * Setter $userReg
     * @param {User } value
     */
	public set $userReg(value: User) {
		this.userReg = value;
	}
	async showAlert(header: string , message: string){
		const alert = await this.alert.create({
		  header,
		  message, 
		  buttons: ["OK"]
		}) 
		await alert.present();
	   }

}
