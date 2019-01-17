import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root"
})
export class MatchService {
  constructor(private http: HttpClient) {}

  public add(fd: FormData): Observable<any> {
    const url = "https://match-images.herokuapp.com/api/"

    return this.http.post<any>(`${url}matches/`, fd)
  }
}
