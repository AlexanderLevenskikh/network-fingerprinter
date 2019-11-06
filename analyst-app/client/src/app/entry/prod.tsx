import 'root/app/general.css';
import { Airgram } from '@airgram/web'

initApp();

function initApp() {
    const root = document.getElementById('root');

    // TODO implement
    const render = () => {
        console.log('Rendering...')
    };

    render();
}

const airgram = new Airgram({
    apiId,
    apiHash,
    jsLogVerbosityLevel,
    logVerbosityLevel
})

airgram.use(async (ctx, next) => {
    if ('request' in ctx) {
        console.log('🚀 [Airgram Request]:', ctx.request)
    } else if (ctx.update) {
        console.log('🚀 [Airgram Update]:', ctx.update)
    }
    await next()
    if ('request' in ctx) {
        console.log('🚀 [Airgram Response]:', ctx.request.method, ctx.response)
    }
})
