import {Element} from "./Element";

export class Text extends Element {
  text: string

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ) {
    super(id, x, y, width, height)
    this.type = 'text'
    this.text = text
  }
}
