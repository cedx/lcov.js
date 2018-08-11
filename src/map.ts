/**
 * Defines the shape of a map in JSON format.
 */
export interface JsonMap<T> {

  /**
   * Gets or sets the value for the given key.
   */
  [key: string]: T;
}
