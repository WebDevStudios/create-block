/**
 * External dependencies
 */
const { dirname, join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );
const { snakeCase, kebabCase, toLower } = require( 'lodash' );

/**
 * Internal dependencies
 */
const initWPScripts = require( './init-wp-scripts' );
const { code, info, success } = require( './log' );
const { getOutputFiles } = require( './templates' );

module.exports = async function(
	templateName,
	{
		namespace,
		blockName,
		slug,
		title,
		description,
		dashicon,
		category,
		author,
		license,
		licenseURI,
		version,
	}
) {

	const namespaceToLower = toLower( namespace );
	const folderName       = `${ namespaceToLower }-${ slug }`;
	const view             = {
		namespace,
		namespaceSnakeCase: snakeCase( namespace ),
		namespaceKebabCase: kebabCase( namespace ),
		namespaceToLower,
		fullNamespace: `${ namespace }\\${ blockName }`,
		slug,
		slugSnakeCase: snakeCase( slug ),
		title,
		description,
		dashicon,
		category,
		version,
		author,
		license,
		licenseURI,
		textdomain: slug,
	};

	info( '' );
	info( `Creating a new WordPress block in "${ folderName }" folder.` );

	await Promise.all(
		getOutputFiles( templateName ).map( async ( file ) => {
			const template = await readFile(
				join(
					__dirname,
					`templates/${ templateName }/${ file }.mustache`
				),
				'utf8'
			);
			// Output files can have names that depend on the slug provided.
			const outputFilePath = `${ folderName }/${ file.replace(
				/\$slug|\$demo/g,
				slug
			) }`;
			await makeDir( dirname( outputFilePath ) );
			writeFile( outputFilePath, render( template, view ) );
		} )
	);

	await initWPScripts( folderName );

	info( '' );
	success(
		`Done: block "${ title }" bootstrapped in the "${ folderName }" folder.`
	);
	info( '' );
	info( 'Inside that directory, you can run several commands:' );
	info( '' );
	code( '  $ npm start' );
	info( '    Starts the build for development.' );
	info( '' );
	code( '  $ npm run build' );
	info( '    Builds the code for production.' );
	info( '' );
	code( '  $ npm run format:js' );
	info( '    Formats JavaScript files.' );
	info( '' );
	code( '  $ npm run lint:css' );
	info( '    Lints CSS files.' );
	info( '' );
	code( '  $ npm run lint:js' );
	info( '    Lints JavaScript files.' );
	info( '' );
	code( '  $ npm run packages-update' );
	info( '    Updates WordPress packages to the latest version.' );
	info( '' );
	info( 'You can start by typing:' );
	info( '' );
	code( `  $ cd ${ folderName }` );
	code( `  $ npm start` );
	info( '' );
	info( 'Code is Poetry' );
};
