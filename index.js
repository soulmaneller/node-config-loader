const fs            = require( 'fs-extra' );
const path          = require( 'path' );
const _             = require( 'lodash' );
const moment        = require( 'moment' );

module.exports = ( DEFAULT_CONFIG = {}, options = {} ) => {
    const env               = _.get.bind( null, process.env );
    const CONFIG_DIR        = options.CONFIG_DIR || env( 'CONFIG_DIR', 'config' );
    const CONFIG_FILE       = options.CONFIG_FILE || env( 'CONFIG_FILE', 'config.json' );
    const CONFIG_OVERWRITE  = ( options.CONFIG_OVERWRITE || env( 'CONFIG_OVERWRITE', true )) !== false;
    const configPath        = path.join( CONFIG_DIR, CONFIG_FILE );

    let config = _.cloneDeep( DEFAULT_CONFIG );
    if( fs.existsSync( configPath )) {
        try {
            config = fs.readJSONSync( configPath );
        } catch (e) {
            if( CONFIG_OVERWRITE ) {
                let backupFile = CONFIG_FILE + `_${ moment().format( 'YYYYMMDD_HHmmss' ) }.bak`;
                let backupConfigPath = path.join( CONFIG_DIR, backupFile );
                fs.copySync( configPath, backupConfigPath );
                console.warn( `Please check configuration file (${ configPath })` );
            }
            config = {};
        }

        config = _.merge( DEFAULT_CONFIG, config );
    }

    if( CONFIG_OVERWRITE ) {
        fs.outputJsonSync( configPath, config, { spaces: 4 });
    }

    return _.get.bind( this, config );
}
