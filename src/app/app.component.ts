import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from './services/http.service';
import {CoffeeCup, CoffeeKind, Order} from './factory/coffee.factory';
import {ModalDirective} from 'ngx-bootstrap';
import {AppSettings} from './app.settings';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService, ModalDirective]
})
export class AppComponent implements OnInit {
    @ViewChild('modalWindow') private modalWindow: ModalDirective;
    request;
    userName;
    address;
    coffeeKinds: CoffeeKind[] = [];
    order: Order;
    modalType: string;
    mAddress = 'address';
    mOrder = 'order';
    mError = 'error';

    constructor(private httpService: HttpService) {
    }

    ngOnInit(): void {
        this.modalType = this.mAddress;
    }

    refresh(param: string, key: string): void {
        if (param !== undefined) {
            param = key + param;
        }
        this.httpService.sendGet(AppSettings.URL_KINDS, param).subscribe((data) => this.coffeeKinds = data);
    }

    createOrder(): void {
        const cups = [];
        for (const kind of this.coffeeKinds) {
            if (kind.count) {
                cups.push(new CoffeeCup(kind.name, kind.count));
            }
        }
        this.httpService.sendPost(AppSettings.URL_ORDERS, new Order(this.userName, this.address, cups))
            .subscribe((result) => {
                    this.order = result;
                    this.modalType = this.mOrder;
                    this.openModal();
                },
                (error) => {
                    this.handleError();
                });
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

    private handleError() {
        this.modalType = this.mError;
        this.openModal();
    }

    private closeModal() {
        this.modalType = this.mAddress;
        this.order = undefined;
        this.modalWindow.hide();
    }
}
