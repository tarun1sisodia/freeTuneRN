import { Model } from '@nozbe/watermelondb';
import { text, field } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
    static table = 'users';

    @text('user_id') userId!: string;
    @text('email') email!: string;
    @text('username') username?: string;
    @text('full_name') fullName?: string;
    @text('profile_image_url') profileImageUrl?: string;
    @field('email_verified') emailVerified?: boolean;
}
