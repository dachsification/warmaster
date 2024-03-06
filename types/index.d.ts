export { Unit };

declare global {
  type Unit = {
    name: string;
    type: string;
    attack: string | number;
    hits: string | number;
    armour: string | number;
    command: string | number;
    size: number;
    points: number;
    min: string | number;
    max: string | number;
    special: string;
  };
}
