import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TurnRequestDTO, TurnResponseDTO } from "../../../../../../core/interfaces/interfaces";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TurnService {
  private turnList$: BehaviorSubject<TurnResponseDTO[]> = new BehaviorSubject<TurnResponseDTO[]>([]);
  private server = environment.SERVER;
  private httpClient = inject(HttpClient);
  constructor() {}

  public getAllTurnAvailables$() {
    const url = `${this.server}/turnos/disponibles`;
    return this.httpClient.get<TurnResponseDTO[]>(url).pipe(
      tap((response) => {
        this.turnList$.next(response);
      }),
    );
  }

  public saveTurn$(body: TurnRequestDTO) {
    const url = `${this.server}/turnos`;
    return this.httpClient.post<any>(url, body);
  }

  /* STORE*/
  public getTurnList$() {
    return this.turnList$.asObservable();
  }
  public addTurnList$(turnList: TurnResponseDTO[]) {
    this.turnList$.next(turnList);
  }
}
