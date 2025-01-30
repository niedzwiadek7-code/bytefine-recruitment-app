import {Element} from "./Element";

export class Text extends Element {
  text: string
  color: string

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    color: string = '#353535'
  ) {
    super(id, x, y, width, height)
    this.type = 'text'
    this.text = text
    this.color = color
  }
}
