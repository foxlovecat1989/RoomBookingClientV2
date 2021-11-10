export class Room {
  id!: number;
  name !: string;
  location! : string;
  layoutCapacities = new Array<LayoutCapacity>();

  static fromHttp(room: Room) : Room{
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;

    newRoom.layoutCapacities = new Array<LayoutCapacity>();
    for(const layoutCapacity of room.layoutCapacities)
      newRoom.layoutCapacities.push(LayoutCapacity.fromHttp(layoutCapacity));

    return newRoom;
  }
}
export class LayoutCapacity {
  layout !: Layout;
  capacity !: number;

  static fromHttp(layoutCapacity: LayoutCapacity) : LayoutCapacity{
    const newLayoutCapacity = new LayoutCapacity();
    newLayoutCapacity.capacity = layoutCapacity.capacity;
    newLayoutCapacity.layout = layoutCapacity.layout;
    // const key = LayoutCapacity.findKeyWithValue(layoutCapacity.layout);
    // if(LayoutCapacity.isValidKey(key))
    //   newLayoutCapacity.layout = Layout[key];

    return newLayoutCapacity;
  }

  static getKeysOflayout(): Array<string>{
    return Object.keys(Layout);
  }

  static getValuesOfLayout(): Array<string>{
    const valuesOfLayout = new Array<string>();
    const keys = LayoutCapacity.getKeysOflayout();
    for(const key of keys){
      if(LayoutCapacity.isValidKey(key))
        valuesOfLayout.push(Layout[key]);
    }

    return valuesOfLayout;
  }

  static findKeyWithValue(value: string): string{
    const correctKey = LayoutCapacity.getKeysOflayout().find(
      key => {
        if(LayoutCapacity.isValidKey(key))
          Layout[key] === value;
      }
    )!;

    return correctKey;
  }

  static isValidKey(key: string) : key is keyof object {
    return key in Layout;
  }
}
export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}


