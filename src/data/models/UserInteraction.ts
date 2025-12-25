import { Model } from '@nozbe/watermelondb';
import { text, date } from '@nozbe/watermelondb/decorators';

export default class UserInteraction extends Model {
    static table = 'user_interactions';

    @text('interaction_id') interactionId!: string;
    @text('user_id') userId!: string;
    @text('song_id') songId!: string;
    @text('action_type') actionType!: string;
    @text('session_id') sessionId?: string;

    @date('created_at') createdAt!: Date;
}
