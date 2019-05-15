import { IComponents } from '../swaggerInterfaces'
import { refClassName } from '../utils'
import { createComponentClass } from './createComponentClass'
import { IComponentClasses } from '../baseInterfaces'

export function componentsCodegen(components: IComponents) {
  let definitionModels: IComponentClasses = {}
  for (const [k, v] of Object.entries(components)) {
    let className = refClassName(k)

    if (v.type === 'array') {
      // #TODO
    } else {
      // default definition generate
      const { model } = createComponentClass(className, v.properties)

      definitionModels[`#/components/schemas/${k}`] = {
        value: model,
        name: className
      }
    }
  }

  return { models: definitionModels }
}
