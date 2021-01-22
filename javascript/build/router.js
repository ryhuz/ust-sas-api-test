"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _RegisterController = _interopRequireDefault(require("./controllers/RegisterController"));

var _ReportsController = _interopRequireDefault(require("./controllers/ReportsController"));

var router = _express["default"].Router();

router.use('/', _HealthcheckController["default"]);
router.use('/register', _RegisterController["default"]);
router.use('/reports', _ReportsController["default"]);
var _default = router;
exports["default"] = _default;