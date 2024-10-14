export { Unit };

declare global {
  type UnitForCalculator = {
    quantity: number;
    name: string;
    points: number;
    min: string | number;
    max: string | number;
  };

  type FactionForCalculator = {
    name: string;
    units: UnitForCalculator[];
  };

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
    special: string;
  };

  type Faction = {
    name: string;
    armyRuleTitle: string;
    units: [Unit];
    armyRules: {};
    spells: [{}];
  };

  type magicItem = {
    name: string;
    points: number;
    rule: string;
    condition: string;
  };

  type magicWeapon = {
    name: string;
    points: number;
    rule: string;
  };

  type magicBanner = {
    name: string;
    pointsA: number;
    pointsB?: number | null;
    pointsC?: number | null;
    rule: string;
  };
}
