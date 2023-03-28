import { Column, DataType, Model, Table } from "sequelize-typescript";


interface TextblockCreationAttr {
    searchName : string;
    name : string;    
    text : string;
    group : string;
}

@Table({tableName : 'textblock', createdAt : false, updatedAt : false})
export class Textblock extends Model<Textblock, TextblockCreationAttr>{
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey: true})
    textblock_id : number;

    @Column({type : DataType.STRING, unique : true, allowNull : false})
    searchName : string;

    @Column({type : DataType.STRING, unique : true, allowNull : false})
    name : string;

    @Column({type : DataType.STRING})
    image : string;

    @Column({type : DataType.STRING, allowNull : false})
    text : string;

    @Column({type : DataType.STRING, allowNull : false})
    group : string;
}