import {Element} from "./Element";

export class Image extends Element {
  content: string

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    content: string
  ) {
    super(id, x, y, width, height)
    this.content = content
    this.type = 'image'
  }
}
