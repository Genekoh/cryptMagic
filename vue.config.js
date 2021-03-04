module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "cryptMagic",
        directories: {
          buildResources: "./src/assets",
        },
        fileAssociations: [
          {
            ext: "png",
            name: "PNG",
            icon: "icon",
          },
        ],
      },
    },
  },
};
