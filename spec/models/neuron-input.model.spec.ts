import { NeuronInput, Vector } from '../../src/models';

describe('NeuronInput model', () => {
  let model: NeuronInput;
  beforeEach(() => {
    model = new NeuronInput({
      label: 'testLabel',
      values: new Vector({ values: [1, 2, 3] }),
    });
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(model)).toBeTruthy();
  });

  it('label field should have correct value', () => {
    expect(model.label).toEqual('testLabel');
  });

  it('Value field should have correct value', () => {
    expect(model.values).toEqual(new Vector({ values: [1, 2, 3] }));
  });
});
