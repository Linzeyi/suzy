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

  // 检验是否为基础类型
  CheckBaseType(value) {
    return !this.CheckReferenceType(value)
  },

  // 检验是否为引用类型
  CheckReferenceType(value) {
    return this.CheckObject(value) || this.CheckArray(value) || this.CheckFunction(value)
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
        if (this.IsObjectEqual(node, currentNode)) {
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
  },

  // 检测基础类型数据是否相等
  IsBaseTypeEqual(x, y) {
    if (x === y) {
      //排除 +0 == -0
      return x !== 0 || y !== 0 || 1 / x === 1 / y
    } else {
      return x !== x && y !== y
    }
  },

  // 检测对象是否相等
  IsObjectEqual(obj1, obj2) {
    if (this.CheckObject(obj1) && this.CheckObject(obj2)) {
      if (this.CheckEmptyObject(obj1) && this.CheckEmptyObject(obj2)) {
        // {} === {}
        return true
      } else if (this.CheckEmptyObject(obj1) || this.CheckEmptyObject(obj2)) {
        // 空对象与非空对象不相等
        return false
      } else if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        // 非空对象属性数不一致
        return false
      } else {
        let flag = true
        for (let i = 0; i < Object.keys(obj1).length; i++) {
          const el1 = obj1[Object.keys(obj1)[i]]
          const el2 = obj2[Object.keys(obj2)[i]]
          if (this.CheckBaseType(el1) && this.CheckBaseType(el2)) {
            flag = this.IsBaseTypeEqual(el1, el2)
          } else if (this.CheckFunction(el1)) {
            flag = JSON.stringify(el1) === JSON.stringify(el2)
          } else if (this.CheckArray(el1)) {
            if (this.CheckArray(el2)) {
              let flag2 = true
              for (let j = 0; j < Object.keys(el1).length; j++) {
                const subEl1 = el1[Object.keys(el1)[j]]
                const subEl2 = el2[Object.keys(el2)[j]]
                flag2 = this.IsObjectEqual(subEl1, subEl2)
              }
              flag = flag2
            } else {
              flag = false
            }
          } else if (this.CheckObject(el1)) {
            if (this.CheckObject(el2)) {
              flag = this.IsObjectEqual(el1, el2)
            } else {
              flag = false
            }
          }
        }
        return flag
      }
    } else {
      return false
    }
  }
}
