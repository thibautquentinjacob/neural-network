export type DataEntry = { [key: string]: string | number | boolean };

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
   * @param {DataEntry[]} data - Dataset to shift
   * @param {string[]} columns - Columns to be shifted
   * @param {(previous: number, current: number) => number} fun - Function to
   * use to compute the shift
   * @param {number} initialValue - Initial shift value
   * @returns {{ [key: string]: number }} Record containing the shift for each
   * column
   */
  private static _computeShifts(
    data: DataEntry[],
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

  public static shiftDataset(
    data: DataEntry[],
    columns: string[],
    fun: (
      previous: number,
      current: number,
      index: number,
      array: number[]
    ) => number,
    initialValue: number
  ): DataEntry[] {
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
}
