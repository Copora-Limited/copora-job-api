import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { sendOnboardingReminderEmail } from '../lib/emailActions';

// Initialize UserService
const userService = new UserService();

// Define the batch size (number of emails to send per batch)
const BATCH_SIZE = 50;

class Reminders {

    async sendOnboardingReminder(req: Request, res: Response) {
        try {
            // Query users with onboardingStep less than 5 and role is applicant
            const users = await userService.findUsersWithIncompleteOnboarding();
    
            if (users.length > 0) {
                console.log(`Found ${users.length} users with incomplete onboarding`);

                // Split the users into batches
                for (let i = 0; i < users.length; i += BATCH_SIZE) {
                    const batch = users.slice(i, i + BATCH_SIZE);
                    console.log(`Processing batch ${i / BATCH_SIZE + 1}`);

                    // Send emails for the current batch
                    await Promise.all(batch.map(async (user) => {
                        const emailData = {
                            firstName: user.firstName,
                            email: user.email,
                        };
                        await sendOnboardingReminderEmail(emailData);
                    }));

                    console.log(`Batch ${i / BATCH_SIZE + 1} processed successfully.`);
                }

                console.log('All reminder emails sent successfully.');
                return res.status(200).json({ 
                    message: 'All reminder emails sent successfully.', 
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
