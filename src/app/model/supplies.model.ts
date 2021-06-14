export interface Supplies {
    description: string;
<<<<<<< Updated upstream
    price: number ;

=======
    price: string ;
    amount?: number;
    idSupplie?: number;
    id: number;
    static asFormGroup(supplies: Supplies): FormGroup {
        const fg = new FormGroup({
        idSupplie: new FormControl(supplies.id),
        description: new FormControl(supplies.description),
        price: new FormControl(supplies.price),
        amount: new FormControl(supplies.amount)
        });
        return fg;
      }
>>>>>>> Stashed changes
}

export interface SuppliesData {
    id?: number;
    description: string;
    price: number ;
}