export class Tipo {
    public id:      string;
    public tipo:    string;    

    constructor(obj?: Partial<Tipo>){
        if(obj){
            this.id     = obj.id
            this.tipo   = obj.tipo
        }
    }

    toString() {
        const objeto = `{
            "id"    :   "${this.id}",
            "tipo"  :   "${this.tipo} "
        }`
        return objeto
    }

    toFirestore(){
        const tipo = {
            id      : this.id,
            tipo    : this.tipo
        }
        return tipo
    }


}
