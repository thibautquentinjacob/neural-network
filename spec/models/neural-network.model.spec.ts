import {
  ActivationFunction,
  HiddenLayer,
  InputLayer,
  NeuralNetwork,
  Neuron,
  Vector,
} from '../../src/models';

describe('Neural network', () => {
  let neuralNetwork: NeuralNetwork;

  beforeEach(() => {
    neuralNetwork = new NeuralNetwork({
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
  });

  describe('model', () => {
    it('should be defined', () => {
      expect(neuralNetwork).toBeDefined();
    });
  });

  describe('feedForward', () => {
    it('should output expected result', () => {
      const activationFunction: ActivationFunction = (value: number) => {
        return 1 / (1 + Math.exp(-value));
      };
      expect(neuralNetwork.feedForward(activationFunction)).toEqual(
        new Vector({
          values: [0.7216325609518421],
        })
      );
    });
  });
});
