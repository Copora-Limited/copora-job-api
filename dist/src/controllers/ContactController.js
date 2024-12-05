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
const emailActions_1 = require("../lib/emailActions"); // Email template function
class ContactController {
    /**
     * Handles sending an email based on contact form submission
     * @param req - Express request object
     * @param res - Express response object
     */
    sendContactFormEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, phone, subject, message, attachmentPath } = req.body;
                // Validate required fields
                if (!firstName || !email || !subject || !message) {
                    return res.status(400).json({
                        message: 'Missing required fields: firstName, email, subject, and message are mandatory.',
                    });
                }
                // Prepare email data
                const user = { firstName, email };
                const formDetails = { subject, message, phone };
                // Call the email service to send the email
                yield (0, emailActions_1.sendContactFormSubmissionEmail)(user, formDetails, attachmentPath);
                console.log(`Contact form email sent successfully to ${email}.`);
                return res.status(200).json({
                    message: 'Your message has been received. We will get back to you shortly.',
                });
            }
            catch (error) {
                console.error('Error sending contact form email:', error);
                return res.status(500).json({
                    message: 'Failed to send your message. Please try again later.',
                    error: error.message,
                });
            }
        });
    }
    handleInquiry(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { firstName, lastName, email, phone, subject, message } = req.body;
                // Validate required fields
                if (!firstName || !email || !subject || !message) {
                    return res.status(400).json({
                        message: 'Missing required fields: firstName, email, subject, and message are mandatory.',
                    });
                }
                // Prepare inquiry details
                const user = { firstName, lastName, email };
                const formDetails = { subject, message, phone };
                // Check if there's an attachment in the request
                const attachmentPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // `req.file` is set by middleware like multer
                // Send email to the admin
                yield (0, emailActions_1.sendAdminInquiryEmail)(user, formDetails, attachmentPath);
                // Send confirmation email to the user (optional)
                yield (0, emailActions_1.sendContactFormSubmissionEmail)(user, formDetails, attachmentPath);
                console.log(`Admin notified about inquiry from ${email}`);
                return res.status(200).json({
                    message: 'Your inquiry has been submitted successfully. We will get back to you soon.',
                });
            }
            catch (error) {
                console.error('Error handling customer inquiry:', error);
                return res.status(500).json({
                    message: 'Failed to process your inquiry. Please try again later.',
                    error: error.message,
                });
            }
        });
    }
}
exports.default = new ContactController();
