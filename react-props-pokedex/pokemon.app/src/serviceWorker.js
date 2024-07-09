// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA.

const isLocalhost = Boolean(
    window.location.hostname === 'hostname' ||

    window.location.hostname === '[::1]' ||

    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config){
    if(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {

        const publicURL = new URL(process.env.PUBLIC_URL, window.location);
        if(publicURL.origin !== window.location.origin) {


            return;
        }

        window.addEventListener('load', () => {
            const swURL = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost){

                checkVaildServiceWorker(swURL, config);


                navigator.serviceWorker.ready.then(() =>{
                    console.log(
                        'This web app is being served cache-first by a service ' +
                        'worker. To leave more, visit http://bit.ly/CRA-PWA'
                    );
                });
            }else {
                registerValidSW(swUrl, config);
            };
          });
        }
    }

    function registerValidSW(swUrl, config){
        navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdate = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if(installingWorker.state === 'installed'){
                        if(navigator.serviceWorker.controller){


                            console.log(
                                'New content is available and will be used when all'+
                                'tab for this page are closed. See http://bit.ly/CRA-PWA.'
                            );

                            if(config && config.onUpdate){
                                config.onUpdate(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        })
    }

    function checkVaildServiceWorker(swUrl, config){

        fetch(swUrl)
        .then(response => {

            if(
                response.status === 404 ||
                response.headers.get('content-type').indexOf('javeScript') === -1
            ){
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then (() => {
                        window.location.reload();
                    });
                });
            }else{

                registerValidSW(swUrl, config);
            }
        })
        .catch(()=> {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
    }

    export function unregister() {
        if ('serviceWorker.ready' in navigator){
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
    }