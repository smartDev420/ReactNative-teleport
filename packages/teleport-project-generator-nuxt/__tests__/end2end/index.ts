import uidlSample from '../../../../examples/test-samples/project-sample.json'
import uidlSampleWithDependencies from '../../../../examples/test-samples/project-sample-with-dependency.json'
import invalidUidlSample from '../../../../examples/test-samples/project-invalid-sample.json'
import template from './template-definition.json'
import { createNuxtProjectGenerator } from '../../src'

describe('Vue Nuxt Project Generator', () => {
  const generator = createNuxtProjectGenerator()

  it('runs without crashing', async () => {
    const outputFolder = await generator.generateProject(uidlSample, template)
    const assetsPath = generator.getAssetsPath()

    const packageJSON = outputFolder.files[1]

    expect(assetsPath).toBeDefined()
    expect(outputFolder.name).toBe(template.name)
    expect(packageJSON).toBeDefined()
  })

  it('runs without crashing with external dependencies with supported syntaxes', async () => {
    const outputFolder = await generator.generateProject(uidlSampleWithDependencies, template)
    const assetsPath = generator.getAssetsPath()

    const packageJSON = outputFolder.files[1]
    const pages = outputFolder.subFolders[1]
    const components = outputFolder.subFolders[0]

    expect(assetsPath).toBeDefined()
    expect(outputFolder.name).toBe(template.name)
    expect(packageJSON).toBeDefined()
    expect(pages.files.length).toBe(3)
    expect(components.files.length).toBe(4)

    /*
     * Support for external dependencies for Nuxt is same as Vue
     * For further details, refer --> https://github.com/teleporthq/teleport-code-generators/pull/478
     */

    expect(components.files[2].content).toContain(`import { Button } from 'antd'`)
    expect(packageJSON.content).toContain(`"antd": "4.5.4"`)

    /* For Nuxt based projects, just imports are injected in index file of the routes */
    expect(pages.files[0].content).toContain(`import 'antd/dist/antd.css'`)
  })

  it('throws error when invalid UIDL sample is used', async () => {
    const result = generator.generateProject(invalidUidlSample, template)

    await expect(result).rejects.toThrow(Error)
  })
})
