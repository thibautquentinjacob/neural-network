import { Helpers } from '../helpers';

export class VectorUnmatchedDimensionsError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, VectorUnmatchedDimensionsError.prototype);
  }
}

export class Vector {
  public readonly values: number[];

  public constructor({ values }: { values: number[] | null }) {
    this.values = values ? this._processValues(values) : [];

    Helpers.deepFreeze(this);
  }

  private _processValues(values: number[]): number[] {
    return values;
  }

  public get dimensions(): number {
    return this.values.length;
  }

  /**
   * Perform dot product between two vectors.
   *
   * @param {Vector} vector - Second vector to use
   * @returns {number} Dot product
   * @throws {VectorUnmatchedDimensionsError} if the two vectors have different
   * sizes
   */
  public dot(vector: Vector): number {
    if (this.dimensions !== vector.dimensions) {
      throw new VectorUnmatchedDimensionsError(
        `Vectors should have the same dimensions: ${this.dimensions} and ${vector.dimensions}`
      );
    }
    return this.values.reduce((sum: number, value: number, index: number) => {
      return sum + value * vector.values[index];
    }, 0);
  }
}
