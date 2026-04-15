import EslintJs from "@eslint/js"

import * as EslintNextPlugin from "@next/eslint-plugin-next"

import StylisticJs from "@stylistic/eslint-plugin"

import * as EslintConfig from "eslint/config"

import * as EslintImportResolverTypeScript from "eslint-import-resolver-typescript"

import * as EslintPluginImportX from "eslint-plugin-import-x"

// from eslint-config-next
import EslintPluginJsxA11y from "eslint-plugin-jsx-a11y"

// from eslint-config-next
import EslintPluginReact from "eslint-plugin-react"

// from eslint-config-next
import EslintPluginReactHooks from "eslint-plugin-react-hooks"

import Globals from "globals"

import * as TypeScriptEslint from "typescript-eslint"

export default EslintConfig.defineConfig([

	EslintConfig.globalIgnores([
		"**/.next/",
		"**/node_modules/",
		"./apps/fastify/.fastify/",
		"./apps/fastify/database/",
	]),

	EslintJs.configs.recommended,

	EslintPluginImportX.importX.flatConfigs.recommended,
	EslintPluginImportX.importX.flatConfigs.typescript,

	{
		rules: {
			"consistent-return": "error",
			"eol-last": "error",
			"semi": "off",
			"yoda": "error",

			"import-x/first": "error",
			"import-x/newline-after-import": [
				"error",
				{
					"count": 1,
					"considerComments": true,
				},
			],
			"import-x/no-cycle": "error",
			"import-x/order": [
				"error",
				{
					"alphabetize": {
						"order": "asc",
					},
					/**
					 * I want to distinct module import, not only the group
					 * Ommitting this prop is not force me to put new empty line each import tho
					 */
					// "consolidateIslands": "inside-groups",
					"distinctGroup": false,
					"newlines-between": "always-and-inside-groups",
					"named": {
						"enabled": true,
						"cjsExports": true,
						"export": true,
						"import": true,
						"require": true,
						"types": "types-last",
					},
					"groups": [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
					"pathGroups": [
						{
							"pattern": "react",
							"group": "builtin",
							"position": "after",
						},
						{
							"pattern": "fastify",
							"group": "builtin",
							"position": "after",
						},
						{
							"pattern": "next",
							"group": "builtin",
							"position": "after",
						},
						{
							"pattern": "@/*",
							"group": "external",
							"position": "after",
						},
					],
					"pathGroupsExcludedImportTypes": [
						"builtin",
					],
					"warnOnUnassignedImports": true,
				},
			],
		},
	},

	{
		plugins: {
			"@stylistic": StylisticJs,
		},
		rules: {
			"@stylistic/block-spacing": "error",
			"@stylistic/brace-style": [
				"error",
				"1tbs",
			],
			"@stylistic/comma-dangle": [
				"warn",
				"always-multiline",
			],
			"@stylistic/comma-spacing": ["error", {
				"before": false,
				"after": true,
			}],
			"@stylistic/function-call-spacing": [
				"error",
				"never",
			],
			"@stylistic/indent": ["warn", "tab"],
			"@stylistic/key-spacing": [
				"error",
				{
					"beforeColon": false,
				},
			],
			"@stylistic/jsx-curly-spacing": [
				"warn",
				{
					"when": "always",
					"spacing": {
						"objectLiterals": "never",
					},
				},
			],
			"@stylistic/jsx-equals-spacing": [
				"error",
				"never",
			],
			"@stylistic/jsx-max-props-per-line": [
				"warn",
				{
					"maximum": 2,
				},
			],
			"@stylistic/keyword-spacing": [
				"error",
				{
					"overrides": {
						"if": {
							"after": false,
						},
						"for": {
							"after": false,
						},
						"catch": {
							"after": true,
							"before": true,
						},
					},
				},
			],
			"@stylistic/no-mixed-operators": [
				"error",
				{
					"groups": [
						["&", "|", "^", "~", "<<", ">>", ">>>"],
						["==", "!=", "===", "!==", ">", ">=", "<", "<="],
						["&&", "||"],
						["in", "instanceof"],
					],
					"allowSamePrecedence": false,
				},
			],
			"@stylistic/no-multiple-empty-lines": [
				"error",
				{
					"max": 2,
					"maxEOF": 1,
					"maxBOF": 0,
				},
			],
			"@stylistic/no-trailing-spaces": [
				"warn",
				{
					"ignoreComments": true,
				},
			],
			"@stylistic/object-curly-newline": [
				"error",
				{
					"ObjectExpression": {
						"multiline": true,
						"consistent": true,
					},
					"ObjectPattern": {
						"multiline": true,
						"consistent": true,
					},
					"ExportDeclaration": "always",
					"ImportDeclaration": "always",
					"TSTypeLiteral": "always",
					"TSInterfaceBody": "always",
					"TSEnumBody": "always",
				},
			],
			"@stylistic/object-curly-spacing": [
				"warn",
				"always",
			],
			"@stylistic/semi": "off",
			"@stylistic/semi-spacing": [
				"error",
				{
					"before": false,
					"after": true,
				},
			],
			"@stylistic/space-before-blocks": "warn",
			"@stylistic/space-before-function-paren": [
				"error",
				{
					"anonymous": "never",
					"asyncArrow": "always", // valid: async () => {} | error: async() => {}
					"named": "never",
					"catch": "never",
				},
			],
			"@stylistic/space-infix-ops": [
				"error",
				{
					"int32Hint": true,
				},
			],
			"@stylistic/spaced-comment": [
				"warn",
				"always",
			],
			"@stylistic/quotes": [
				"error",
				"double",
				{
					"allowTemplateLiterals": "always",
				},
			],
		},
	},

	...TypeScriptEslint.configs.recommendedTypeChecked.map(conf => ({
		...conf,
		files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
	})),
	{
		files: [
			"**/*.ts",
			"**/*.tsx",
			"**/*.mts",
		],
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-require-imports": "off",
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		settings: {
			"import-x/resolver-next": [
				EslintImportResolverTypeScript.createTypeScriptImportResolver({
					project: "./tsconfig.json",
					// override default https://github.com/import-js/eslint-import-resolver-typescript?tab=readme-ov-file#extensions
					alwaysTryTypes: true,
					extensions: [
						".ts",
						".tsx",
						".d.ts",
						".js",
						".jsx",
						".json",
						".node",
					],
				}),
			],
		},
	},

	{
		files: [
			"./apps/fastify/src/**/*.{js,ts}",
		],
		rules: {
			"@typescript-eslint/only-throw-error": "off",
		},
	},

	// https://nextjs.org/docs/app/api-reference/config/eslint#migrating-existing-config
	{
		files: [
			"./apps/scalar-api-docs/src/**/*.{js,jsx,ts,tsx}",
		],
		plugins: {
			"@next/next": EslintNextPlugin.default,
		},
		rules: {
			...EslintNextPlugin.default.configs["core-web-vitals"].rules,
		},
		settings: {
			next: {
				rootDir: [
					"./apps/scalar-api-docs/",
				],
			},
		},
	},

	// All react rules due to using `@next/eslint-plugin-next` directly instead of the `eslint-config-next`
	// because `@next/eslint-plugin-next` does not contain any react lint rules
	{
		files: [
			"./apps/scalar-api-docs/src/**/*.{ts,tsx}",
		],
		plugins: {
			"jsx-a11y": EslintPluginJsxA11y,
			"react": EslintPluginReact,
			"react-hooks": EslintPluginReactHooks,
		},
		rules: {
			...EslintPluginReact.configs.flat["jsx-runtime"].rules,
			...EslintPluginReactHooks.configs.flat.recommended.rules,
			"jsx-a11y/alt-text": [
				"warn",
				{
					elements: [
						"img",
					],
					img: [
						"Image",
					],
				},
			],
			"jsx-a11y/aria-props": "warn",
			"jsx-a11y/aria-proptypes": "warn",
			"jsx-a11y/aria-unsupported-elements": "warn",
			"jsx-a11y/role-has-required-aria-props": "warn",
			"jsx-a11y/role-supports-aria-props": "warn",
		},
		languageOptions: {
			globals: {
				...Globals.browser,
			},
		},
	},

	{
		files: [
			"./apps/*/scripts/**/*.{js,mjs}",
		],
		languageOptions: {
			globals: Globals.node,
		},
	},

])
