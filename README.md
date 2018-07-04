# 1545 - 2018 Stream Graphics

This repository contains all of the stream graphics used for the 1545 in July of 2018. For more information about the event, see https://fifteenfortyfive.org.


# Requirements

Sadly, since most of this package is written with javascript running in the browser, the only viable build systems are based on Node. So, you'll need to have Node 8 or higher installed. This package also uses Yarn because it's fast, so run `npm install -g yarn` as well.


# Usage

Once the repository is cloned, run `yarn install` to bring in all of the depdencies. This package uses Parcel as a bundler, and is primarily written in TypeScript, both of which will be installed automatically by Yarn.

For development, run `parcel serve index.html` in the root of this directory to bring up a hot-reloading development server at `localhost:1234`. Any changes made after the server is started should be picked up and reflected in the browser immediately. Manual refreshes will likely still be necessary for testing animations and root-level changes.


# Licensing

This software is provided under the MIT License, available at `./LICENSE`. Anyone is free to use this software for their own productions, with the hope that users will make their own improvements as needed.

© 2018, fifteenfortyfive.org


# Credits

Developed by Jon Egeland: [GitHub](https://github.com/faultyserver), [Twitter](https://twitter.com/amfaulty).
