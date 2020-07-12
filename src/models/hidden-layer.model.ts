import { Layer } from './layer.model';
import { NeuronInput } from './neuron-input.model';
import { ActivationFunction, Neuron } from './neuron.model';
import { Vector } from './vector.model';

export class HiddenLayer extends Layer {
  public readonly neurons: Neuron[];

  public constructor({ label, neurons }: { label: string; neurons: Neuron[] }) {
    super({ label });
    this.neurons = this._processNeurons(neurons);
  }

  private _processNeurons(neurons: Neuron[]): Neuron[] {
    return neurons;
  }

  public feedForward(
    neuronInput: NeuronInput,
    activationFunction: ActivationFunction
  ): Vector {
    const values: number[] = this.neurons.map((neuron: Neuron) => {
      return neuron.feedForward(neuronInput, activationFunction);
    });
    return new Vector({ values: values });
  }
}
