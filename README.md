# Create Block

This is forked from [@wordpress/create-block](https://github.com/WordPress/gutenberg/blob/master/packages/create-block/README.md).

## Description

Blocks are the fundamental element of the WordPress block editor. They are the primary way in which plugins and themes can register their own functionality and extend the capabilities of the editor.

Visit the [Gutenberg handbook](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/) to learn more about Block API.

## Requirement

I recommend that you use the latest version of both Node and NPM. I highly recommend [NVM](https://github.com/nvm-sh/nvm) to easily install and switch Node versions.

## Usage

The following command generates PHP, JS and CSS code for registering a block.

You just need to provide the `<Namespace/BlockName>`.
  ```bash
  $ npm init @donmhico/wds-block WebDevStudios/TodoList
  $ cd todo-list
  $ npm start
  ```

You don’t need to install or configure tools like [webpack](https://webpack.js.org), [Babel](https://babeljs.io) or [ESLint](https://eslint.org) yourself. They are preconfigured and hidden so that you can focus on the code.

Options:
```bash
-V, --version          output the version number
-h, --help             output usage information
```

_Please note that `--version` and `--help` options don't work with `npm init`. You have to use `npx` instead, as presented in the examples._
