import { IComponentProperties } from '../swaggerInterfaces'
import { propTrueComponentType } from './propTrueType'
import { IClassComp } from '../baseInterfaces'

/**
 * @param className
 * @param properties
 */
export function createComponentClass(className: string, properties: IComponentProperties) {
  let model: IClassComp = { name: className, props: [] }
  const propertiesEntities = Object.entries(properties || {})

  for (const [k, v] of propertiesEntities) {
    let { propType } = propTrueComponentType(v)

    // propsStr += classPropsTemplate(k, propType, v.description)
    model.props.push({ name: k, type: propType, desc: v.description ? v.description : '' })
  }
  // : classTemplate(className, propsStr, constructorStr)
  return { model }
}
