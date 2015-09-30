// IIIF drag-n-drop implementation

function parseQuery(qstr) {
    // Parse query component of URI 
    var query = {};
    var a = qstr.substr(1).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

function manifestDrop(box,manifest,canvas) {
    box.style.backgroundColor = "#0A0";
    box.innerHTML = "[manifest dropped]<br />manifest = " + manifest + "<br />canvas = " + canvas;
}

function imageDrop(box,image) {
    box.style.backgroundColor = "#0A0";
    box.innerHTML = "[image dropped]<br />image = " + image;
}

function setupDropbox(dropbox_id, manifest_drop_fn, image_drop_fn) {
    // id is element id for drop zone
    if (!dropbox_id) { dropbox_id = "dropbox" };
    if (!manifest_drop_fn) { manifest_drop_fn = manifestDrop };
    if (!image_drop_fn) { image_drop_fn = imageDrop };
    
    var box = document.getElementById(dropbox_id);

    box.addEventListener('dragover', function (e) {
	e.preventDefault();
	box.style.backgroundColor = "#AAA";
    });

    box.addEventListener('dragleave', function (e) {
        box.style.backgroundColor = "#BBB";
	box.innerHTML = "";
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
	    box.innerHTML = "[unknown drop]";
	}
    });
}

