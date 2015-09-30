// IIIF drag and drop implementation
// see: <http://zimeon.github.io/iiif-dragndrop/>
//
// Requires jQuery

function parseQuery(qstr) {
    // Parse query component of URI to return query object
    // with key, value pairs
    var query = {};
    var a = qstr.substr(1).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

function dropTest(data,uri,box,manifest_drop_fn,image_drop_fn) {
    // Look at the object in data to determine whether it 
    // looks like a manifest or and image info.json, else
    // log and exit
    if (data.hasOwnProperty('@context')) {
        // FIXME - does not deal with multiple contexts
        if (data['@context'] === 'http://iiif.io/api/presentation/2/context.json') {
            console.log("paste: manifest = " + uri)
            manifest_drop_fn(box,uri);
        } else if (data['@context'] === 'http://iiif.io/api/image/2/context.json' ||
                   data['@context'] === 'http://library.stanford.edu/iiif/image-api/1.1/context.json') {
            console.log("paste: image = " + uri)
            image_drop_fn(box,uri);
        } else {
            console.log("paste ignored - did not recognize @context in " + uri);
        }
    } else {
        console.log("paste ignore - no @context in " + uri);
    }
} 

function nullManifestDrop(box,manifest,canvas) {
    // simply log uncaught action to console
    console.log("uncaught manifest drop: manifest = " + manifest + " canvas = " + canvas);
}

function nullImageDrop(box,image) {
    // simply log uncaught action to console
    console.log("uncaught image drop: image = " + image);
}

function setupDropbox(dropbox_id, manifest_drop_fn, image_drop_fn) {
    // id is element id for drop zone
    if (!dropbox_id) { dropbox_id = "dropbox" };
    if (!manifest_drop_fn) { manifest_drop_fn = nullManifestDrop };
    if (!image_drop_fn) { image_drop_fn = nullImageDrop };
    
    var box = document.getElementById(dropbox_id);

    box.addEventListener('dragover', function (e) {
	    e.preventDefault();
	    box.style.backgroundColor = "#AAA";
    });

    box.addEventListener('dragleave', function (e) {
        box.style.backgroundColor = "#BBB";
	    //box.innerHTML = "";
    });

    box.addEventListener('drop', function (e) {
	    e.preventDefault();
        var parser = document.createElement('a');
        parser.href = e.dataTransfer.getData("text/uri-list");
	    var query = parseQuery(parser.search);
	    if ('manifest' in query) {
	        manifest_drop_fn(box,query['manifest'],query['canvas']);
	    } else if ('image' in query) {
	        image_drop_fn(box,query['image']);
	    } else {
	        box.style.backgroundColor = "#BBB";
	        //box.innerHTML = "[unknown drop]";
	    }
    });

    box.addEventListener('paste', function (e) {
        // Handle paste by seeing whether we have a URI and then
        // looking to see whether that is a manifest or an image info. 
        // Depending on the result we treat it like a manifest or
        // image drop. Log warning to console if data is bad or cannot
        // be read.
        e.preventDefault();
        var uri = e.clipboardData.getData('Text');
        uri = uri.trim();
        // throw out anything too long or with spaces
        if (uri.length<10 || uri.length>200 || /\s/.test(uri)) {
            console.log("paste ignored - bad length or includes spaces");
            return;
        }
        // FIXME - should there more more sanity/safety checks here?
        console.log("paste - attempting to read JSON from " + uri);
        jQuery.getJSON(uri, function (data) {
            dropTest(data,uri,box,manifest_drop_fn,image_drop_fn)
        });
    });
}

