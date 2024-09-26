import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/config";

export class User extends Model {
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName:'User',
    tableName:'users'
})