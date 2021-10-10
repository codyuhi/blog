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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAdmin = void 0;
const CheckAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.token) {
        res.status(403);
        res.json({
            success: false,
            data: {
                message: 'Not logged in'
            }
        });
    }
    // TODO: search for user by token in DB. If not an admin, respond 403
    next();
});
exports.CheckAdmin = CheckAdmin;
exports.CheckAdmin;
//# sourceMappingURL=CheckAdmin.js.map