import { Min } from 'class-validator';
import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table
export class Item extends Model {
  
  @PrimaryKey  
  @Unique  
  @Column
  declare id: string;

  @Column
  name: string;
  
  @Column
  type : string;

  @Column
  quantity : number
   
  @Column
  pricePerUnit : number

  @Column({ defaultValue: false })
  hasImage: boolean;
}

    