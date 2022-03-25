import { Colors } from "../shared/colors";

export class User {
  private _id!: number;
  private _name!: string;
  private _color!: typeof Colors;

  get id(){
    return this._id;
  }

  set id(id: number){
    this._id = id;
  }

  get name(){
    return this._name;
  }

  set name(name: string){
    this._name = name;
  }

  get color(){
    return this._color;
  }

  set color(color: typeof Colors){
    this._color = color;
  }

}
