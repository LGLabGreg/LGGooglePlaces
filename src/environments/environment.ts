// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googlePlacesAPIKey: 'AIzaSyCkcYgoe49OqZ6jZKC3IEzBtZ8Th9SDsws',
  googlePlacesBaseUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  errorMessages: {
    generic: 'There was an error, please try again.'
  }
};
