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
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
const remotessh = __importStar(require("./remotessh"));
const install = __importStar(require("./install"));
const utils = __importStar(require("./utils"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = context.getInputs();
        //const inputs:context.Inputs = context.getInputsForTest();
        //如果参数输入有问题，终止操作
        if (!utils.checkInputs(inputs)) {
            return;
        }
        //如果发现命令中有高危操作，停止操作
        const commandsDanger = remotessh.checkCommandsDanger(inputs.commands);
        if (commandsDanger) {
            core.info('dangerCommand found, terminate process');
            return;
        }
        //检查当前环境是否具备远程命令操作条件
        const installSuccess = install.installSshPassOnSystem();
        if (!installSuccess) {
            core.info("can not install sshpass on system");
            return;
        }
        //执行远程操作
        remotessh.execRemoteSSHCommands(inputs);
    });
}
exports.run = run;
run();
