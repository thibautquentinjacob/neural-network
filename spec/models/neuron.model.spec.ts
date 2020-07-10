import {
  ActivationFunction,
  MemoizedNeuronInvalidArgumentError,
  Neuron,
  NeuronInput,
  Vector,
} from '../../src/models';

describe('Neuron', () => {
  describe('model', () => {
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

    it('should be sealed', () => {
      expect(Object.isSealed(neuron)).toBeTruthy();
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

    it('Memoize field should have correct default value', () => {
      expect(neuron.memoize).toEqual(true);
    });

    it('Memoize field should have correct value - false', () => {
      neuron = new Neuron({
        weights: weights,
        bias: bias,
        memoize: false,
      });
      expect(neuron.memoize).toEqual(false);
    });

    it('Memoize field should have correct value - true', () => {
      neuron = new Neuron({
        weights: weights,
        bias: bias,
        memoize: true,
      });
      expect(neuron.memoize).toEqual(true);
    });

    it('output field should be as expected', () => {
      expect(neuron['_output']).toEqual({});
    });
  });

  describe('Feed forward', () => {
    let neuron: Neuron;
    const input: NeuronInput = new NeuronInput({
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
          neuron.feedForward(input, activationFunction) * Math.pow(10, 6)
        ) / Math.pow(10, 6)
      ).toEqual(0.999089);
    });

    it('should raise an error - missing input', () => {
      expect(() =>
        neuron.feedForward((null as unknown) as NeuronInput, activationFunction)
      ).toThrow(new MemoizedNeuronInvalidArgumentError('Input missing'));
    });

    it('should raise an error - missing activation function', () => {
      expect(() =>
        neuron.feedForward(input, (null as unknown) as ActivationFunction)
      ).toThrow(
        new MemoizedNeuronInvalidArgumentError('Activation function missing')
      );
    });

    it('should store and read result from cache', () => {
      const neuron = new Neuron({
        weights: weights,
        bias: bias,
      });
      const outputValue = 0.5;
      const activationFunction: jasmine.Spy = jasmine
        .createSpy('activationFunction')
        .and.returnValue(outputValue);
      neuron.feedForward(input, activationFunction);
      expect(neuron['_output']['2-3']).toEqual(outputValue);
      neuron.feedForward(input, activationFunction);

      expect(activationFunction).toHaveBeenCalledTimes(1);
      expect(activationFunction).toHaveBeenCalledWith(7);
    });

    it('should not read result from cache', () => {
      const neuron = new Neuron({
        weights: weights,
        bias: bias,
        memoize: false,
      });
      const outputValue = 0.5;
      const activationFunction: jasmine.Spy = jasmine
        .createSpy('activationFunction')
        .and.returnValue(outputValue);
      neuron.feedForward(input, activationFunction);
      expect(neuron['_output']).toEqual({});
      neuron.feedForward(input, activationFunction);

      expect(activationFunction).toHaveBeenCalledTimes(2);
      expect(activationFunction).toHaveBeenCalledWith(7);
    });
  });

  describe('hashInput', () => {
    let neuron: Neuron;

    beforeEach(() => {
      neuron = new Neuron({
        weights: new Vector({ values: [1, 2] }),
        bias: 4,
      });
    });

    it('should return expected result - defined', () => {
      const input: NeuronInput = new NeuronInput({
        label: 'x',
        values: new Vector({ values: [3, 5] }),
      });
      expect(neuron['_hashInput'](input)).toEqual('3-5');
    });

    it('should return expected result - negative', () => {
      const input: NeuronInput = new NeuronInput({
        label: 'x',
        values: new Vector({ values: [-3, -5] }),
      });
      expect(neuron['_hashInput'](input)).toEqual('-3--5');
    });
  });
});
