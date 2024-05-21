class HelperService {
  static wrapperController(ClassCtrl) {
    const methodsDisable = ['constructor'];
    const methods = Object.getOwnPropertyNames(ClassCtrl.prototype);
    // console.log(methods);
    const ctrl = new ClassCtrl();
    const actions = {};
    methods.forEach((item) => {
      if (!methodsDisable.includes(item)) {
        actions[item] = (req, res, next) => {
          return ctrl[item](req, res, next);
        };
      }
    });
    return actions;
  }
}

module.exports = HelperService;
