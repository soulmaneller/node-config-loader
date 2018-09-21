[![npm](https://img.shields.io/npm/v/@soulmaneller-dev/config-loader.svg)](https://www.npmjs.com/package/@soulmaneller-dev/config-loader)

This module will helps you for generating and loading your configuration file.
It will merge default configuration and configuration from file.
It uses method `get` from [lodash](https://lodash.com/docs/4.17.10#get) for getting config data

# How to use

## Installation

*[Required]* nodejs version `8` or later

    npm i @soulmaneller-dev/config-loader

## Usage

    configLoader( default_config [, options ] );

**default_config** *(Object)*

Default configuration object

**options** *(Object)*

- CONFIG_DIR: *(String)* Path to store config file *[ Default: `'config'` ]*
- CONFIG_FILE: *(String)* Name of config file *[ Default: `'config.json'` ]*
- CONFIG_OVERWRITE: *(Boolean)* This will allow to overwirte default config to config file if config data is broken *[ Default: `true` ]*

The options also able to be set by `environment variable`

```Javascript
const configLoader = require( '@soulmaneller-dev/config-loader' );
const DEFAULT_CONFIG = {
    foo: 'bar',
    address: {
        street: 'road'
    }
};

const config = configLoader( DEFAULT_CONFIG );

config( 'foo' );
// -> 'bar'

config( 'address.street' );
// -> 'road'

config( 'name' );
// -> undefined

config( 'name', 'John' );
// -> 'John'
```
