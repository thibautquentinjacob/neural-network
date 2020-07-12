import { DataEntry, Helpers } from '../../src/helpers';

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

describe('shiftDataset', () => {
  let dataset: DataEntry[];
  const columns: string[] = ['length', 'width'];
  const fun = (
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
  };
  const initialValue = 0;
  beforeEach(() => {
    dataset = [
      {
        id: 1,
        length: 152,
        width: 40,
        depth: 10,
      },
      {
        id: 2,
        length: 13,
        width: 70,
        depth: 80,
      },
      {
        id: 3,
        length: 132,
        width: 100,
        depth: 100,
      },
      {
        id: 4,
        length: 200,
        width: 120,
        depth: 5,
      },
    ];
  });

  it('should shift dataset as expected', () => {
    const expectedDataset: DataEntry[] = [
      {
        id: 1,
        length: 27.75,
        width: -42.5,
        depth: 10,
      },
      {
        id: 2,
        length: -111.25,
        width: -12.5,
        depth: 80,
      },
      {
        id: 3,
        length: 7.75,
        width: 17.5,
        depth: 100,
      },
      {
        id: 4,
        length: 75.75,
        width: 37.5,
        depth: 5,
      },
    ];
    expect(Helpers.shiftDataset(dataset, columns, fun, initialValue)).toEqual(
      expectedDataset
    );
  });

  describe('_shiftEntry', () => {
    it('should shift data entry as expected', () => {
      const expectedEntry: DataEntry = {
        id: 1,
        length: 27.75,
        width: -42.5,
        depth: 10,
      };
      const shifts: { [key: string]: number } = {
        length: 124.25,
        width: 82.5,
      };
      expect(Helpers['_shiftEntry'](dataset[0], shifts)).toEqual(expectedEntry);
    });

    it('should not shift what is not a number', () => {
      const expectedEntry: DataEntry = {
        id: 1,
        length: 27.75,
        width: '40',
        depth: 10,
      };
      const shifts: { [key: string]: number } = {
        length: 124.25,
        width: 82.5,
      };
      dataset[0].width = '40';
      expect(Helpers['_shiftEntry'](dataset[0], shifts)).toEqual(expectedEntry);
    });
  });

  describe('_computeShift', () => {
    it('should compute expected shift', () => {
      const expectedShifts: { [key: string]: number } = {
        length: 124.25,
        width: 82.5,
      };
      expect(
        Helpers['_computeShifts'](dataset, columns, fun, initialValue)
      ).toEqual(expectedShifts);
    });
  });
});
