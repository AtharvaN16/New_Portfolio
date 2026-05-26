import { Config } from '@remotion/cli/config'
import path from 'path'

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve('./src'),
        'next/font/google': path.resolve('./remotion/mocks/next-font-google.ts'),
      },
    },
  }
})
