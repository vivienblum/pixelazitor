import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root"
})
export class MatchService {
  constructor(private http: HttpClient) {}

  public add(match: any): Observable<any> {
    const url = "https://match-images.herokuapp.com/api/"
    return this.http.post<any>(`${url}match/`, match)
  }
}
