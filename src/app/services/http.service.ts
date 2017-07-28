

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

    public sendGet(url: string, param: string) {
        if (param !== undefined) {
            url = url + param;
        }
        console.log(param);
        return this.http.get(url)
            .map(response => {
                return <any[]>response.json();
            })
            .catch((error) => {
                return this.handleError(error);
            });
    }

    sendPost(query: string, data: any, headersValue?: any): Observable<any> {
        console.log('QUERY');
        console.log(data.coffeeCups.length);
        console.log(data.coffeeCups[0].coffeeKind);
        console.log(data.coffeeCups[0].count);
        console.log(data.coffeeCups[1].coffeeKind);
        console.log(data.coffeeCups[1].count);
        console.log(data.coffeeCups[2].coffeeKind);
        console.log(data.coffeeCups[2].count);
        console.log(data.coffeeCups[3].coffeeKind);
        console.log(data.coffeeCups[3].count);
        console.log(data.coffeeCups[4].coffeeKind);
        console.log(data.coffeeCups[4].count);
        console.log(data.userName);
        console.log(data.address);
        this.error = {};
        console.log('POST');
        return this.http.post(query, data).map(() => this.extractData).catch((error) => {
            console.log('lambda');
            return this.handleError(error);
        });
    }

    private extractData(res: Response | any) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error);
    }


}
