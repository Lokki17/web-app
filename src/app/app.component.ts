import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from './services/http.service';
import {CoffeeCup, CoffeeKind, Order} from './factory/coffee.factory';
import {ModalDirective} from 'ngx-bootstrap';
import {AppSettings} from './app.settings';

@Component({
    selector: 'app-root',
    template: `
        <div>
            <p>Поиск по названию и описанию</p>
            <input type="text" [(ngModel)]="request"/>
            <button (click)="refresh(request, '?key=')">Поиск</button>
        </div>
        <br>
        <button (click)="refresh()">Получить список сортов кофе</button>
        <div [hidden]="!(coffeeKinds.length > 0)">
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
                    <td><input type="number" required [(ngModel)]="kind.count"></td>
                    <div [hidden]="checkInput(kind)">
                        <td>Введено некорректное значение</td>
                    </div>
                </tr>
            </table>
        </div>
        <div [hidden]="!userName">
            <p>Ваше имя: {{userName}}</p>
        </div>
        <div [hidden]="!address">
            <p>Ваш адрес: {{address}}</p>
        </div>
        <div [hidden]="!address || !userName">
            <button (click)="createOrder()">Сделать заказ</button>
        </div>
        <button (click)="openModal()">Введите свое имя и адрес</button>
        <div bsModal #modalWindow="bs-modal" class="modal fade">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left">Форма ввода данных клиента</h4>
                        <button type="button" class="close pull-right" (click)="modalWindow.hide()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <p>Введите свое имя</p>
                            <input type="text" [(ngModel)]="userName"/>
                            <div [hidden]="checkString(userName)">
                                <td>Введено некорректное значение</td>
                            </div>
                            <p>Введите свой адрес</p>
                            <input type="text" [(ngModel)]="address"/>
                            <div [hidden]="checkString(address)">
                                <div [hidden]="checkString(address)">
                                    <td>Введено некорректное значение</td>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./app.component.css'],
    providers: [HttpService, ModalDirective]
})
export class AppComponent implements OnInit {
    @ViewChild('modalWindow') private modalWindow: ModalDirective;
    hidden = false;
    request;
    userName;
    address;
    coffeeKinds: CoffeeKind[] = [];
    coffeeCups: CoffeeCup[] = [];

    constructor(private httpService: HttpService) {
    }

    ngOnInit(): void {
    }

    refresh(param: string, key: string): void {
        if (param !== undefined) {
            param = key + param;
        }
        this.httpService.sendGet(AppSettings.URL_KINDS, param).subscribe((data) => this.coffeeKinds = data);
    }

    createOrder(): void {
        console.log(AppSettings.URL_ORDERS);
        for (const kind of this.coffeeKinds) {
            if (kind.count) {
                this.coffeeCups.push(new CoffeeCup(kind.name, kind.count));
            }
        }
        this.httpService.sendPost(AppSettings.URL_ORDERS, new Order(this.userName, this.address, this.coffeeCups));
    }

    checkInput(value: any): boolean {
        if (value.count !== undefined && (value.count < 0 || value.count % 1 !== 0)) {
            return false;
        } else {
            return true;
        }
    }

    checkString(value: string): boolean {
        return value === undefined || value.length > 5;
    }

    openModal() {
        this.modalWindow.show();
    }
}
