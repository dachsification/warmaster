export { Unit };

declare global {
  type Unit = {
    name: string;
    type: string;
    meleeAttack: number;
    rangeAttack: number;
    hits: string | number;
    armour: string | number;
    command: string | number;
    size: number;
    points: number;
    min: string | number;
    max: string | number;
    specialIcon: { name: string }[];
    special: string;
  };
}
