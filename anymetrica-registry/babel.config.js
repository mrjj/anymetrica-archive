module.exports = {
  presets: ['env'],
  plugins: [
    'transform-flow-comments',
    'transform-object-rest-spread',
    'transform-async-to-generator',
    'transform-class-properties',
    [
      'transform-runtime',
      {
        polyfill: false,
        regenerator: true,
      },
    ],
  ],
};
