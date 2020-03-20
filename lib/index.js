/**
 * External dependencies
 */
const inquirer = require( 'inquirer' );
const program = require( 'commander' );
const { startCase, kebabCase } = require( 'lodash' );

/**
 * Internal dependencies
 */
const checkSystemRequirements = require( './check-system-requirements' );
const CLIError = require( './cli-error' );
const log = require( './log' );
const { engines, version } = require( '../package.json' );
const scaffold = require( './scaffold' );
const { getDefaultValues, getPrompts } = require( './templates' );

const commandName = `wds-create-block`;
program
	.name( commandName )
	.description(
		'Generates PHP, JS and CSS code for registering a block for a WordPress plugin.\n\n' +
			'[slug] is optional. When provided it triggers the quick mode where it is used ' +
			'as the block slug used for its identification, the output location for scaffolded files, ' +
			'and the name of the WordPress plugin. The rest of the configuration is set to all default values.'
	)
	.version( version )
	.arguments( '[slug]' )
	.option(
		'-t, --template <name>',
		'template type name',
		'wds'
	)
	.action( async ( slug, { template } ) => {
		await checkSystemRequirements( engines );
		try {
			const defaultValues = getDefaultValues( template );
			if ( slug ) {
				// Make sure that the Block name argument follows Namespace/BlockName
				const blockNameArr = slug.split( '/' );
				if ( 2 !== blockNameArr.length || blockNameArr.filter( val => val.trim().length === 0 ).length > 0 ) {
					log.error( 'Block name should follow the convention Namespace/BlockName' );
					process.exit( 1 );
				}

				const answers = {
					...defaultValues,
					author: blockNameArr[0],
					blockName: blockNameArr[1],
					namespace: blockNameArr[0],
					slug: kebabCase( blockNameArr[1] ),
					title: `${ blockNameArr[0] } ${ startCase( blockNameArr[1] ) }`,
				};
				await scaffold( template, answers );
			} else {
				const answers = await inquirer.prompt( getPrompts( template ) );
				await scaffold( template, {
					...defaultValues,
					...answers,
				} );
			}
		} catch ( error ) {
			if ( error instanceof CLIError ) {
				log.error( error.message );
				process.exit( 1 );
			} else {
				throw error;
			}
		}
	} )
	.on( '--help', function() {
		log.info( '' );
		log.info( 'Examples:' );
		log.info( `  $ ${ commandName }` );
		log.info( `  $ ${ commandName } todo-list` );
	} )
	.parse( process.argv );
