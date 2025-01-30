import { Element } from './Element'

export class Poster {
  background: Blob | null = null
  elements: Element[] = []
  public index: number = 0

  addElement(element: Element) {
    console.log(this.index)
    this.index += 1
    this.elements.push(element)
  }

  removeElement(id: number) {
    this.elements = this.elements.filter(element => element.id !== id)
  }

  setBackground(background: Blob) {
    this.background = background
  }

  updateElement(id: number, element: Element) {
    this.elements = this.elements.map(e => e.id === id ? element : e)
  }

  static newPoster(oldPoster: Poster): Poster {
    const poster =  new Poster()
    poster.background = oldPoster.background
    poster.elements = oldPoster.elements
    poster.index = oldPoster.index

    return poster
  }
}
