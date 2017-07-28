import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/http.service';
import {CoffeeKind} from './factory/coffee.factory';

@Component({
    selector: 'app-root',
    template: `
        <table>
            <tr>
                <th>Id</th>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Количество</th>
            </tr>
            <tr *ngFor="let kind of coffeeKinds">
                <td>{{kind.id}}</td>
                <td>{{kind.name}}</td>
                <td>{{kind.price}}</td>
                <td><input type="number" min="0" required>
                    <div></div>
                </td>
            </tr>
            <div>
                <p>Ваше имя: {{name}}</p>
            </div>
            <div [hidden]="address">
                <p>Ваш адрес: {{address}}</p>
            </div>
        </table>
        <button [disabled]="hidden">Сделать заказ</button>
        <button>Введите свое имя и адрес</button>
        `,
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})
export class AppComponent implements OnInit {
    hidden = true;
    title = 'app';
    name = 'Вася';
    address;
    coffeeKinds: CoffeeKind[] = [];

    constructor(private httpService: HttpService) {
        console.log('Test');
    }

    ngOnInit(): void {
        this.httpService.getCoffeeKinds().subscribe((data) => this.coffeeKinds = data);
        console.log(this.coffeeKinds);
    }
}
