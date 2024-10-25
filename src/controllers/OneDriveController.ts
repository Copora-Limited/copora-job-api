import { Request, Response } from 'express';
import fs from 'fs';
import mime from 'mime-types'; // Use mime-types instead of mime
import request from 'request';

const onedriveClientID = process.env.ONEDRIVE_CLIENT_ID;
const onedriveClientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
const onedriveRefreshToken = process.env.ONEDRIVE_REFRESH_TOKEN;

export class OneDriveController {
    static async uploadFileToOneDrive(req: Request, res: Response): Promise<void> {
        const { localFilePath, onedriveFolder, onedriveFilename } = req.body;

        if (!localFilePath || !onedriveFolder || !onedriveFilename) {
            res.status(400).json({ message: "Missing required parameters" });
            return;
        }

        request.post({
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
            fs.readFile(localFilePath, (readError, fileData) => {
                if (readError) {
                    console.error('Error reading file:', readError);
                    res.status(500).json({ message: 'Error reading file' });
                    return;
                }

                request.put({
                    url: `https://graph.microsoft.com/v1.0/drive/root:/${onedriveFolder}/${onedriveFilename}:/content`,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': mime.lookup(localFilePath) || 'application/octet-stream', // Updated MIME type
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
    }
}
