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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneDriveController = void 0;
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types")); // Use mime-types instead of mime
const request_1 = __importDefault(require("request"));
const onedriveClientID = process.env.ONEDRIVE_CLIENT_ID;
const onedriveClientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
const onedriveRefreshToken = process.env.ONEDRIVE_REFRESH_TOKEN;
class OneDriveController {
    static uploadFileToOneDrive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { localFilePath, onedriveFolder, onedriveFilename } = req.body;
            if (!localFilePath || !onedriveFolder || !onedriveFilename) {
                res.status(400).json({ message: "Missing required parameters" });
                return;
            }
            request_1.default.post({
                url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                form: {
                    redirect_uri: 'http://localhost/dashboard',
                    client_id: onedriveClientID,
                    client_secret: onedriveClientSecret,
                    refresh_token: onedriveRefreshToken,
                    grant_type: 'refresh_token',
                },
            }, (error, response, body) => {
                if (error) {
                    console.error('Error getting access token:', error);
                    res.status(500).json({ message: 'Error getting access token' });
                    return;
                }
                const accessToken = JSON.parse(body).access_token;
                fs_1.default.readFile(localFilePath, (readError, fileData) => {
                    if (readError) {
                        console.error('Error reading file:', readError);
                        res.status(500).json({ message: 'Error reading file' });
                        return;
                    }
                    request_1.default.put({
                        url: `https://graph.microsoft.com/v1.0/drive/root:/${onedriveFolder}/${onedriveFilename}:/content`,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': mime_types_1.default.lookup(localFilePath) || 'application/octet-stream', // Updated MIME type
                        },
                        body: fileData,
                    }, (uploadError, uploadResponse, uploadBody) => {
                        if (uploadError) {
                            console.error('Error uploading file:', uploadError);
                            res.status(500).json({ message: 'Error uploading file' });
                            return;
                        }
                        res.status(200).json({ message: 'File uploaded successfully', data: JSON.parse(uploadBody) });
                    });
                });
            });
        });
    }
}
exports.OneDriveController = OneDriveController;
