import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/http.service';
import {CoffeeKind} from './factory/coffee.factory';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})
export class AppComponent implements OnInit {
    title = 'app';
    coffeeKinds: CoffeeKind[] = [];

    constructor(private httpService: HttpService) {
    }

    ngOnInit(): void {
        this.httpService.getCoffeeKinds().subscribe((data) => this.coffeeKinds);
        throw new Error('Method not implemented.');
    }

}
