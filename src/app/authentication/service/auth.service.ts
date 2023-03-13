import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  firebasedDbLink: any = "https://task5-1987b-default-rtdb.firebaseio.com/user.json"
  constructor(private http: HttpClient) { }

  signUp(data: any) {
    return this.http.post(this.firebasedDbLink, data)
  }
  login() {
    return this.http.get(this.firebasedDbLink).pipe(map((logData: any) => {
      const stdArr = [];
      for (let std in logData) {
        stdArr.push({ ...logData[std], id: std })
      }
      return stdArr
    }))
  }
  userCheck(data: any) {
    this.user = data
  }
  dataForUser() {
    return this.user
  }
}
