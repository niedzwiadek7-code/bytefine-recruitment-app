import { Element } from './Element'
import { Size } from './Size'

export class Poster {
  background: string | null = null

  elements: Element[] = []

  public index: number = 0

  size: Size = new Size(0, 0)

  addElement(element: Omit<Element, 'id'>) {
    const newElement = { ...element, id: this.index }
    const newPoster = this.copyWith({
      elements: [...this.elements, newElement],
    })
    newPoster.index = this.index + 1
    return {
      newPoster,
      index: this.index,
    }
  }

  removeElement(id: number) {
    return this.copyWith({
      elements: this.elements.filter((e) => e.id !== id),
    })
  }

  updateElement(id: number, update: Partial<Element>) {
    return this.copyWith({
      elements: this.elements.map((e) => (e.id === id ? { ...e, ...update } : e)),
    })
  }

  private copyWith(params: Partial<Poster>) {
    const newPoster = new Poster()
    newPoster.size = this.size
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

  setSize(size: Size) {
    const newPoster = this.copyWith({})
    if (newPoster.size.width === 0 || newPoster.size.height === 0) {
      newPoster.size = size
      return newPoster
    }

    if (size.width === newPoster.size.width && size.height === newPoster.size.height) {
      return newPoster
    }

    const scaleX = size.width / newPoster.size.width
    const scaleY = size.height / newPoster.size.height

    newPoster.elements = this.elements.map((element) => {
      const newElement = { ...element }
      newElement.x *= scaleX
      newElement.y *= scaleY
      newElement.width *= scaleX
      newElement.height *= scaleY
      return newElement
    })

    newPoster.size = size
    return newPoster
  }

  updateElementsQueue(elements: Element[]) {
    const newPoster = this.copyWith({})
    newPoster.elements = elements
    return newPoster
  }
}
