import { Layer } from './layer.model';
import { Vector } from './vector.model';

export class InputLayer extends Layer {
  public readonly vector: Vector;

  public constructor({ label, vector }: { label: string; vector: Vector }) {
    super({ label });
    this.vector = this._processVector(vector);
  }

  private _processVector(vector: Vector): Vector {
    return vector;
  }
}
