import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter'
import { h, render } from 'preact'

class Disclosure extends HTMLElement {
  static get template() {
    return `
      <button id="trigger" type="button">
        <slot name="trigger"></slot>
      </button>

      <div id="content" hidden>
        <slot></slot>
      </div>
    `
  }

  constructor() {
    super()
    this._isExpanded = false
    this.attachShadow({ mode: 'open' }).innerHTML = Disclosure.template
  }

  connectedCallback() {
    const trigger = this.shadowRoot.querySelector('#trigger')
    const content = this.shadowRoot.querySelector('#content')

    trigger.addEventListener('click', () => {
      if (this._isExpanded) {
        content.hidden = true
      } else {
        content.hidden = false
      }
      this._isExpanded = !this._isExpanded

      this.dispatchEvent(
        new CustomEvent('toggle', {
          detail: { isExpanded: this._isExpanded },
        }),
      )
    })
  }
}

customElements.define('x-disclosure', Disclosure)

render(
  <x-disclosure onToggle={(isExpanded) => console.log(isExpanded)}>
    <span slot="trigger">Disclosure</span>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
      facilis, aut facere corrupti dolores reiciendis sunt soluta excepturi
      harum quo similique. Explicabo vero laboriosam harum qui, omnis beatae a
      voluptatem.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
      facilis, aut facere corrupti dolores reiciendis sunt soluta excepturi
      harum quo similique. Explicabo vero laboriosam harum qui, omnis beatae a
      voluptatem.
    </p>
  </x-disclosure>,
  document.querySelector('#app'),
)
