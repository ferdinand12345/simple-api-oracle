/*
|--------------------------------------------------------------------------
| Global APP Init
|--------------------------------------------------------------------------
*/
	process.env.ORA_SDTZ = 'UTC';
	global._directory_base = __dirname;

/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
	// Node Modules
	const BodyParser = require( 'body-parser' );
	const Express = require( 'express' );
	const OracleDB = require( 'oracledb' );

	// Primary Variable
	const App = Express();
	const database_config = require( './database.js' );

/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
	// Parse request of content-type - application/x-www-form-urlencoded
	App.use( BodyParser.urlencoded( { extended: false } ) );

	// Parse request of content-type - application/json
	App.use( BodyParser.json() );

	// Server Running Message
	var Server = App.listen( 3000, () => {
		console.log( "Run on port 3000" )
	} );

	/*
	App.get( '/getdata', async function( req, res ) {
		let connection;
		try {

			let sql, binds, options, result;

			connection = await OracleDB.getConnection( database_config );
			sql = `
				SELECT 
					'''' || restan.oph AS OPH, 
					'''' || restan.bcc AS BCC,
					restan.tph_restant_day,
					restan.latitude, 
					restan.longitude, 
					SUM (jml_jjg) AS JML_JANJANG, 
					SUM (jml_brondolan) AS JML_BRONDOLAN, 
					SUM (kg_taksasi) AS KG_TAKSASI, 
					restan.tgl_report, 
					restan.werks, 
					est.est_name, 
					restan.afd_code, 
					restan.sub_block_name AS BLOCK_NAME
				FROM 
					tap_dw.tr_hv_restant_detail@proddw_link restan 
					LEFT JOIN tap_dw.tm_est@proddw_link est ON restan.werks = est.werks 
				WHERE 
					restan.tgl_report = TRUNC (SYSDATE - 1) 
					AND restan.latitude != '0' 
					AND restan.status_bcc = 'RESTAN' 
					AND restan.werks || restan.afd_code IN( '2121A', '2121B' )
				GROUP BY 
					restan.werks, 
					est.est_name, 
					restan.afd_code, 
					restan.sub_block_code, 
					restan.sub_block_name, 
					restan.tph_restant_day, 
					restan.oph, 
					restan.latitude, 
					restan.longitude, 
					restan.bcc, 
					restan.tgl_report
				ORDER BY
					restan.werks ASC,
					restan.afd_code ASC,
					restan.sub_block_name ASC
			`;
			binds = {};
			options = {
				outFormat: OracleDB.OUT_FORMAT_OBJECT
				// extendedMetaData: true,
				// fetchArraySize: 100
			};
			result = await connection.execute( sql, binds, options );
			// console.log( "Column metadata: ", result.metaData );
			// console.log( "Query results: ");
			// console.log( result.rows );
			return res.json( {
				message: "OK",
				data: result.rows
			} );

		} catch ( err ) {
			// console.error(err);
			return res.json( {
				message: "Error 1",
				data: []
			} );
		} finally {
			if ( connection ) {
				try {
					await connection.close();
				} catch ( err ) {
					// console.error( err );
					return res.json( {
						message: "Error 2",
						data: []
					} );
				}
			}
		}
	} );*/
