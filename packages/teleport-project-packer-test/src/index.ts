import projectPacker from '@teleporthq/teleport-project-packer'

import reactGenerator from '@teleporthq/teleport-project-generator-react-basic'
import reactNextGenerator from '@teleporthq/teleport-project-generator-react-next'
import vueGenerator from '@teleporthq/teleport-project-generator-vue-basic'
import vueNuxtGenerator from '@teleporthq/teleport-project-generator-vue-nuxt'
import preactGenerator from '@teleporthq/teleport-project-generator-preact-basic'

import { createDiskPublisher } from '@teleporthq/teleport-publisher-disk'
import { ProjectUIDL, RemoteTemplateDefinition } from '@teleporthq/teleport-types'

import config from '../config.json'

import {
  GITHUB_TEMPLATE_OWNER,
  REACT_BASIC_GITHUB_PROJECT,
  REACT_NEXT_GITHUB_PROJECT,
  VUE_GITHUB_PROJECT,
  VUE_NUXT_GITHUB_PROJECT,
  PREACT_GITHUB_PROJECT,
} from './constants'

import projectUIDL from '../../../examples/uidl-samples/project.json'

const generators = {
  'react-basic': reactGenerator,
  'react-next': reactNextGenerator,
  'vue-basic': vueGenerator,
  'vue-nuxt': vueNuxtGenerator,
  'preact-basic': preactGenerator,
}

const getGithubRemoteDefinition = (username: string, repo: string): RemoteTemplateDefinition => {
  return { username, repo, provider: 'github' }
}

const templates = {
  'react-basic': getGithubRemoteDefinition(GITHUB_TEMPLATE_OWNER, REACT_BASIC_GITHUB_PROJECT),
  'react-next': getGithubRemoteDefinition(GITHUB_TEMPLATE_OWNER, REACT_NEXT_GITHUB_PROJECT),
  'vue-basic': getGithubRemoteDefinition(GITHUB_TEMPLATE_OWNER, VUE_GITHUB_PROJECT),
  'vue-nuxt': getGithubRemoteDefinition(GITHUB_TEMPLATE_OWNER, VUE_NUXT_GITHUB_PROJECT),
  'preact-basic': getGithubRemoteDefinition(GITHUB_TEMPLATE_OWNER, PREACT_GITHUB_PROJECT),
}

const publisher = createDiskPublisher({
  outputPath: 'dist',
})

const packProject = async (projectType: string) => {
  const remoteTemplate = templates[projectType] as RemoteTemplateDefinition

  remoteTemplate.auth = {
    token: config.token,
  }

  projectPacker.setPublisher(publisher)
  projectPacker.setGenerator(generators[projectType])
  await projectPacker.loadTemplate(remoteTemplate)

  const result = await projectPacker.pack(projectUIDL as ProjectUIDL)

  console.info(projectType, ' - ', result)
}

const run = async () => {
  try {
    await packProject('react-basic')
    await packProject('react-next')
    await packProject('vue-basic')
    await packProject('vue-nuxt')
    await packProject('preact-basic')
  } catch (e) {
    console.info(e)
  }
}

run()
