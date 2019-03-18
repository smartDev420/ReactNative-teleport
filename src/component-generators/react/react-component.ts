import { AssemblyLine, Builder, Resolver } from '../../core'

import reactComponentPlugin from '../../plugins/teleport-plugin-react-base-component'
import reactStyledJSXPlugin from '../../plugins/teleport-plugin-react-styled-jsx'
import reactJSSPlugin from '../../plugins/teleport-plugin-react-jss'
import reactInlineStylesPlugin from '../../plugins/teleport-plugin-react-inline-styles'
import reactPropTypesPlugin from '../../plugins/teleport-plugin-react-proptypes'
import reactCSSModulesPlugin from '../../plugins/teleport-plugin-react-css-modules'
import importStatementsPlugin from '../../plugins/teleport-plugin-import-statements'

import {
  GeneratorOptions,
  ReactComponentStylingFlavors,
  ComponentGenerator,
  CompiledComponent,
} from '../../shared/types'
import { ComponentUIDL, Mapping } from '../../uidl-definitions/types'

import htmlMapping from '../../uidl-definitions/elements-mapping/html-mapping.json'
import reactMapping from './react-mapping.json'

interface ReactGeneratorFactoryParams {
  variation?: ReactComponentStylingFlavors
  customMapping?: Mapping
}

const stylePlugins = {
  [ReactComponentStylingFlavors.InlineStyles]: reactInlineStylesPlugin,
  [ReactComponentStylingFlavors.CSSModules]: reactCSSModulesPlugin,
  [ReactComponentStylingFlavors.StyledJSX]: reactStyledJSXPlugin,
  [ReactComponentStylingFlavors.JSS]: reactJSSPlugin,
}

const createReactGenerator = (params: ReactGeneratorFactoryParams = {}): ComponentGenerator => {
  const { variation = ReactComponentStylingFlavors.InlineStyles, customMapping } = params
  const stylePlugin = stylePlugins[variation] || reactInlineStylesPlugin

  const resolver = new Resolver()
  resolver.addMapping(htmlMapping)
  resolver.addMapping(reactMapping)
  resolver.addMapping(customMapping)

  const assemblyLine = new AssemblyLine()
  assemblyLine.addPlugin(reactComponentPlugin)
  assemblyLine.addPlugin(stylePlugin)
  assemblyLine.addPlugin(reactPropTypesPlugin)
  assemblyLine.addPlugin(importStatementsPlugin)

  const chunksLinker = new Builder()

  const generateComponent = async (
    uidl: ComponentUIDL,
    generatorOptions: GeneratorOptions = {}
  ): Promise<CompiledComponent> => {
    const resolvedUIDL = resolver.resolveUIDL(uidl, generatorOptions)
    const { chunks, externalDependencies } = await assemblyLine.run(resolvedUIDL)

    const code = chunksLinker.link(chunks.default)
    const externalCSS = chunksLinker.link(chunks.cssmodule)

    return {
      code,
      externalCSS,
      externalDependencies,
    }
  }

  return {
    generateComponent,
    resolveContentNode: resolver.resolveContentNode.bind(resolver),
    addMapping: resolver.addMapping.bind(resolver),
    addPlugin: assemblyLine.addPlugin.bind(assemblyLine),
  }
}

export default createReactGenerator
