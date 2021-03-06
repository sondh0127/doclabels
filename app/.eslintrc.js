module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    // Uses the recommended rules from @eslint-plugin-react
    'plugin:react/recommended',

    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',

    'prettier/react',
    'prettier/standard',

    // Enables eslint-plugin-prettier and eslint-config-prettier. This will
    // display prettier errors as ESLint errors. Make sure this is always
    // the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'prefer-object-spread',
    'prettier',
    'react-hooks',
  ],
  settings: {
    react: {
      pragma: 'React',
      // Tells eslint-plugin-react to automatically detect the version of
      // React to use
      version: 'detect',
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    indent: 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/camelcase': 'off',

    // In an ideal world, we'd never have to use @ts-ignore, but that's not
    // possible right now.
    '@typescript-eslint/ban-ts-ignore': 'off',

    // Again, in theory this is a good rule, but it can cause a bit of
    // unhelpful noise.
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Another theoretically good rule, but sometimes we know better than
    // the linter.
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Accessibility rules
    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/label-has-associated-control': 'error',

    'prefer-object-spread/prefer-object-spread': 'error',

    // Use template strings instead of string concatenation
    'prefer-template': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Place to specify ESLint rules. Can be used to overwrite rules
    // specified from the extended configs

    // We're using TypeScript, so prop-types aren't so interesting
    'react/prop-types': 'off',

    // This is documented as the default, but apparently now needs to be
    // set explicitly
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
