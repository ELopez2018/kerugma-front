import { Injectable } from '@angular/core';
import { Congregation } from '../../interfaces/congregation.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongregationDataService {
  private congregation$: BehaviorSubject<Congregation> = new BehaviorSubject(<Congregation>{})
  private congregations$: BehaviorSubject<Congregation[]> = new BehaviorSubject(<Congregation[]>[])
  private congregations: Congregation[] = []
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

  public setCongregations(congregations: Congregation[]): void {
    this.congregations = congregations
    this.congregations$.next(this.congregations)
  }
  public getCongregations$(): Observable<Congregation[]> {
    this.congregations$.next(this.congregations)
    return this.congregations$.asObservable();
  }

}
