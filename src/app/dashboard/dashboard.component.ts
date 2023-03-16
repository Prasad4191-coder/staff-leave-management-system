import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DashService } from './service/dash.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  leaveForm: FormGroup | any;
  getHod = false;
  getStaff = false;
  displayModal: boolean = false;
  satffDataAll: any;
  staffData: any;
  dataForHod: any;
  user: any;
  totleLeave: any;
  satffData: any = [];
  approvedLeave: any = 0;
  buttonId: any;
  rejectLeave: any = 0;
  pendingLeave: any = 0;
  constructor(private dashServ: DashService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      from: this.fb.control('', Validators.required),
      to: this.fb.control('', Validators.required),
      reason: this.fb.control('', Validators.required),
      numOfDay: this.fb.control('1'),
      leaveStatus: this.fb.control('Pending'),
    })
    setTimeout(() => {
      this.leavesDay()
    }, 1000)
    this.user = this.dashServ.sendData()
    if (this.user == 'HOD') {
      this.getHod = !this.getHod
    } else {
      this.staffData = this.user
      this.getStaff = true
    }
    this.hodData()
    this.DataForStaff()
  }
  showModalDialog() {
    this.displayModal = true;
  }
  hodData() {
    this.dashServ.leaveData().pipe(map((data: any) => {
      const stdArr = [];
      for (let std in data) {
        stdArr.push({ ...data[std], id: std })
      }
      return stdArr
    })).subscribe((dataForHOD: any) => {
      this.dataForHod = dataForHOD
    })
  }
  DataForStaff() {
    this.dashServ.dataForStaff().pipe(map((data: any) => {
      const stdArr = [];
      for (let std in data) {
        stdArr.push({ ...data[std], id: std })
      }
      return stdArr
    })).subscribe((staffDataCard: any) => {
      for (let card of staffDataCard) {
        if (this.staffData.userName == card.userName) {
          this.satffData.push(card)
        }
      }
    })
  }
  leavesDay() {
    for (let card of this.satffData) {
      if (card.leaveStatus == 'Rejected') {
        this.rejectLeave += card.numOfDay
      } else if (card.leaveStatus == 'Approved') {
        this.approvedLeave += card.numOfDay
      } else if (card.leaveStatus == 'Pending') {
        this.pendingLeave += card.numOfDay
      }
    }
  }
  leaveStatus(card: any, status: any) {
    const id = card.id
    const val = {
      leaveStatus: status
    }
    this.dashServ.updateStatusInDb(id, val)
    setTimeout(() => {
      this.hodData()
    }, 1000)
    if (status == 'Approved') {
      card.leaveStatus = 'Approved'
    } else {
      this.flag = 'Rejected'
      card.leaveStatus = 'Rejected'
    }
  }
   submit() {
    const from = new Date(this.leaveForm.value.from);
    const to = new Date(this.leaveForm.value.to);
    const time = to.getTime() - from.getTime();
    const day = time / (1000 * 3600 * 24);
    this.leaveForm.value.numOfDay = day
    this.satffDataAll = {
      ...this.leaveForm.value,
      ...this.staffData
    }
    this.satffData.push(this.satffDataAll)
    this.dashServ.postDataToDb(this.satffDataAll)
    this.displayModal = false;
    this.leaveForm.reset()
  }
  logout() {
    this.router.navigate(['/login'])
  }
}
