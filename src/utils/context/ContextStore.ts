export default class ContextStore<T> {

  private value: T;
  private listeners: ((value: T) => void)[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  public get() {
    return this.value;
  }

  public set(newValue: T) {
    this.value = newValue;
    this.listeners.forEach(l => l(newValue));
  }

  public subscribe(listener: (value: T) => void) {
    this.listeners.push(listener);
    return () => this.listeners = this.listeners.filter(l => l !== listener);
  }

}
