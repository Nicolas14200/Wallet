import { v4 } from 'uuid';

export interface CustomerProps {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: Date;

}

export class Customer {

    props: CustomerProps
    constructor(props: CustomerProps){
        this.props = props
    }

    static create(props: {
    firstname: string;
    lastname: string;
    birthdate: Date
    })
    {
        return new Customer({
            id:v4(),
            firstname:  props.firstname,
            lastname: props.lastname,
            birthdate: props.birthdate
        })
    }
}