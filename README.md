# Harbor Bronze for VS Code

A cool, desaturated harbor palette with teal structure and warm bronze accents.

## Themes

- Harbor Bronze Dark
- Harbor Bronze Light

## Install locally

Build the extension and install the generated VSIX:

```sh
npm install
npm run package
```

In VS Code, open the Extensions view, choose **Install from VSIX…**, and select the generated file. Then run **Preferences: Color Theme** and choose either Harbor Bronze variant.

## Development

Open this repository in VS Code and press `F5` to launch an Extension Development Host. Theme file changes are reflected in the development window.

Validate the manifest and theme colors with:

```sh
npm run check
```

## Publishing checklist

Before publishing to the VS Code Marketplace:

1. Create a Marketplace publisher and replace `local` in `package.json` with its ID.
2. Add the GitHub `repository`, `homepage`, and `bugs` URLs to `package.json`.
3. Add/Update preview screenshots to README.
4. Run `npm run package` and test the resulting VSIX.
