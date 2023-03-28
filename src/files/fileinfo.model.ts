import { Column, DataType, Model, Table } from "sequelize-typescript";


interface FileCreationAttr {
    fileName : string;
    essenceTable : string;
    essenceId : number;
}

@Table({tableName : 'filesinfo', updatedAt : false})
export class FileInfo extends Model<FileInfo, FileCreationAttr>{
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey: true})
    file_id : number;

    @Column({type : DataType.STRING, unique : true, allowNull : false})
    fileName : string;

    @Column({type : DataType.STRING})
    essenceTable : string;

    @Column({type : DataType.INTEGER})
    essenceId : string;
}