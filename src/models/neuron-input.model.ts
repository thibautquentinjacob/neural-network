import { Helpers } from '../helpers';
import { Vector } from './vector.model';

export class NeuronInput {
  public readonly label: string;
  public readonly values: Vector;

  public constructor({ label, values }: { label: string; values: Vector }) {
    this.label = this._processLabel(label);
    this.values = this._processValues(values);

    Helpers.deepFreeze(this);
  }

  private _processLabel(label: string): string {
    return label;
  }

  private _processValues(values: Vector): Vector {
    return values;
  }
}
