import React from 'react'
import { BaseComponent } from '@/src/util/BaseComponent'
export default class Button extends BaseComponent {
  constructor(props) {
    super(props)
  }
  handleClick(e) {
    let { onClick } = this.props
    if (onClick) {
      onClick.call(null, e)
    }
  }
  render() {
    const { className, text, width, height } = this.props
    return (
      <button className={this.className('el-btn', [className])}
        onClick={e => this.handleClick(e)} style={{
          width: width + 'px',
          height: height + 'px'
        }}>
      </button>
    )
  }
}