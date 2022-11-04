// Nombre del Cache
const nombreCache = 'apv-v3'; 

// Paginas de la PWA a "cachear"
const archivos = [  
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];

// Instalacion del Service Worker
self.addEventListener('install', e => {
    console.log('Service Worker instalado');
    console.log(e);

    // Agregar los archivos al cache
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('Cacheando...');
                cache.addAll(archivos);
            })
    );
});


// Activacion del Service Worker
self.addEventListener('activate', e => {
    console.log('Service Worker activado');
    
    e.waitUntil(
        caches.keys()
            .then(keys => {
                
                return Promise.all(
                    keys.filter( key => key !== nombreCache)
                        .map(key => caches.delete(key)) // Borra las versiones anteriores de cache
                )
            })
    )
});


// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {

    console.log('Fetch...', e);
    console.log(e);

    // Mostrar los archivos del cache
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache
            })
            .catch( () => caches.match('/error.html')) // Mostrar pagina de error
    )
});


