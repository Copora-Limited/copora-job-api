// main.ts
import signupEmail from "../emails/signupEmail";
import resetPasswordEmail from "../emails/resetPasswordEmail";
import twoFactorEmail from "../emails/twoFactorEmail";
import loginLinkEmail from "../emails/loginLinkEmail";
import verificationEmail from "../emails/verificationEmail";
import invitationToOnboardEmail from '../emails/invitationToOnboardEmail';
import onboardingReminderEmail from '../emails/onboardingReminderEmail';
import onboardingCompletionEmail from '../emails/onboardingCompletionEmail';
import onboardingHospitalityWorkerEmail from '../emails/onboardingHospitalityWorkerEmail';
import { bulkEmailTemplate } from '../emails/bulkEmailTemplate';
import fs from 'fs';
import agreementEmail from '../emails/agreementEmail';  // Import the email template function

import { sendEmail } from "./email";

// Function to send signup email
export async function sendSignupEmail(user: { firstName?: string; email: string; }) {
    const subject = "Welcome to Our App!";
    const html = signupEmail(user);
    await sendEmail(user.email, subject, html);
}

// Function to send verification email
export async function sendInvitationToOnboard(user: { firstName?: string; email: string; loginLink: string; temporaryPassword: string; }) {
    const subject = "Invitation to Onboard";
    const html = invitationToOnboardEmail(user);
    await sendEmail(user.email, subject, html);
}

// Function to send verification email
export async function sendVerificationEmail(user: { firstName?: string; email: string; temporaryPassword: string; }, verificationToken: string,) {
    const subject = "Verify Your Email Address";
    const html = verificationEmail(user, verificationToken);
    await sendEmail(user.email, subject, html);
}

// Function to send password reset email

export async function sendResetPasswordEmail(user: { email: string; firstName: string; }, resetToken: string) {
    const subject = "Password Reset Request";
    const html = resetPasswordEmail(user, resetToken);
    await sendEmail(user.email, subject, html);
}

// Function to send two-factor verification email
// { email: user.email, firstName: user.firstName }, twoFactorToken
export async function sendTwoFactorCodeEmail(user: { firstName?: string; email: string; }, resetToken: any) {
    const subject = "Your Two-Factor Authentication Code";
    const html = twoFactorEmail(user, resetToken);
    await sendEmail(user.email, subject, html);
}
// sendLoginLink({ email: user.email, firstName: user.firstName, verificationLink });
export async function sendLoginLink(user: { firstName?: string; email: string; }, twoFactorToken: any) {
    const subject = "Your Login Link";
    const html = loginLinkEmail(user, twoFactorToken);
    await sendEmail(user.email, subject, html);
}

// Function to send onboarding reminder email
export async function sendOnboardingReminderEmail(user: { firstName: string; email: string }) {
    const subject = 'Complete Your Onboarding with Copora';
    const html = onboardingReminderEmail(user);  // Generate the email HTML
    await sendEmail(user.email, subject, html);  // Send the email
}

export async function sendOnboardingCompletionEmail(user: { firstName: string; email: string }) {
    const subject = 'Onboarding Completed';
    const html = onboardingCompletionEmail(user);  // Generate the email HTML
    await sendEmail(user.email, subject, html);  // Send the email
}

export async function sendOnboardingHospitalityWorkerEmail(user: { firstName: string; email: string }) {
    const subject = 'Welcome ';
    const html = onboardingHospitalityWorkerEmail(user);  // Generate the email HTML
    await sendEmail(user.email, subject, html);  // Send the email
}


export async function sendBulkOnboardingCompletionEmails(
    users: { firstName: string; email: string }[],
    customSubject: string,
    customContent: string
  ): Promise<void> {
    for (const user of users) {
      const html = bulkEmailTemplate(user, customContent); // Generate the email content using the custom message
      await sendEmail(user.email, customSubject, html);    // Send the email to each user with the custom subject
    }
  }


  export async function sendAgreementEmail(user: { firstName: string; email: string }, pdfPath: string) {
    const subject = 'Your Employment Agreement';
    const html = agreementEmail(user);  // Generate the email HTML
    const attachments = [
      {
        filename: 'agreement.pdf',
        content: fs.createReadStream(pdfPath),
      },
    ];
    await sendEmail(user.email, subject, html, attachments); 
  }
  




