import { envs } from '../../config';

const discordUrl = envs.DISCORD_WEBHOOK_URL;

export class DiscordService {

    private readonly discordWebhookUrl = discordUrl;

    constructor() { }

    async notify( message: string ) {

        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: { url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjV6Z2pmbnM2Zjk1ZGNzNWcycmRmM3NqeWoyeW9vejk0MnlpbDAxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif' }
            //     }
            // ]
        };

        const response = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( body ),
        } );

        if ( !response.ok ) {
            console.log( 'Error sending message to Discord' );
            throw new Error( 'Failed to send message to Discord' );
        }

        console.log( 'Message sent to Discord successfully' );
        return true;

    }
}