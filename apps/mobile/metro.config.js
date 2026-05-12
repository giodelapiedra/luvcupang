// Metro config tuned for an npm-workspaces monorepo.
// - watchFolders: lets Metro pick up file changes in packages/ and other workspaces.
// - resolver.nodeModulesPaths: tells Metro to also look in the root node_modules,
//   since with workspaces, deps are often hoisted to the root.
// We keep Expo's default `disableHierarchicalLookup` (false) so doctor stays happy
// and Metro can still walk up the tree — the extra paths above are sufficient
// to make workspace packages resolvable.
const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot, ...(config.watchFolders ?? [])];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = withNativeWind(config, { input: './global.css' });
