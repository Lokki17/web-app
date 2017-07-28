

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
    public error: any;
    constructor(private http: Http) {
    }
    static handleError(error: any) {
        console.error(error);
        return Observable.throw(error);
    }

    public getCoffeeKinds(url: string, param: string) {
        const params: URLSearchParams = new URLSearchParams();
        if (param !== undefined) {
            params.set('search', param);
        }
        return this.http.get(url, params)
            .map(response => {
                return <any[]>response.json();
            })
            .catch(HttpService.handleError);
    }

    private extractData(res: Response | any) {
        const body = res.json();
        return body || {};
    }


}
