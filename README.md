# IIIF Drag-and-drop demo

*WARNING* - Work in progress! These notes and demos are the result of work with @aeschylus & @anarchivist at the IIIF Shimathon 2015-09-29/30, UPenn.

## Demo pages

  * Demo home: <http://zimeon.github.io/iiif-dragndrop>
  * Source page: <http://zimeon.github.io/iiif-dragndrop/sourcetest.html>
  * Drop test: <http://zimeon.github.io/iiif-dragndrop/droptest.html>
  * OpenSeadragon drop demo: <http://zimeon.github.io/iiif-dragndrop/osd-demo.html>
  * Mirador drop demo: <http://sul-reader-test.stanford.edu/drag_and_drop/> running on Stanford server based on the [drag_N_drop_manifest branch of Mirador](https://github.com/IIIF/mirador/tree/drag_N_drop_manifest)

## Scenarios

*Scenario 1:* User has a [Mirador](https://github.com/IIIF/mirador/wiki) window open (or other IIIF multi-up viewer). In another window, the user is browsing or using a search interface, and locates an image, book, manuscript, etc. that they want to view in Mirador. The page for that object includes an IIIF icon that they drag and drop to Mirador. Mirador then adds the image/manifest to its index and displays it. The user can then repeat this at another site to add additional images, perhaps adding a set of different witnesses of a manuscript that they wish to compare.

*Scenario 2*: User has a simple IIIF image viewer open (such as [OpenSeadragon](https://openseadragon.github.io/)). In another window, the user is browsing or using a search interface, and locates an image that they want to view in the viewer that have open, perhaps because it offers different functionality than the default one provided for the collection they are browsing. The page for that image includes an IIIF icon that they drag and drop to their viewer. Their viewer replaces its current image with the image dropped in. (The image dropped in might be a single IIIF image or it might be one image from a larger set described by a manifest).

## HTML pattern for drag and drop

The source page for drag and drop should include the standard IIIF logo wrapped in a hyperlink. The URI of the hyperlink provides a default target in case clicked by the user, followed by a dummy query string with the `manifest`, `canvas` or `image` `info.json` URIs used to implement the draf and drop. The default target could be a help page or perhaps open a particular viewer showing the image or manifest. The query parameters are:

  * `manifest` - URI of an IIIF Presentation API manifest.
  * `canvas` - URI of currently selected canvas within the manifest. If no `canvas` is specified then the target application will use its default behaviour to present the manifest. (Has no meaning unless `manifest` is given.)
  * `image` - URI of an IIIF Image API `info.json`. This is an alternative to specifying a `manifest` for use in situations where the source implements only the Image API.

HTML example:

```
<a href="default_target?manifest=manifest_URI&canvas=canvas_URI">
  <img src="iiif-dragndrop-100px.png" alt="IIIF Drag-n-drop"/>
</a>
```

The dummy version of the proposed *"standard IIIF drag and drop logo"* used for this demo is:

![IIIF Drag-n-drop](iiif-dragndrop-100px.png)

