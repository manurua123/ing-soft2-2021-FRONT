import { FormControl, FormGroup } from "@angular/forms";

export class Supplies {
    description: string;
    price: string ;
    amount?: number;
    idSupplie?: number;
    static asFormGroup(supplies: Supplies): FormGroup {
        const fg = new FormGroup({
        idSupplie: new FormControl(supplies.idSupplie),
        description: new FormControl(supplies.description),
        price: new FormControl(supplies.price),
        amount: new FormControl(supplies.amount)
        });
        return fg;
      }
}

export interface SuppliesData {
    id?: number;
    description: string;
    price: number ;
}

