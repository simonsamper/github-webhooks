import { Request, Response } from 'express';
import { DiscordService } from '../services/discord.services';
import { GithubService } from '../services/github.services';


export class GitHubController {

    constructor(
        private readonly githubService: GithubService = new GithubService(),
        private readonly discordService: DiscordService = new DiscordService(),
    ) { }



    webhookHandler = ( req: Request, res: Response ) => {

        const githubEvent = req.header( 'x-github-event' ) ?? 'unknown';
        const payload = req.body;
        let message: string = `Unknown event ${ githubEvent }`;


        switch ( githubEvent ) {

            case 'star':
                message = this.githubService.onStar( payload );
                break;

            case 'issues':
                message = this.githubService.onIssue( payload );
                break;

            default:
                console.log( `Unknown event ${ githubEvent }` );
        }

        this.discordService.notify( message )
            .then( () => res.status( 202 ).send( 'Accepted' ) )
            .catch( () => res.status( 500 ).json( { error: 'internal server error' } ) );
    };
}

