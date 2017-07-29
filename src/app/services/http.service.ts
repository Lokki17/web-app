

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
    public error: any;
    constructor(private http: Http) {
    }

    public sendGet(url: string, param: string) {
        if (param !== undefined) {
            url = url + param;
        }
        return this.http.get(url)
            .map(response => {
                return <any[]>response.json();
            })
            .catch((error) => {
                return this.handleError(error);
            });
    }

    sendPost(query: string, data: any): Observable<any> {
        this.error = {};
        return this.http.post(query, data).map(this.extractData).catch((error) => {
            return this.handleError(error);
        });
    }
    private extractData(res: Response | any) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }

    // рабочий
    // sendPost(query: string, data: any) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     this.error = {};
    //     return this.http.post(query, data, options).map(res => this.extractData(res)).subscribe(d => console.log(d));
    // }


}
