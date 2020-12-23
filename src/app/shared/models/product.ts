export interface IProduct {

    id?: string;
    name: string, 
    description: string,
    categorie: string,
    periode: string,
    uid: string;
    
}


export class Products implements IProduct {
 
    public name: string; 
    public description: string;
    public categorie: string;
    public periode: string;
    public uid: string;

    constructor(data){
        this.fromData(data);
    }

    private fromData (data): void {
        this.name = data.name || '';
        this.description = data.description || ''; 
        this.categorie = data.categorie || '';
        this.periode = data.periode || '';
        this.uid = data.uid || '';
    }
}