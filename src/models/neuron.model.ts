import { NeuronInput } from './neuron-input.model';
import { Vector } from './vector.model';

export type ActivationFunction = (value: number) => number;

export class MemoizedNeuronInvalidArgumentError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MemoizedNeuronInvalidArgumentError.prototype);
  }
}

export class Neuron {
  private _memoized: { [key: string]: number };
  public readonly weights: Vector;
  public readonly bias: number;
  public readonly memoize: boolean;

  public constructor({
    weights,
    bias,
    memoize,
  }: {
    weights: Vector | null;
    bias: number | null;
    memoize?: boolean;
  }) {
    this.weights = this._processWeights(weights);
    this.bias = this._processBias(bias);
    this.memoize = this._processMemoize(memoize);
    this._memoized = {};

    Object.seal(this);
  }

  private _processWeights(weights: Vector | null): Vector {
    return weights ? weights : new Vector({ values: [] });
  }

  private _processBias(bias: number | null): number {
    return bias ? bias : 0;
  }

  private _processMemoize(memoize: boolean | undefined): boolean {
    return !memoize && memoize !== false ? true : memoize;
  }

  /**
   * Generate a key identifying the neuron input.
   * @param {NeuronInput} input - Input
   * @returns {string} Hash
   */
  private _hashInput(input: NeuronInput): string {
    return input.values.values.join('-');
  }

  public feedForward(
    input: NeuronInput,
    activationFunction: ActivationFunction
  ): number {
    if (!input) {
      throw new MemoizedNeuronInvalidArgumentError('Input missing');
    }
    if (!activationFunction) {
      throw new MemoizedNeuronInvalidArgumentError(
        'Activation function missing'
      );
    }
    const hash: string = this._hashInput(input);
    // If the result has not already been computed
    if (!this._memoized[hash]) {
      const result: number = activationFunction(
        this.weights.dot(input.values) + this.bias
      );
      if (this.memoize) {
        this._memoized[hash] = result;
      }
    }
    return this._memoized[hash];
  }
}
