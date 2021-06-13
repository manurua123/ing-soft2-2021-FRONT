import { Time } from '@angular/common';
   
   export interface Ticket {

            id?: number,
            buy_date?: Date,
            amount_paid?: Time,
            idCards?: number,
            birth_date?: Date,
            phone?: number,
            firstName?: string,
            lastName?: string,
            email?: string,
            state?: string,
            travel?: number,
            user?: number,
            supplies?: [ ]

   }