import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { sendOnboardingReminderEmail } from '../lib/emailActions';

// Initialize UserService
const userService = new UserService();

class Reminders {

    async sendOnboardingReminder(req: Request, res: Response) {
        try {
            // Query users with onboardingStep less than 5 and role is applicant
            const users = await userService.findUsersWithIncompleteOnboarding();
    
            if (users.length > 0) {
                console.log(`Found ${users.length} users with incomplete onboarding`);
    
                // Send reminder emails
                for (const user of users) {
                    const emailData = {
                        firstName: user.firstName,
                        email: user.email,
                    };
                    await sendOnboardingReminderEmail(emailData);
                }

                console.log('Reminder emails sent successfully.');
                return res.status(200).json({ 
                    message: 'Reminder emails sent successfully.', 
                    count: users.length 
                });
            } else {
                console.log('No users found with incomplete onboarding.');
                return res.status(404).json({ 
                    message: 'No users found with incomplete onboarding.' 
                });
            }
        } catch (error) {
            console.error('Error running the onboarding reminder script:', error);
            return res.status(500).json({ 
                message: 'Internal server error.',
                error: error.message 
            });
        }
    }
}

export default new Reminders();
