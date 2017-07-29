export class CoffeeKind {
    id: number;
    name: string;
    description: string;
    price: number;
    count: number;
}

export class Order {
    userName: string;
    address: string;
    cups: CoffeeCup[];
    price: number;

    constructor(userName: string, address: string, coffeeCups: CoffeeCup[]) {
        this.userName = userName;
        this.address = address;
        this.cups = coffeeCups;
    }
}

export class CoffeeCup {
    public coffeeKind: string;
    public count: number;

    constructor(coffeeKind: string, count: number) {
        this.coffeeKind = coffeeKind;
        this.count = count;
    }
}
