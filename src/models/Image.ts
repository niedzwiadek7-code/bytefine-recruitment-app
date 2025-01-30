import {Element} from "./Element";

export class Image extends Element {
  blob: Blob

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    blob: Blob
  ) {
    super(id, x, y, width, height)
    this.blob = blob
    this.type = 'image'
  }
}
