import { InputLayer, Vector } from '../../src/models';

describe('Input Layer', () => {
  describe('model', () => {
    it('should be defined', () => {
      const inputLayer: InputLayer = new InputLayer({
        label: 'testLabel',
        vector: new Vector({
          values: [1, 2, 3],
        }),
      });
      expect(inputLayer).toBeDefined();
    });
  });
});
