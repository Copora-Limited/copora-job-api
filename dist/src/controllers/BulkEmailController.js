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
const UserService_1 = require("../services/UserService");
const emailActions_1 = require("../lib/emailActions"); // Create this utility for sending bulk emails
// const userService = new UserService();
class BulkEmailController {
    constructor() {
        this.sendBulkEmail = this.sendBulkEmail.bind(this);
    }
    /**
     * Sends bulk emails to users based on filters like onboardingStatus and state.
     */
    sendBulkEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { onboardingStatus, state, customSubject, customContent } = req.body;
                // Validate the required fields
                if (!onboardingStatus) {
                    return res.status(400).json({ message: 'Onboarding status is required' });
                }
                if (!customSubject || !customContent) {
                    return res.status(400).json({ message: 'Subject and content are required for bulk email.' });
                }
                // Build the query to fetch users based on the provided filters
                let query = UserService_1.userRepository.createQueryBuilder('user');
                // Apply filters dynamically
                if (onboardingStatus) {
                    query = query.andWhere('user.onboardingStatus = :onboardingStatus', { onboardingStatus });
                }
                if (state) {
                    query = query.andWhere('user.state = :state', { state });
                }
                // Execute the query to get the matching users
                const users = yield query.getMany();
                if (users.length === 0) {
                    return res.status(404).json({ message: 'No users found with the specified criteria.' });
                }
                // Prepare the list of emails and user names
                const emails = users.map(user => ({
                    firstName: user.firstName,
                    email: user.email,
                }));
                // Send bulk email
                yield (0, emailActions_1.sendBulkOnboardingCompletionEmails)(emails, customSubject, customContent);
                return res.status(200).json({
                    message: 'Bulk email sent successfully.',
                    recipients: emails,
                });
            }
            catch (error) {
                console.error('Error sending bulk email:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
}
exports.default = new BulkEmailController();
