"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSshPassOnLinux = exports.installSshPassOnMacos = exports.installSshPassByPlatformAndArch = exports.checkSshpassInstall = exports.installSshPassOnSystem = void 0;
const core = __importStar(require("@actions/core"));
const io = __importStar(require("@actions/io"));
const cp = __importStar(require("child_process"));
const os = __importStar(require("os"));
/**
 * 检查系统上是否安装了sshpass,如果没有，会尝试进行安装，如果安装不成功，则提示安装失败，结束操作
 * @returns
 */
function installSshPassOnSystem() {
    return __awaiter(this, void 0, void 0, function* () {
        const isInstalld = yield checkSshpassInstall();
        core.info(`is install ${isInstalld}`);
        if (isInstalld) {
            core.info('sshPass already installed and set to the path');
            return isInstalld;
        }
        else {
            core.info('start install sshpass');
            let platform = os.platform();
            installSshPassByPlatformAndArch(platform);
            return checkSshpassInstall();
        }
    });
}
exports.installSshPassOnSystem = installSshPassOnSystem;
/**
 * 检查sshpass是否已经在系统上完成安装，并输出版本
 * @returns
 */
function checkSshpassInstall() {
    return __awaiter(this, void 0, void 0, function* () {
        let sshPass = yield io.which('sshpass');
        if (!sshPass) {
            core.info('sshPass not installed or not set to the path');
            return false;
        }
        else {
            core.info('sshPass already installed and set to the path');
            let sshPassVersion = (cp.execSync(`${sshPass} -V`) || '').toString();
            core.info(sshPassVersion);
            return true;
        }
    });
}
exports.checkSshpassInstall = checkSshpassInstall;
/**
 * 针对不同操作系统完成sshpass安装，可以细分为macos,linux-centos,linux-ubunto,windows等
 * @param platform
 * @param arch
 */
function installSshPassByPlatformAndArch(platform) {
    return __awaiter(this, void 0, void 0, function* () {
        if (platform === 'darwin') {
            yield installSshPassOnMacos();
        }
        if (platform === 'linux') {
            yield installSshPassOnLinux();
        }
    });
}
exports.installSshPassByPlatformAndArch = installSshPassByPlatformAndArch;
function installSshPassOnMacos() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (cp.execSync(`xcode-select --install && wget https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb && brew install sshpass.rb`) || '').toString();
    });
}
exports.installSshPassOnMacos = installSshPassOnMacos;
function installSshPassOnLinux() {
    return __awaiter(this, void 0, void 0, function* () {
        const osRelease = yield (cp.execSync(`cat /etc/os-release`) || '').toString();
        if (osRelease.indexOf('Ubuntu') > -1) {
            core.info('current system is Ubuntu,use apt-get to install sshpass');
            const installUbuntuResult = yield (cp.execSync(`apt-get -y -q update && apt-get -y install -q sshpass`) || '').toString();
            core.info(installUbuntuResult);
        }
        else if (osRelease.indexOf('CentOS') > -1) {
            core.info('current system is Centos,use yum to install sshpass');
            let installCentosResult = yield (cp.execSync(`yum -y install -q sshpass`) || '').toString();
            core.info(installCentosResult);
        }
    });
}
exports.installSshPassOnLinux = installSshPassOnLinux;
