import { Injectable } from "@angular/core";
import { Matiere } from "../assignments/matiere.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MatieresService {
    matieres : Matiere[] = [];
    uri = environment.apiUrl + "/matiere";

    constructor(
        private http:HttpClient) { }

    getMatieres():Observable<Matiere[]>{
        return this.http.get<Matiere[]>(this.uri);
    }

    postMatiere(){
        return this.http.post(this.uri,{});
    }
}
