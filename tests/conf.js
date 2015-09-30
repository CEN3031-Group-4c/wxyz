// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['maintest.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000
  }
};
