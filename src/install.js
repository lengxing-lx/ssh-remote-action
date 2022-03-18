"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.installSshPassOnLinux = exports.installSshPassOnMacos = exports.installSshPassByPlatformAndArch = exports.checkSshpassInstall = exports.installSshPassOnSystem = void 0;
var core = require("@actions/core");
var io = require("@actions/io");
var cp = require("child_process");
var os = require("os");
/**
 * 检查系统上是否安装了sshpass,如果没有，会尝试进行安装，如果安装不成功，则提示安装失败，结束操作
 * @returns
 */
function installSshPassOnSystem() {
    return __awaiter(this, void 0, void 0, function () {
        var isInstalld, platform;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkSshpassInstall()];
                case 1:
                    isInstalld = _a.sent();
                    core.info("is install ".concat(isInstalld));
                    if (isInstalld) {
                        core.info('sshPass already installed and set to the path');
                        return [2 /*return*/, isInstalld];
                    }
                    else {
                        core.info('start install sshpass');
                        platform = os.platform();
                        installSshPassByPlatformAndArch(platform);
                        return [2 /*return*/, checkSshpassInstall()];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.installSshPassOnSystem = installSshPassOnSystem;
/**
 * 检查sshpass是否已经在系统上完成安装，并输出版本
 * @returns
 */
function checkSshpassInstall() {
    return __awaiter(this, void 0, void 0, function () {
        var sshPass, sshPassVersion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, io.which('sshpass')];
                case 1:
                    sshPass = _a.sent();
                    if (!sshPass) {
                        core.info('sshPass not installed or not set to the path');
                        return [2 /*return*/, false];
                    }
                    else {
                        core.info('sshPass already installed and set to the path');
                        sshPassVersion = (cp.execSync("".concat(sshPass, " -V")) || '').toString();
                        core.info(sshPassVersion);
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkSshpassInstall = checkSshpassInstall;
/**
 * 针对不同操作系统完成sshpass安装，可以细分为macos,linux-centos,linux-ubunto,windows等
 * @param platform
 * @param arch
 */
function installSshPassByPlatformAndArch(platform) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(platform === 'darwin')) return [3 /*break*/, 2];
                    return [4 /*yield*/, installSshPassOnMacos()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(platform === 'linux')) return [3 /*break*/, 4];
                    return [4 /*yield*/, installSshPassOnLinux()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.installSshPassByPlatformAndArch = installSshPassByPlatformAndArch;
function installSshPassOnMacos() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (cp.execSync("xcode-select --install && wget https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb && brew install sshpass.rb") || '').toString()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.installSshPassOnMacos = installSshPassOnMacos;
function installSshPassOnLinux() {
    return __awaiter(this, void 0, void 0, function () {
        var osRelease, installUbuntuResult, installCentosResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (cp.execSync("cat /etc/os-release") || '').toString()];
                case 1:
                    osRelease = _a.sent();
                    if (!(osRelease.indexOf('Ubuntu') > -1)) return [3 /*break*/, 3];
                    core.info('current system is Ubuntu,use apt-get to install sshpass');
                    return [4 /*yield*/, (cp.execSync("apt-get -y -q update && apt-get -y install -q sshpass") || '').toString()];
                case 2:
                    installUbuntuResult = _a.sent();
                    core.info(installUbuntuResult);
                    return [3 /*break*/, 5];
                case 3:
                    if (!(osRelease.indexOf('CentOS') > -1)) return [3 /*break*/, 5];
                    core.info('current system is Centos,use yum to install sshpass');
                    return [4 /*yield*/, (cp.execSync("yum -y install -q sshpass") || '').toString()];
                case 4:
                    installCentosResult = _a.sent();
                    core.info(installCentosResult);
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.installSshPassOnLinux = installSshPassOnLinux;
