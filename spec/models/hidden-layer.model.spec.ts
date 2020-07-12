import {
  ActivationFunction,
  HiddenLayer,
  Neuron,
  NeuronInput,
  Vector,
} from '../../src/models';

describe('Hidden Layer', () => {
  let hiddenLayer: HiddenLayer;
  const activationFunction: ActivationFunction = (value: number) => {
    return 1 / (1 + Math.exp(-value));
  };

  beforeEach(() => {
    hiddenLayer = new HiddenLayer({
      label: 'testLabel',
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
    });
  });

  describe('model', () => {
    it('should be defined', () => {
      expect(hiddenLayer).toBeDefined();
    });
  });

  describe('feedForward', () => {
    it('should output expected result', () => {
      expect(
        hiddenLayer.feedForward(
          new NeuronInput({
            label: 'Input',
            values: new Vector({
              values: [2, 3],
            }),
          }),
          activationFunction
        )
      ).toEqual(
        new Vector({
          values: [0.9525741268224334, 0.9525741268224334],
        })
      );
    });
  });
});
