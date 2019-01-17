import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root"
})
export class MatchService {
  constructor(private http: HttpClient) {}

  public add(match: any): Observable<any> {
    // const url = "https://match-images.herokuapp.com/api/"
    const url = "http://localhost:8000/api/"
    // const url = "/api/"

    const fd = new FormData()
    fd.append("image", match.image, match.image.name)
    fd.append("collection", match.collection)
    console.log(fd)
    return this.http.post<any>(`${url}matches/`, fd)
    // return this.http.get<any>(`${url}collections/`)
  }
}
