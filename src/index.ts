import { readFileSync } from 'fs';
import { Dataset, Helpers } from './helpers';
import {
  ActivationFunction,
  HiddenLayer,
  InputLayer,
  NeuralNetwork,
  Neuron,
  Vector,
} from './models';

const activationFunction: ActivationFunction = (value: number) => {
  return 1 / (1 + Math.exp(-value));
};
// Build neural network
const neuralNetwork: NeuralNetwork = new NeuralNetwork({
  inputLayer: new InputLayer({
    label: 'Input',
    vector: new Vector({
      values: [2, 3],
    }),
  }),
  hiddenLayers: [
    new HiddenLayer({
      label: 'Layer1',
      neurons: [
        new Neuron({
          weights: new Vector({ values: [0, 1] }),
          bias: 0,
        }),
        new Neuron({
          weights: new Vector({ values: [0, 1] }),
          bias: 0,
        }),
      ],
    }),
  ],
  outputLayer: new HiddenLayer({
    label: 'Output',
    neurons: [
      new Neuron({
        weights: new Vector({ values: [0, 1] }),
        bias: 0,
      }),
    ],
  }),
});

// Load dataset and shift data
let dataset: Dataset = JSON.parse(
  readFileSync(`${__dirname}/../data/demographics.json`).toString()
);
dataset = Helpers.shiftDataset(
  dataset,
  ['weight', 'height'],
  (
    previous: number,
    current: number,
    index: number,
    array: number[]
  ): number => {
    const length: number = array.length;
    if (index === length - 1) {
      return (previous + current) / length;
    }
    return previous + current;
  },
  0
);
console.log(dataset);

console.log(neuralNetwork.feedForward(activationFunction));
