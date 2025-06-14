import { Injectable } from '@angular/core';
import { ToastMessageOptions } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private toast$: BehaviorSubject<ToastMessageOptions> = new BehaviorSubject(<ToastMessageOptions>{})
  constructor() { }
  public getToas$() {
    return this.toast$.asObservable()
  }
  public addToas$(toas: ToastMessageOptions) {
    this.toast$.next(toas)
  }
}
