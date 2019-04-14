import { Component } from 'react'
import { isPlainObject } from './helper';

export class BaseComponent extends Component {
  // 只支持一级嵌套
  className(...args) {
    return args.reduce((prev, next) => {
      if (typeof next === 'string') {
        prev += ` ${next} `
        return prev
      }
      if (Array.isArray(next)) {
        return prev += next.join(' ') + ' '
      }
      if (isPlainObject(next)) {
        return prev += Object.keys(next).map(key => {
          if (next[key]) {
            return key
          }
          return ''
        }).join(' ')
      }
      return prev
    }, '').trim()
  }
}