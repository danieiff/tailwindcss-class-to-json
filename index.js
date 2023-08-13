"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tailwindcss_1 = __importDefault(require("tailwindcss"));
const postcss_1 = __importDefault(require("postcss"));
const css = __importStar(require("css"));
const fs = __importStar(require("node:fs"));
const tailwindcssPlugin = (0, tailwindcss_1.default)({
    content: ['noop'],
    safelist: [{ pattern: /./ }],
});
(0, postcss_1.default)(tailwindcssPlugin)
    .process('@tailwind base; @tailwind components; @tailwind utilities', {
    from: undefined,
})
    .then((result) => {
    var _a;
    const parsedCss = css.parse(result.css);
    const classMap = {};
    (_a = parsedCss.stylesheet) === null || _a === void 0 ? void 0 : _a.rules.forEach((rule) => {
        var _a;
        if (isCssRuleType(rule)) {
            (_a = rule.selectors) === null || _a === void 0 ? void 0 : _a.forEach((selector) => {
                var _a;
                if (!selector.startsWith('.'))
                    return;
                const properties = {};
                (_a = rule.declarations) === null || _a === void 0 ? void 0 : _a.forEach((declaration) => {
                    if (isCssDeclarationType(declaration) &&
                        declaration.property &&
                        declaration.value)
                        properties[declaration.property] = declaration.value;
                });
                classMap[selector.slice(1)] = properties;
            });
        }
    });
    fs.writeFileSync('tailwindcss-class-properties.json', JSON.stringify(classMap, null, 2));
})
    .catch(console.log);
function isCssRuleType(rule) {
    return rule.type === 'rule';
}
function isCssDeclarationType(declaration) {
    return declaration.type === 'declaration';
}
