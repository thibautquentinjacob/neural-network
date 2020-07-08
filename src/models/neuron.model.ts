import { Helpers } from '../helpers';
import { NeuronInput } from './neuron-input.model';
import { Vector } from './vector.model';

export type ActivationFunction = (value: number) => number;

export class Neuron {
  public readonly weights: Vector;
  public readonly bias: number;

  public constructor({
    weights,
    bias,
  }: {
    weights: Vector | null;
    bias: number | null;
  }) {
    this.weights = this._processWeights(weights);
    this.bias = this._processBias(bias);

    Helpers.deepFreeze(this);
  }

  private _processWeights(weights: Vector | null): Vector {
    return weights ? weights : new Vector({ values: [] });
  }

  private _processBias(bias: number | null): number {
    return bias ? bias : 0;
  }

  public feedForward(
    input: NeuronInput,
    activationFunction: ActivationFunction
  ): number {
    return activationFunction(this.weights.dot(input.values) + this.bias);
  }
}
