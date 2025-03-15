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
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUsers();
            res.json(users);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const user = yield this.userService.getUserById(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const newUser = yield this.userService.createUser(userData);
            res.status(201).json(newUser);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const userData = req.body;
            const updatedUser = yield this.userService.updateUser(id, userData);
            if (updatedUser) {
                res.json(updatedUser);
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            yield this.userService.deleteUser(id);
            res.status(204).send();
        });
    }
}
exports.UserController = UserController;
