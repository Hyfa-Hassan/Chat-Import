import { DataTypes, Model } from "sequelize";
import sequelize from "../../db/config";

export class Chat extends Model {
    public user!: string;
    public message!: string;
}

Chat.init({
    user:{
        type:DataTypes.STRING,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    modelName:'Chat',
    tableName:'chats'
})