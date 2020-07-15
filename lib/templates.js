/**
 * Internal dependencies
 */
const CLIError = require( './cli-error' );
const prompts = require( './prompts' );

const namespace = 'create-block';
const dashicon = 'smiley';
const category = 'widgets';
const author = 'The WordPress Contributors';
const license = 'GPL-2.0-or-later';
const licenseURI = 'https://www.gnu.org/licenses/gpl-2.0.html';
const version = '0.1.0';

const templates = {
    wds: {
        defaultValues: {
            namespace: 'WebDevStudios',
            slug: 'BlockStarter',
            title: 'WDS Block Starter',
            description:
                'A starter plugin for Gutenberg blocks development.',
            dashicon,
            category,
            author,
            license,
            licenseURI,
            version,
        },
        outputFiles: [
            'src/block/$demo/edit.js',
            'src/block/$demo/editor.scss',
            'src/block/$demo/index.js',
            'src/block/$demo/save.js',
            'src/block/$demo/style.scss',
            'src/block/index.js',
            'src/frontend.js',
            'src/index.js',
            '.editorconfig',
            '.eslintignore',
            '.gitignore',
            '.phpcs.xml.dist',
            '.prettierignore',
            '.stylelintignore',
            'composer.json',
            'package.json',
            'postcss.config.js',
            'webpack.config.js',
            '$slug.php', // <-- This is the end.
        ],
    },
};

const getTemplate = ( templateName ) => {
	if ( ! templates[ templateName ] ) {
		throw new CLIError(
			`Invalid template type name. Allowed values: ${ Object.keys(
				templates
			).join( ', ' ) }.`
		);
	}
	return templates[ templateName ];
};

const getDefaultValues = ( templateName ) => {
	return getTemplate( templateName ).defaultValues;
};

const getOutputFiles = ( templateName ) => {
	return getTemplate( templateName ).outputFiles;
};

const getPrompts = ( templateName ) => {
	const defaultValues = getDefaultValues( templateName );
	return Object.keys( prompts ).map( ( promptName ) => {
		return {
			...prompts[ promptName ],
			default: defaultValues[ promptName ],
		};
	} );
};

module.exports = {
	getDefaultValues,
	getOutputFiles,
	getPrompts,
};
