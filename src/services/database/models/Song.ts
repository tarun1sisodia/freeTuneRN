import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Song extends Model {
    static table = 'songs'

    @field('title') title!: string
    @field('artist') artist!: string
    @field('remote_url') remoteUrl!: string
    @field('local_path') localPath!: string
    @field('thumbnail') thumbnail!: string
    @field('duration') duration!: number
    @readonly @date('created_at') createdAt!: Date
}
