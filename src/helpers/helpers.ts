export type DataEntry = { [key: string]: string | number | boolean };
export type Dataset = DataEntry[];

export class MSEUnmatchedDatasetLengthsError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MSEUnmatchedDatasetLengthsError.prototype);
  }
}

export class MSEEmptyDatasetError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MSEEmptyDatasetError.prototype);
  }
}

export class MSEUnknownDatasetColumn extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MSEUnknownDatasetColumn.prototype);
  }
}

export class Helpers {
  /**
   * Prevent the fields of an object to be mutated by freezing all its
   * sub-object fields recursively.
   *
   * @param {T} object - The object to freeze
   * @returns {T} Frozen object
   */
  public static deepFreeze(object: {
    [key: string]: any;
  }): { [key: string]: any } {
    Object.getOwnPropertyNames(object).forEach((name: string) => {
      const prop = object[name];

      if (prop && typeof prop === 'object') {
        Helpers.deepFreeze(prop);
      }
    });

    return Object.freeze(object);
  }

  /**
   * Compute shifts of numeric columns of a given dataset, using a provided
   * function and initial value.
   *
   * @param {Dataset} data - Dataset to shift
   * @param {string[]} columns - Columns to be shifted
   * @param {(previous: number, current: number) => number} fun - Function to
   * use to compute the shift
   * @param {number} initialValue - Initial shift value
   * @returns {{ [key: string]: number }} Record containing the shift for each
   * column
   */
  private static _computeShifts(
    data: Dataset,
    columns: string[],
    fun: (
      previous: number,
      current: number,
      index: number,
      array: number[]
    ) => number,
    initialValue: number
  ): { [key: string]: number } {
    const shifts: { [key: string]: number } = {};

    columns.forEach((column: string) => {
      const values: number[] = data.map(
        (entry: DataEntry) => entry[column] as number
      );
      shifts[column] = values.reduce(fun, initialValue) as number;
    });

    return shifts;
  }

  /**
   * Shift data entry using provided shift record
   *
   * @param {DataEntry} entry - Data entry
   * @param {{ [key: string]: number }} shifts - Shifts to apply
   * @returns {DataEntry} Shifted data entry
   */
  private static _shiftEntry(
    entry: DataEntry,
    shifts: { [key: string]: number }
  ): DataEntry {
    Object.keys(shifts).forEach((column: string) => {
      if (column in entry && typeof entry[column] === 'number') {
        entry[column] = (entry[column] as number) - shifts[column];
      }
    });
    return entry;
  }

  /**
   * Shift dataset
   *
   * @param {Dataset} data - Dataset to shift
   * @param {string[]} columns - Columns to shift
   * @param {function} fun - Function to use to shift data
   * @param {number} initialValue - Initial shift value
   * @returns {Dataset} Shifted dataset
   */
  public static shiftDataset(
    data: Dataset,
    columns: string[],
    fun: (
      previous: number,
      current: number,
      index: number,
      array: number[]
    ) => number,
    initialValue: number
  ): Dataset {
    // Computes data shift for numerical columns using the provided function
    const shifts: { [key: string]: number } = Helpers._computeShifts(
      data,
      columns,
      fun,
      initialValue
    );

    // Apply data shift to each entry
    return data.map((entry: DataEntry) => {
      return Helpers._shiftEntry(entry, shifts);
    });
  }

  /**
   * Compute Mean Squared Error (MSE)
   *
   * @param {Dataset} dataset - Source dataset
   * @param {Dataset} predicted - Dataset with predicted values
   * @param {string} column - Column to compute MSE on
   * @returns {number} MSE
   */
  public static meanSquaredError(
    dataset: Dataset,
    predicted: Dataset,
    column: string
  ): number {
    if (dataset.length === 0) {
      throw new MSEEmptyDatasetError("Can't run MSE on an empty dataset");
    }

    const fun: (entry: DataEntry) => number = (entry: DataEntry) => {
      if (column in entry) {
        return entry[column] as number;
      } else {
        throw new MSEUnknownDatasetColumn(
          `Could not find column '${column}' in dataset`
        );
      }
    };
    const datasetValues: number[] = dataset.map(fun);
    const predictedValues: number[] = predicted.map(fun);

    if (datasetValues.length !== predictedValues.length) {
      throw new MSEUnmatchedDatasetLengthsError(
        `Original dataset and predicted dataset have different sizes: ${datasetValues.length}, ${predictedValues.length}`
      );
    }

    return (
      (1 / datasetValues.length) *
      datasetValues.reduce(
        (previous: number, current: number, index: number) =>
          previous + Math.pow(current - predictedValues[index], 2),
        0
      )
    );
  }
}
