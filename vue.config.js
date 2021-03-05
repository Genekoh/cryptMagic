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
        win: {
          target: "nsis-web",
          icon: "build/icon.ico",
        },
        mac: {
          category: "public.app-category.education",
          target: "dmg",
          icon: "build/icon.icns",
          darkModeSupport: false,
        },
      },
    },
  },
};
