import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init(){
    Sentry.init({
        dsn: "https://700389dc3b9a4cc98f2daee0fb502f3d@o1317499.ingest.sentry.io/6647620",
        integrations: [new BrowserTracing()],
      
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      });
}
function log(error){
    Sentry.captureException(error)
}
function trace(message){
    Sentry.captureMessage(message)
}
export default{
    init,
    log,
    trace
}

