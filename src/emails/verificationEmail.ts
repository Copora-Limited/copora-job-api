import { emailHeader } from './emailHeader';
import { emailFooter } from './emailFooter';
import { FRONTEND_URL } from '../config';
// emails/verificationEmail.ts
export default function verificationEmail(user: { firstName?: string; email: string; temporaryPassword: string; }, verificationToken: string): string {

  const verificationUrl = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;

  return `
        ${emailHeader('others')}
        <div>
          <h2 style="text-align: center;">Verify and sign in</h2>
          <p>Hello ${user.firstName || 'User'},</p>
          <p>Verify yourself below to sign in to your ${process.env.APP_COMPANY} account for <strong>${user.email}</strong>.</p>
          <p>Your password is: <strong>${user.temporaryPassword}</strong></p>
          <p>The link can only be used once and expires in 10 minutes if you don’t use it.</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #211c1c; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify me</a>
          <h3>How does this work?</h3>
          <p>This secure, one-time URL lets you confirm your identity without a password. If you already have a password, this won’t replace it, so you can still sign in with it later.</p>
          <p>If you didn't request this verification link, you can safely ignore this email.</p>
          <p>Don’t see a button above? <a href="${verificationUrl}" style="color: #211c1c; text-decoration: none;">Verify yourself here</a></p>
        </div>
        ${emailFooter()}
  `;
}

