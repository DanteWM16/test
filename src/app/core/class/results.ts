export class JnResult {
    protected token: string;
    protected errors: string[] = [];
    protected messages: string[] = [];

    constructor(
        protected success: boolean,
        protected response?: any,
        protected redirect?: any,
        errors?: any,
        messages?: any,
        token: string = ''
    ){
        this.errors = this.errors.concat([errors])
        if ( errors instanceof Array ) {
            this.errors = errors;
        }

        this.messages = this.messages.concat([messages])
        if ( messages instanceof Array ) {
            this.messages = messages
        }

        this.token = token
    }

    obtainResponse(): any {
        return this.response
    }

    obtainToken(): string {
        return this.token
    }

    obtainRedirect(): string {
        return this.redirect
    }

    obtainErrors(): string[] {
        return this.errors.filter(val => !!val)
    }

    obtainMessages(): string[] {
        return this.messages.filter(val => !!val)
    }

    wasSuccess(): boolean {
        return this.success
    }

    wasFail(): boolean {
        return !this.success
    }
}