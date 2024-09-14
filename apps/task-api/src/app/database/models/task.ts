import { Model, DataTypes, Optional } from 'sequelize';
import { SequelizeDatabase } from '../sequalize';
import UserModel from './user';

// Define the attributes of the Task model
export interface TaskAttributes {
  id?: string;
  title: string;
  description: string;
  status: string;
  user_id: number;

  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes of the Task model with optional properties for updatable fields
type TaskCreationAttributes = Optional<TaskAttributes, 'id'>;

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: string;
  public user_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Task.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    modelName: 'Task',
  }
);

Task.belongsTo(UserModel, {
  as: 'user',
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  foreignKeyConstraint: true,
});

export default Task;
