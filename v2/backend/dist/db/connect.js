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
// import { MongoClient } from 'mongodb'
// import { DB_CONN_STRING } from '../config/constants'
const MongoClient = require('mongodb').MongoClient;
// const DB_CONN_STRING = require('../config/constants').DB_CONN_STRING
// const url = DB_CONN_STRING ?? ''
const url = `mongodb+srv://codyuhi:1ZVryylrv6s7ox2hS9%5E%23fT7a3*WJh@cluster0.prt9q.mongodb.net/blog?retryWrites=true&w=majority`;
const client = new MongoClient(url);
console.log(encodeURIComponent('1ZVryylrv6s7ox2hS9^#fT7a3*WJh'));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log('Connected to server');
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield client.close();
        }
    });
}
run();
//# sourceMappingURL=connect.js.map