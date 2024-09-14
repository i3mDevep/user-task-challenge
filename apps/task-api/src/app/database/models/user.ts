import { Model, DataTypes } from 'sequelize';
import { SequelizeDatabase } from '../sequalize';
import { ModelAttributesBase } from '../utils/model-attributes-base';

export interface UserAttributes extends ModelAttributesBase {
  id?: string;
  username: string;
  email: string;
  password: string;
  roles: string[];

  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public roles!: string[];
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    roles: {
      allowNull: true,
      unique: true,
      type: DataTypes.JSON,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: SequelizeDatabase.instance.sequelize_,
    modelName: 'User',
  }
);

export default User;
