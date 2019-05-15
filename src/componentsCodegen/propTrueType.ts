import { refClassName, toBaseType } from '../utils'
import { IComponentProperty } from '../swaggerInterfaces'

export function propTrueComponentType(
  v: IComponentProperty
): {
  propType: string,
  isArray: boolean,
  ref: string
} {
  let result = {
    propType: '',
    ref: '',
    isArray: false
  }

  if (v.$ref) {
    result.propType = refClassName(v.$ref)
    result.ref = result.propType
  } else if (v.items) {
    if (v.items.$ref) {
      const currentResult = propTrueComponentType(v.items)
      currentResult.propType += '[]'
      result = { ...result, ...currentResult }
    } else if (!!v.items.enum) {
      const currentResult = propTrueComponentType(v.items)
      result = { ...result, ...currentResult }
    } else {
      result.propType = toBaseType(v.items.type) + '[]'
    }

    result.isArray = true
  } else {
    result.propType = toBaseType(v.type)
  }

  return result
}
