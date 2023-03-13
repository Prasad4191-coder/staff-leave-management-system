import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  fbDblinkLeave: any = "https://task5-1987b-default-rtdb.firebaseio.com/leave.json"
  userData: any;
  constructor(private http: HttpClient, private authServ: AuthService) { }
  sendData() {
    return this.authServ.dataForUser()
  }
  postDataToDb(data: any) {
    return this.http.post(this.fbDblinkLeave, data)
  }
  leaveData() {
    return this.http.get(this.fbDblinkLeave)
  }
  dataForStaff() {
    return this.http.get(this.fbDblinkLeave)
  }
  updateStatusInDb(id: any, value: any) {
    return this.http.patch(`https://task5-1987b-default-rtdb.firebaseio.com/leave/` + id + `.json`, value)
  }
}
