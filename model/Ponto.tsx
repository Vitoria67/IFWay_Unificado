export class Ponto{
    public id: string;
    public latitude: string;
    public longitude: string;
    public nome: string;
   
    constructor(obj?: Partial<Ponto>) {
        if (obj){
            this.id=obj.id
            this.latitude=obj.latitude
            this.longitude=obj.longitude
            this.nome=obj.nome
        }
    }

    toString(){
        const objeto=`{
            "id":       "${this.id}",
            "latitude":     "${this.latitude}",
            "longitude":     "${this.longitude}",
            "nome":     "${this.nome}",
        }`
        return objeto
    }

    toFirestore(){
        const ponto={
            id: this.id,
            latitude: this.latitude,
            longitude: this.longitude,
            nome: this.nome,
        }
        return ponto
    }

}