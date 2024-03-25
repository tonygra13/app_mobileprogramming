/*Questa funzione viene eseguita quando il Service
Worker viene installato nel browser, utilizza l'evento 'install' 
per esehuire una seire di azioni in risposta all'installazione. 'waitUntil' 
prende come argomento una Promise e attende che questa venga risolta prima
di completare l'installazione. Si utilizza 'caches.open' per aprire una cache
di nome memory-game. Utilizzando '.then' si aggiugnon al cache tutte le risorse
specificate nell'array 'cache.addAll([])*/
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open('memory-game').then(function(cache) {
        return cache.addAll([
            '/', '/index.html', '/style.css', '/game.js'
        ]);
    }));
});

/*Questa funzione viene eseguita ogni volta che la pagina web effetua
una richiesta di risorse, intercetta le richieste di risorse in uscita tramite 'fetch'.
'event.respondWith()' permette al Service Wroker di rispondere alle richieste in uscita 
modificandone il comportamento. Restituisce una risposta dalla cache se la risorsa è presente, 
altrimenti viene eseguita una richiesta di rete*/
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    }));
});

//IL SERVICE WORKER TRAMITE QUESTO APPROCCIO SI COMPORTA DA INTERMEDIARIO TRA LA PAGINA WEB E LA RETE
