import { Model } from '@nozbe/watermelondb';
import { field, text, date, json } from '@nozbe/watermelondb/decorators';

export interface FileSize {
    quality: string;
    size: number;
}

const sanitizeFileSizes = (raw: any): FileSize[] => {
    return Array.isArray(raw) ? raw : [];
}

export default class Song extends Model {
    static table = 'songs';

    @text('song_id') songId!: string;
    @text('title') title!: string;
    @text('artist') artist!: string;
    @text('album') album?: string;
    @text('album_art_url') albumArtUrl?: string;
    @field('duration_ms') durationMs!: number;
    @text('r2_key') r2Key!: string;

    @json('file_sizes_json', sanitizeFileSizes) fileSizes!: FileSize[];

    @field('play_count') playCount!: number;
    @field('popularity_score') popularityScore!: number;
    @field('is_favorite') isFavorite?: boolean;
    @field('is_popular') isPopular?: boolean;

    @date('created_at') createdAt!: Date;
    @date('updated_at') updatedAt?: Date;
}
