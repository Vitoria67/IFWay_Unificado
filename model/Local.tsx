export class Local{
    public id: string;
    public nome: string;
    public latitude: string;
    public longitude: string;
    

    constructor(obj?: Partial<Local>) {
        if (obj){
            this.id=obj.id
            this.nome=obj.nome
            this.latitude=obj.latitude
            this.longitude=obj.longitude
           
        }
    }

    toString(){
        const objeto=`{
            "id":       "${this.id}",
            "nome":     "${this.nome}",
            "latitude":     "${this.latitude}",
            "longitude":     "${this.longitude}",
          
        }`
        return objeto
    }

    toFirestore(){
        const local={
            id: this.id,
            nome: this.nome,
            latitude: this.latitude,
            longitude: this.longitude,
           
        }
        return local
    }

}