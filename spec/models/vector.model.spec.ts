import { Vector, VectorUnmatchedDimensionsError } from '../../src/models';

describe('Vector model', () => {
  let vector: Vector;

  beforeEach(() => {
    vector = new Vector({
      values: [1, 2, 3],
    });
  });

  it('should be defined', () => {
    expect(vector).toBeDefined();
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(vector)).toBeTruthy();
  });

  it('values field should have the correct values', () => {
    expect(vector.values).toEqual([1, 2, 3]);
  });
});

describe('Vector dimensions', () => {
  it('should equal 3', () => {
    const vector: Vector = new Vector({
      values: [1, 2, 3],
    });

    expect(vector.dimensions).toEqual(3);
  });

  it('should equal 0 - empty', () => {
    const vector: Vector = new Vector({
      values: [],
    });

    expect(vector.dimensions).toEqual(0);
  });

  it('should equal 0 - null', () => {
    const vector: Vector = new Vector({
      values: null,
    });

    expect(vector.dimensions).toEqual(0);
  });
});

describe('Vector dot product', () => {
  it('should be 32', () => {
    const vector1: Vector = new Vector({
      values: [1, 2, 3],
    });
    const vector2: Vector = new Vector({
      values: [4, 5, 6],
    });
    expect(vector1.dot(vector2)).toEqual(32);
  });

  it('should throw a VectorUnmatchedDimensionsError', () => {
    const vector1: Vector = new Vector({
      values: [1, 2, 3],
    });
    const vector2: Vector = new Vector({
      values: [4, 5],
    });
    expect(() => vector1.dot(vector2)).toThrow(
      new VectorUnmatchedDimensionsError(
        `Vectors should have the same dimensions: ${vector1.dimensions} and ${vector2.dimensions}`
      )
    );
  });
});
