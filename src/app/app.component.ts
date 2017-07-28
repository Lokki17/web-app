import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from './services/http.service';
import {CoffeeKind} from './factory/coffee.factory';
import {NameComponent} from './app.name';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-root',
    template: `
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
        <div [hidden]="!name">
            <p>Ваше имя: {{name}}</p>
        </div>
        <div [hidden]="!address">
            <p>Ваш адрес: {{address}}</p>
        </div>
        <button [disabled]="hidden">Сделать заказ</button>
        <button>Введите свое имя и адрес</button>
        <div bsModal #myModal="bs-modal" class="modal fade" >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left">My modal</h4>
                        <button type="button" class="close pull-right" (click)="lgModal.hide()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./app.component.css'],
    providers: [HttpService, NameComponent]
})
export class AppComponent implements OnInit {
    @ViewChild('myModal') private myModal: ModalDirective;
    hidden = false;
    name;
    address;
    coffeeKinds: CoffeeKind[] = [];

    constructor(private httpService: HttpService) {
    }

    ngOnInit(): void {
    }

    refresh(): void {
        this.httpService.getCoffeeKinds().subscribe((data) => this.coffeeKinds = data);
    }

    checkInput(value: any): boolean {
        if (value.count !== undefined && (value.count < 0 || value.count % 1 !== 0)) {
            return false;
        } else {
            return true;
        }
    }
}
