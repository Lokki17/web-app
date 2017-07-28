

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {CoffeeKind} from '../factory/coffee.factory';

@Injectable()
export class HttpService {
    public error: any;
    constructor(private http: Http) {
    }
    static handleError(error: any) {
        console.error(error);
        return Observable.throw(error);
    }

    public getCoffeeKinds() {
        console.log('Test');
        return this.http.get('http://localhost:8080/kind')
            .map(response => {
                console.log('response');
                return <any[]>response.json();
            })
            .catch(HttpService.handleError);
    }

    private extractData(res: Response | any) {
        console.log('Test');
        const body = res.json();
        return body || {};
    }


}
