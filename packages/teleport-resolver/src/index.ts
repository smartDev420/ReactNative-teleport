import * as utils from './utils'
import { sanitizeVariableName } from '@teleporthq/teleport-shared/lib/utils/string-utils'
import { cloneObject } from '@teleporthq/teleport-shared/lib/utils/uidl-utils'
import { GeneratorOptions } from '@teleporthq/teleport-types-generator'
import { ComponentUIDL, UIDLElement, Mapping } from '@teleporthq/teleport-types-uidl-definitions'

/**
 * The resolver takes the input UIDL and converts all the abstract node types into
 * concrete node types, based on the mappings you provide
 */
export default class Resolver {
  private mapping: Mapping = {
    elements: {},
    events: {},
  }

  constructor(mapping?: Mapping | Mapping[]) {
    if (Array.isArray(mapping)) {
      mapping.forEach((mp) => this.addMapping(mp))
    } else if (mapping) {
      this.addMapping(mapping)
    }
  }

  public addMapping(mapping: Mapping) {
    this.mapping = utils.mergeMappings(this.mapping, mapping)
  }

  public resolveUIDL(uidl: ComponentUIDL, options: GeneratorOptions = {}) {
    const mapping = utils.mergeMappings(this.mapping, options.mapping)
    const newOptions = {
      ...options,
      mapping,
    }

    const node = cloneObject(uidl.node)
    utils.resolveNode(node, newOptions)

    const nodesLookup = {}
    utils.createNodesLookup(node, nodesLookup)
    utils.generateUniqueKeys(node, nodesLookup)

    return {
      ...uidl,
      name: sanitizeVariableName(uidl.name),
      node,
    }
  }

  public resolveElement(element: UIDLElement, options: GeneratorOptions = {}) {
    const mapping = utils.mergeMappings(this.mapping, options.mapping)
    const newOptions = {
      ...options,
      mapping,
    }
    const returnElement = cloneObject(element)
    utils.resolveElement(returnElement, newOptions)
    return returnElement
  }
}
