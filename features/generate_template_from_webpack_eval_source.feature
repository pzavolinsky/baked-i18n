Feature: bake-i18n generate translation template from webpack eval source

  Scenario: Generate a TODO translation template from a webpack eval source
    Given a file source.js with
    """

/***/ "./src/span.tsx":
/*!***************************************!*\
  !*** ./src/span.tsx ***!
  \***************************************/
/*! exports provided: QrCodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__("./src/widgets/spanB.tsx");__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QrCodeComponent\", function() { return QrCodeComponent; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar QrCodeComponent = function () { return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, _(\"The Empire \\\"Strikes\\\" Back\")); };\r\n\n\n//# sourceURL=webpack:///./src/common/widgets/qrcode.tsx?");

/***/ }),
    """
    And a file es-AR.json with
    """
    {}
    """
    When running
    """
    bake-i18n --fix-all source.js es-AR.json
    """
    Then the file es-AR.json is
    """
    {
      "The Empire \"Strikes\" Back": "@@@@ TODO @@@@"
    }
    """
