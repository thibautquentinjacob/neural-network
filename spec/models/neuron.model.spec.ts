import {
  ActivationFunction,
  Neuron,
  NeuronInput,
  Vector,
} from '../../src/models';

describe('Neuron model', () => {
  let neuron: Neuron;
  const weights: Vector = new Vector({ values: [0, 1] });
  const bias = 4;

  beforeEach(() => {
    neuron = new Neuron({
      weights: weights,
      bias: bias,
    });
  });

  it('should be defined', () => {
    expect(neuron).toBeDefined();
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(neuron)).toBeTruthy();
  });

  it('weights field should have correct value - defined', () => {
    expect(neuron.weights).toEqual(weights);
  });

  it('weights field should have correct value - null', () => {
    neuron = new Neuron({
      weights: null,
      bias: bias,
    });
    expect(neuron.weights).toEqual(new Vector({ values: [] }));
  });

  it('Bias field should have correct value - defined', () => {
    expect(neuron.bias).toEqual(bias);
  });

  it('Bias field should have correct value - null', () => {
    neuron = new Neuron({
      weights: weights,
      bias: null,
    });
    expect(neuron.bias).toEqual(0);
  });
});

describe('Feed forward', () => {
  let neuron: Neuron;
  const neuronInput: NeuronInput = new NeuronInput({
    label: 'x',
    values: new Vector({ values: [2, 3] }),
  });
  const activationFunction: ActivationFunction = (value: number) => {
    return 1 / (1 + Math.exp(-value));
  };
  const weights: Vector = new Vector({ values: [0, 1] });
  const bias = 4;

  beforeEach(() => {
    neuron = new Neuron({
      weights: weights,
      bias: bias,
    });
  });

  it('should return expected value', () => {
    expect(
      Math.round(
        neuron.feedForward(neuronInput, activationFunction) * Math.pow(10, 6)
      ) / Math.pow(10, 6)
    ).toEqual(0.999089);
  });
});
