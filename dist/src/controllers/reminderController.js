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
const emailActions_1 = require("../lib/emailActions");
// Initialize UserService
const userService = new UserService_1.UserService();
// Define the batch size (number of emails to send per batch)
const BATCH_SIZE = 50;
class Reminders {
    sendOnboardingReminder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Query users with onboardingStep less than 5 and role is applicant
                const users = yield userService.findUsersWithIncompleteOnboarding();
                if (users.length > 0) {
                    console.log(`Found ${users.length} users with incomplete onboarding`);
                    // Split the users into batches
                    for (let i = 0; i < users.length; i += BATCH_SIZE) {
                        const batch = users.slice(i, i + BATCH_SIZE);
                        console.log(`Processing batch ${i / BATCH_SIZE + 1}`);
                        // Send emails for the current batch
                        yield Promise.all(batch.map((user) => __awaiter(this, void 0, void 0, function* () {
                            const emailData = {
                                firstName: user.firstName,
                                email: user.email,
                            };
                            yield (0, emailActions_1.sendOnboardingReminderEmail)(emailData);
                        })));
                        console.log(`Batch ${i / BATCH_SIZE + 1} processed successfully.`);
                    }
                    console.log('All reminder emails sent successfully.');
                    return res.status(200).json({
                        message: 'All reminder emails sent successfully.',
                        count: users.length
                    });
                }
                else {
                    console.log('No users found with incomplete onboarding.');
                    return res.status(404).json({
                        message: 'No users found with incomplete onboarding.'
                    });
                }
            }
            catch (error) {
                console.error('Error running the onboarding reminder script:', error);
                return res.status(500).json({
                    message: 'Internal server error.',
                    error: error.message
                });
            }
        });
    }
}
exports.default = new Reminders();
