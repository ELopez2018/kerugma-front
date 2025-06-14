import { Injectable } from '@angular/core';
import { Congregation } from '../../interfaces/congregation.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongregationDataService {
  private congregation$: BehaviorSubject<Congregation> = new BehaviorSubject(<Congregation>{})
  private congregation!: Congregation
  constructor() { }
  public setCongregation(congregation: Congregation): void {
    this.congregation = congregation;
    this.congregation$.next(this.congregation)
  }
  public getCongregation$(): Observable<Congregation> {
    this.congregation$.next(this.congregation)
    return this.congregation$.asObservable();
  }

}
