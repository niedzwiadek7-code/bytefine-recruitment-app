import { Element } from './Element'

export class Poster {
  background: string | null = null
  elements: Element[] = []
  public index: number = 0

  addElement(element: Omit<Element, "id">) {
    const newElement = { ...element, id: this.index }
    const newPoster = this.copyWith({
      elements: [...this.elements, newElement]
    })
    newPoster.index = this.index + 1
    return newPoster
  }

  removeElement(id: number) {
    return this.copyWith({
      elements: this.elements.filter(e => e.id !== id)
    })
  }

  updateElement(id: number, update: Partial<Element>) {
    return this.copyWith({
      elements: this.elements.map(e =>
        e.id === id ? { ...e, ...update } : e
      )
    })
  }

  private copyWith(params: Partial<Poster>) {
    const newPoster = new Poster()
    newPoster.background = this.background
    newPoster.elements = params.elements ?? [...this.elements]
    newPoster.index = this.index
    return newPoster
  }

  setBackground(background: string) {
    const newPoster = this.copyWith({})
    newPoster.background = background
    return newPoster
  }
}
