module.exports = {
	env: {
	  browser: true,
	  es6: true,
	},
	parser: 'babel-eslint',
	extends: ['airbnb', 'prettier', 'prettier/react'],
	globals: {
	  Atomics: 'readonly',
	  SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
	  ecmaFeatures: {
		jsx: true,
		modules: true,
	  },
	  ecmaVersion: 2018,
	  sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
	  'prettier/prettier': 'error',
	  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
	  'react/forbid-prop-types': [0, { forbid: ['any'] }],
	  'react/prop-types': 0,
	  'react/destructuring-assignment': 'off',
	  'react/require-default-props': 'off',
	  'react/jsx-fragments': 'off',
	  'jsx-a11y/click-events-have-key-events': 'off',
	  'jsx-a11y/no-static-element-interactions': 'off',
	  'no-multi-assign': 'off',
	  'one-var': 'off',
	  'no-plusplus': 'off',
	},
	env: {
	  jest: true,
	  browser: true,
	  node: true,
	},
  };