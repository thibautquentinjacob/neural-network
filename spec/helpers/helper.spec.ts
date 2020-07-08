import { Helpers } from '../../src/helpers';

describe('Deepfreeze', () => {
  let object: { [key: string]: number | string | boolean | object };

  beforeEach(() => {
    object = {
      number: 3,
      string: 'str',
      boolean: true,
      array: [1, '2', false],
      object: {
        key1: 'str',
      },
    };

    Helpers.deepFreeze(object);
  });

  it('should prevent object modification - number', () => {
    try {
      object.number = 4;
    } catch (e) {
      expect(object.number).toEqual(3);
    }
  });

  it('should prevent object modification - string', () => {
    try {
      object.string = 'abc';
    } catch (e) {
      expect(object.string).toEqual('str');
    }
  });

  it('should prevent object modification - boolean', () => {
    try {
      object.boolean = false;
    } catch (e) {
      expect(object.boolean).toEqual(true);
    }
  });
});
