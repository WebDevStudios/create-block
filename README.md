# Create Block

Easily create a block for the WordPress block editor. Includes support for Sass, PostCSS, and WebDevStudios Coding Standards. This package also includes tools like [Webpack](https://webpack.js.org), [Babel](https://babeljs.io), and [ESLint](https://eslint.org).

Visit the [Gutenberg handbook](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/) to learn more about Block API.

<a href="https://webdevstudios.com/contact/"><img src="https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png" alt="WebDevStudios. Your Success is Our Mission."></a>

## Requirements

[Node](https://nodejs.org/en/) (`12.x`). We highly recommend [NVM](https://github.com/nvm-sh/nvm) so you can easily switch between Node versions.

## Usage

The following command generates PHP, JS and CSS code for registering a block.

You just need to provide the `Namespace/BlockName`.
  ```bash
  $ npm init @webdevstudios/wds-block WebDevStudios/TodoList
  $ cd todo-list
  $ npm start
  ```

Options:
```bash
-V, --version          output the version number
-h, --help             output usage information
```

_Please note that `--version` and `--help` options don't work with `npm init`. You have to use `npx` instead, as presented in the examples._

## Contributions

Your contributions and [support tickets](https://github.com/WebDevStudios/create-block/issues) are welcome. Please see our [guidelines](https://github.com/WebDevStudios/create-block/blob/master/.github/CONTRIBUTING.md) before submitting a pull request.

## Credits

This project was forked from [@wordpress/create-block](https://github.com/WordPress/gutenberg/blob/master/packages/create-block/README.md). 
