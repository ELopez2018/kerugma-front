import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private user$: BehaviorSubject<User> = new BehaviorSubject(<User>{})
  private user!: User
  constructor() { }
  public setUser(user: User): void {
    this.user = user;
    this.user$.next(this.user)
  }
  public getUser$(): Observable<User> {
    this.user$.next(this.user)
    return this.user$.asObservable();
  }
}
