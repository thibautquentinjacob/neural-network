import { NeuronInput } from './neuron-input.model';
import { Neuron } from './neuron.model';
import { Vector } from './vector.model';

export type ActivationFunction = (value: number) => number;

export class MemoizedNeuron extends Neuron {
  private _output: { [key: string]: number };

  public constructor({ weights, bias }: { weights: Vector; bias: number }) {
    super({ weights, bias });
    this._output = {};
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
    const hash: string = this._hashInput(input);
    // If the result has not already been computed
    if (!this._output[hash]) {
      const result: number = super.feedForward(input, activationFunction);
      this._output[hash] = result;
    }
    return this._output[hash];
  }
}
