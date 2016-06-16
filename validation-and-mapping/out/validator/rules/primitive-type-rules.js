/// <reference path="../validator.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rules_base_1 = require("./rules-base");
var StringRules = (function (_super) {
    __extends(StringRules, _super);
    function StringRules() {
        _super.apply(this, arguments);
    }
    StringRules.prototype.notEmpty = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Value can not be empty"; }
        return this.withRule(StringRules.notEmtpyRule(errorMessage));
    };
    StringRules.prototype.must = function (predicate, errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Value is invalid"; }
        return this.withRule(rules_base_1.ChainableRuleRunner.mustRule(predicate, errorMessage));
    };
    StringRules.isStringRule = function (errorMessage, convert) {
        return function (value, reportError) {
            if (value === null || value === undefined)
                return value;
            if (typeof value !== "string" && !convert)
                reportError(errorMessage);
            return value.toString();
        };
    };
    StringRules.notEmtpyRule = function (errorMessage) {
        return function (value, reportError) {
            if (!value || !value.trim())
                reportError(errorMessage);
            return value;
        };
    };
    return StringRules;
}(rules_base_1.ChainableRuleRunner));
var NumberRules = (function (_super) {
    __extends(NumberRules, _super);
    function NumberRules() {
        _super.apply(this, arguments);
    }
    NumberRules.prototype.must = function (predicate, errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Value is invalid"; }
        return this.withRule(rules_base_1.ChainableRuleRunner.mustRule(predicate, errorMessage));
    };
    NumberRules.isNumberRule = function (errorMessage) {
        return function (value, reportError) {
            if (value === null || value === undefined)
                return value;
            if (typeof value !== "number") {
                var result = parseFloat("" + value);
                if (isNaN(result))
                    reportError(errorMessage);
                return result;
            }
            return value;
        };
    };
    return NumberRules;
}(rules_base_1.ChainableRuleRunner));
function str(errorMessage, convert) {
    if (errorMessage === void 0) { errorMessage = "Value is not a string."; }
    if (convert === void 0) { convert = true; }
    return new StringRules().withRule(StringRules.isStringRule(errorMessage, convert));
}
exports.str = str;
function num(errorMessage) {
    if (errorMessage === void 0) { errorMessage = "Value is not a valid number"; }
    return new NumberRules().withRule(NumberRules.isNumberRule(errorMessage));
}
exports.num = num;
//# sourceMappingURL=primitive-type-rules.js.map