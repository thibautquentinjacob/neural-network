import { HiddenLayer } from './hidden-layer.model';
import { InputLayer } from './input-layer.model';
import { NeuronInput } from './neuron-input.model';
import { ActivationFunction } from './neuron.model';
import { Vector } from './vector.model';

export class NeuralNetwork {
  public readonly inputLayer: InputLayer;
  public readonly hiddenLayers: HiddenLayer[];
  public readonly outputLayer: HiddenLayer;

  public constructor({
    inputLayer,
    hiddenLayers,
    outputLayer,
  }: {
    inputLayer: InputLayer;
    hiddenLayers: HiddenLayer[];
    outputLayer: HiddenLayer;
  }) {
    this.inputLayer = this._processInputLayer(inputLayer);
    this.hiddenLayers = this._processHiddenLayers(hiddenLayers);
    this.outputLayer = this._processOutputLayer(outputLayer);
  }

  private _processInputLayer(inputLayer: InputLayer): InputLayer {
    return inputLayer;
  }

  private _processHiddenLayers(hiddenLayers: HiddenLayer[]): HiddenLayer[] {
    return hiddenLayers;
  }

  private _processOutputLayer(outputLayer: HiddenLayer): HiddenLayer {
    return outputLayer;
  }

  public feedForward(activationFunction: ActivationFunction): Vector {
    let neuronInput: NeuronInput = new NeuronInput({
      label: 'input',
      values: this.inputLayer.vector,
    });
    this.hiddenLayers.forEach((hiddenLayer: HiddenLayer) => {
      neuronInput = new NeuronInput({
        ...neuronInput,
        values: hiddenLayer.feedForward(neuronInput, activationFunction),
      });
    });

    return this.outputLayer.feedForward(neuronInput, activationFunction);
  }
}
