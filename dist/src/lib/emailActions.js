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
exports.sendSignupEmail = sendSignupEmail;
exports.sendInvitationToOnboard = sendInvitationToOnboard;
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.sendTwoFactorCodeEmail = sendTwoFactorCodeEmail;
exports.sendLoginLink = sendLoginLink;
exports.sendOnboardingReminderEmail = sendOnboardingReminderEmail;
exports.sendOnboardingCompletionEmail = sendOnboardingCompletionEmail;
exports.sendOnboardingHospitalityWorkerEmail = sendOnboardingHospitalityWorkerEmail;
exports.sendBulkOnboardingCompletionEmails = sendBulkOnboardingCompletionEmails;
exports.sendAgreementEmail = sendAgreementEmail;
// main.ts
const signupEmail_1 = __importDefault(require("../emails/signupEmail"));
const resetPasswordEmail_1 = __importDefault(require("../emails/resetPasswordEmail"));
const twoFactorEmail_1 = __importDefault(require("../emails/twoFactorEmail"));
const loginLinkEmail_1 = __importDefault(require("../emails/loginLinkEmail"));
const verificationEmail_1 = __importDefault(require("../emails/verificationEmail"));
const invitationToOnboardEmail_1 = __importDefault(require("../emails/invitationToOnboardEmail"));
const onboardingReminderEmail_1 = __importDefault(require("../emails/onboardingReminderEmail"));
const onboardingCompletionEmail_1 = __importDefault(require("../emails/onboardingCompletionEmail"));
const onboardingHospitalityWorkerEmail_1 = __importDefault(require("../emails/onboardingHospitalityWorkerEmail"));
const bulkEmailTemplate_1 = require("../emails/bulkEmailTemplate");
const fs_1 = __importDefault(require("fs"));
const agreementEmail_1 = __importDefault(require("../emails/agreementEmail")); // Import the email template function
const email_1 = require("./email");
// Function to send signup email
function sendSignupEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = "Welcome to Our App!";
        const html = (0, signupEmail_1.default)(user);
        yield (0, email_1.sendEmail)(user.email, subject, html);
    });
}
// Function to send verification email
function sendInvitationToOnboard(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = "Invitation to Onboard";
        const html = (0, invitationToOnboardEmail_1.default)(user);
        yield (0, email_1.sendEmail)(user.email, subject, html);
    });
}
// Function to send verification email
function sendVerificationEmail(user, verificationToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = "Verify Your Email Address";
        const html = (0, verificationEmail_1.default)(user, verificationToken);
        yield (0, email_1.sendEmail)(user.email, subject, html);
    });
}
// Function to send password reset email
function sendResetPasswordEmail(user, resetToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = "Password Reset Request";
        const html = (0, resetPasswordEmail_1.default)(user, resetToken);
        yield (0, email_1.sendEmail)(user.email, subject, html);
    });
}
// Function to send two-factor verification email
// { email: user.email, firstName: user.firstName }, twoFactorToken
function sendTwoFactorCodeEmail(user, resetToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = "Your Two-Factor Authentication Code";
        const html = (0, twoFactorEmail_1.default)(user, resetToken);
        yield (0, email_1.sendEmail)(user.email, subject, html);
    });
}
// sendLoginLink({ email: user.email, firstName: user.firstName, verificationLink });
function sendLoginLink(user, twoFactorToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = "Your Login Link";
        const html = (0, loginLinkEmail_1.default)(user, twoFactorToken);
        yield (0, email_1.sendEmail)(user.email, subject, html);
    });
}
// Function to send onboarding reminder email
function sendOnboardingReminderEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = 'Complete Your Onboarding with Copora';
        const html = (0, onboardingReminderEmail_1.default)(user); // Generate the email HTML
        yield (0, email_1.sendEmail)(user.email, subject, html); // Send the email
    });
}
function sendOnboardingCompletionEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = 'Onboarding Completed';
        const html = (0, onboardingCompletionEmail_1.default)(user); // Generate the email HTML
        yield (0, email_1.sendEmail)(user.email, subject, html); // Send the email
    });
}
function sendOnboardingHospitalityWorkerEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = 'Welcome ';
        const html = (0, onboardingHospitalityWorkerEmail_1.default)(user); // Generate the email HTML
        yield (0, email_1.sendEmail)(user.email, subject, html); // Send the email
    });
}
function sendBulkOnboardingCompletionEmails(users, customSubject, customContent) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const user of users) {
            const html = (0, bulkEmailTemplate_1.bulkEmailTemplate)(user, customContent); // Generate the email content using the custom message
            yield (0, email_1.sendEmail)(user.email, customSubject, html); // Send the email to each user with the custom subject
        }
    });
}
function sendAgreementEmail(user, pdfPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = 'Your Employment Agreement';
        const html = (0, agreementEmail_1.default)(user); // Generate the email HTML
        const attachments = [
            {
                filename: 'agreement.pdf',
                content: fs_1.default.createReadStream(pdfPath),
            },
        ];
        yield (0, email_1.sendEmail)(user.email, subject, html, attachments);
    });
}
