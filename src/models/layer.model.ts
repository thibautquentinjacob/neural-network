export abstract class Layer {
  public readonly label: string;

  public constructor({ label }: { label: string }) {
    this.label = this._processLabel(label);
  }

  private _processLabel(label: string): string {
    return label;
  }
}
