export class ATodo{
    constructor(id:number, comment:string, state:number){
        this.id=id;
        this.comment = comment;
        this.state = state;
    }
    id:number;
    comment:string;
    state:number;
}

export class Form{
    constructor(comment:string){
        this.comment = comment
    }
    comment:string;
}



