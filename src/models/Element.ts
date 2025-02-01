export class Element {
  id: number

  x: number

  y: number

  width: number

  height: number

  type: string = ''

  text?: string

  color?: string

  content?: string

  constructor(
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.id = id
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}
