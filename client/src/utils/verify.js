// 校验工具类方法
export default {
  // 校验类型
  CheckType(value, type) {
    let types = {
      boolean: '[object Boolean]',
      number: '[object Number]',
      String: '[object String]',
      undefined: '[object Undefined]',
      null: '[object Null]',
      array: '[object Array]',
      function: '[object Function]',
      object: '[object Object]'
    }
    return Object.prototype.toString.call(value) === types[type]
  },

  // 检验是否为Boolean
  CheckBoolean(value) {
    return this.CheckType(value, 'boolean')
  },

  // 检验是否为number
  CheckNumber(value) {
    return this.CheckType(value, 'number')
  },

  // 检验是否为string
  CheckString(value) {
    return this.CheckType(value, 'string')
  },

  // 检验是否为undefined
  CheckUndefined(value) {
    return this.CheckType(value, 'undefined')
  },

  // 检验是否为null
  CheckNull(value) {
    return this.CheckType(value, 'null')
  },

  // 检验是否为array
  CheckArray(value) {
    return this.CheckType(value, 'array')
  },

  // 检验是否为function
  CheckFunction(value) {
    return this.CheckType(value, 'function')
  },

  // 检验是否为object
  CheckObject(value) {
    return this.CheckType(value, 'object')
  },

  // 检验是否为空字符串
  CheckEmptyString(value) {
    return this.CheckString(value) && value === ''
  },

  // 检验是否为空数组
  CheckEmptyArray(value) {
    return this.CheckArray(value) && value.length == 0
  },

  // 检验是否为空对象
  CheckEmptyObject(value) {
    return this.CheckObject(value) && JSON.stringify(value) == '{}'
  },

  // 检验是否为空（''、[]、null、undefined、{}）
  CheckEmpty(value) {
    return this.CheckEmptyString(value) || this.CheckEmptyArray(value) || this.CheckNull(value) || this.CheckUndefined(value) || this.CheckEmptyObject(value)
  },

  // 根据value值获取孩子节点
  GetChildByValue(nodes, value, option = {}) {
    let _option = Object.assign({ value: 'value', children: 'children' }, option)

    if (!this.CheckArray(nodes)) {
      try {
        // 安全性检测，确保入参nodes为数组
        if (this.CheckObject(nodes) && !this.CheckEmpty(nodes)) {
          nodes = [nodes]
        } else {
          throw 'GetChildByNode方法参数异常'
        }
      } catch (err) {
        console.log('error: ' + err)
      }
    }

    if (this.CheckEmpty(nodes)) {
      return {}
    } else {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if (node[_option.value] === value) {
          return node
        }
        if (!this.CheckEmpty(node[_option.children])) {
          let _node = this.GetChildByValue(node[_option.children], value, _option)
          if (!this.CheckEmpty(_node)) {
            return _node
          }
        }
      }
      return {}
    }
  },

  // 根据value值检测是否存在该孩子节点
  CheckChildByValue(nodes, value, option = {}) {
    return !this.CheckEmpty(this.GetChildByValue(nodes, value, option))
  },

  // 根据节点对象获取孩子节点
  GetChildByNode(nodes, currentNode, option = {}) {
    let _option = Object.assign({ value: 'value', children: 'children' }, option)

    if (!this.CheckArray(nodes)) {
      try {
        // 安全性检测，确保入参nodes为数组
        if (this.CheckObject(nodes) && !this.CheckEmpty(nodes)) {
          nodes = [nodes]
        } else {
          throw 'GetChildByNode方法参数异常'
        }
      } catch (err) {
        console.log('error: ' + err)
      }
    }

    if (this.CheckEmpty(nodes)) {
      return {}
    } else {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if (node[_option.value] === currentNode[_option.value]) {
          return node
        }
        if (!this.CheckEmpty(node[_option.children])) {
          let _node = this.GetChildByNode(node[_option.children], currentNode, _option)
          if (!this.CheckEmpty(_node)) {
            return _node
          }
        }
      }
      return {}
    }
  },

  // 根据节点对象检测是否存在该孩子节点
  CheckChildByNode(nodes, currentNode, option = {}) {
    return !this.CheckEmpty(this.GetChildByNode(nodes, currentNode, option))
  }
}
