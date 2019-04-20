import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"
import { Match } from "../models/match"

@Injectable({
  providedIn: "root"
})
export class MatchService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  public add(fd: FormData) {
    return this.http.post<any>(`${this.baseUrl}/api/matches/`, fd)
  }

  public get(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/api/matches/${id}/`)
  }
}
