import React from 'react'
import { BaseComponent } from '@/src/util/BaseComponent'
// import style from '@/src/assets/switch.scss'
export class Switch extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      isActive: props.defaultActive,
      froze: props.froze !== 'false'
    }
  }
  handleChange() {
    if(this.state.froze){
      return
    }
    this.setState({
      isActive: !this.state.isActive
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.isActive)
      }
    })
  }
  render() {
    const { isActive } = this.state
    const { className } = this.props
    return (
        <label className={this.className('el-switcher',[className],{
          active: isActive
        })} onClick={this.handleChange.bind(this)}>
          <div className="switcher">
            <div className="switcher-core"></div>
          </div>
        </label>
    )
  }
}