import { Product } from './product.model';

class Order {
  id: String;
  order: Product[];
}

export class CurrentUser {
  orders: Array<Order>;
  address: {
    country: String;
    city: String;
    street: String;
    house: String;
    zipcode: String;
    flat: Number;
  };
  username: String;
  password: String;
  cart: Product[];
}
