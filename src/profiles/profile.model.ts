import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";

interface ProfileCreationAttr {
    firstName : string;
    secondName : string;
    surname : string;
    phone : string;
    age : number;
    country : string;
    city : string;
    adress : string;    
}

@Table({tableName : 'profiles', createdAt : false, updatedAt : false})
export class Profile extends Model<Profile, ProfileCreationAttr>{

    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey: true})
    profile_id : number;

    @Column({type : DataType.STRING, allowNull : false})
    firstName : string;

    @Column({type : DataType.STRING, allowNull : false})
    secondName : string;

    @Column({type : DataType.STRING})
    surname : string;

    @Column({type : DataType.STRING, allowNull : false})
    phone : string;

    @Column({type : DataType.INTEGER, allowNull : false})
    age : number;

    @Column({type : DataType.STRING, allowNull : false})
    country : string;

    @Column({type : DataType.STRING, allowNull : false})
    city : string;

    @Column({type : DataType.STRING, allowNull : false})
    adress : string;

    @ForeignKey(() => User)
    @Column({type : DataType.INTEGER})
    user_id : number;

    @BelongsTo(() => User)
    user : User; 
}