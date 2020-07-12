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

console.log(neuralNetwork.feedForward(activationFunction));
