// @ts-check

/** @typedef {'true'|'false'} AttrValueSetB */
/** @typedef {'true'|'false'|'undefined'} AttrValueSetU */
/** @typedef {'on'|'off'} AttrValueSetO */
/** @typedef {'yes'|'no'} AttrValueSetY */
/** @typedef {'soft'|'hard'} AttrValueSetW */
/** @typedef {'ltr'|'rtl'|'auto'} AttrValueSetD */
/** @typedef {'get'|'post'|'dialog'} AttrValueSetM */
/** @typedef {'get'|'post'} AttrValueSetFm */
/** @typedef {'row'|'col'|'rowgroup'|'colgroup'} AttrValueSetS */
/** @typedef {'hidden'|'text'|'search'|'tel'|'url'|'email'|'password'|'datetime'|'date'|'month'|'week'|'time'|'datetime-local'|'number'|'range'|'color'|'checkbox'|'radio'|'file'|'submit'|'image'|'reset'|'button'} AttrValueSetT */
/** @typedef {'verbatim'|'latin'|'latin-name'|'latin-prose'|'full-width-latin'|'kana'|'kana-name'|'katakana'|'numeric'|'tel'|'email'|'url'} AttrValueSetIm */
/** @typedef {'button'|'submit'|'reset'|'menu'} AttrValueSetBt */
/** @typedef {'1'|'a'|'A'|'i'|'I'} AttrValueSetLt */
/** @typedef {'context'|'toolbar'} AttrValueSetMt */
/** @typedef {'command'|'checkbox'|'radio'} AttrValueSetMit */
/** @typedef {'application/x-www-form-urlencoded'|'multipart/form-data'|'text/plain'} AttrValueSetEt */
/** @typedef {'subtitles'|'captions'|'descriptions'|'chapters'|'metadata'} AttrValueSetTk */
/** @typedef {'none'|'metadata'|'auto'} AttrValueSetPl */
/** @typedef {'circle'|'default'|'poly'|'rect'} AttrValueSetSh */
/** @typedef {'anonymous'|'use-credentials'} AttrValueSetXo */
/** @typedef {'allow-forms'|'allow-modals'|'allow-pointer-lock'|'allow-popups'|'allow-popups-to-escape-sandbox'|'allow-same-origin'|'allow-scripts'|'allow-top-navigation'} AttrValueSetSb */
/** @typedef {'true'|'false'|'mixed'|'undefined'} AttrValueSetTristate */
/** @typedef {'additional-name'|'address-level1'|'address-level2'|'address-level3'|'address-level4'|'address-line1'|'address-line2'|'address-line3'|'bday'|'bday-year'|'bday-day'|'bday-month'|'billing'|'cc-additional-name'|'cc-csc'|'cc-exp'|'cc-exp-month'|'cc-exp-year'|'cc-family-name'|'cc-given-name'|'cc-name'|'cc-number'|'cc-type'|'country'|'country-name'|'current-password'|'email'|'family-name'|'fax'|'given-name'|'home'|'honorific-prefix'|'honorific-suffix'|'impp'|'language'|'mobile'|'name'|'new-password'|'nickname'|'organization'|'organization-title'|'pager'|'photo'|'postal-code'|'sex'|'shipping'|'street-address'|'tel-area-code'|'tel'|'tel-country-code'|'tel-extension'|'tel-local'|'tel-local-prefix'|'tel-local-suffix'|'tel-national'|'transaction-amount'|'transaction-currency'|'url'|'username'|'work'} AttrValueSetInputautocomplete */
/** @typedef {'inline'|'list'|'both'|'none'} AttrValueSetAutocomplete */
/** @typedef {'page'|'step'|'location'|'date'|'time'|'true'|'false'} AttrValueSetCurrent */
/** @typedef {'copy'|'move'|'link'|'execute'|'popup'|'none'} AttrValueSetDropeffect */
/** @typedef {'grammar'|'false'|'spelling'|'true'} AttrValueSetInvalid */
/** @typedef {'off'|'polite'|'assertive'} AttrValueSetLive */
/** @typedef {'vertical'|'horizontal'|'undefined'} AttrValueSetOrientation */
/** @typedef {'additions'|'removals'|'text'|'all'|'additions text'} AttrValueSetRelevant */
/** @typedef {'ascending'|'descending'|'none'|'other'} AttrValueSetSort */
/** @typedef {'alert'|'alertdialog'|'button'|'checkbox'|'dialog'|'gridcell'|'link'|'log'|'marquee'|'menuitem'|'menuitemcheckbox'|'menuitemradio'|'option'|'progressbar'|'radio'|'scrollbar'|'searchbox'|'slider'|'spinbutton'|'status'|'switch'|'tab'|'tabpanel'|'textbox'|'timer'|'tooltip'|'treeitem'|'combobox'|'grid'|'listbox'|'menu'|'menubar'|'radiogroup'|'tablist'|'tree'|'treegrid'|'application'|'article'|'cell'|'columnheader'|'definition'|'directory'|'document'|'feed'|'figure'|'group'|'heading'|'img'|'list'|'listitem'|'math'|'none'|'note'|'presentation'|'region'|'row'|'rowgroup'|'rowheader'|'separator'|'table'|'term'|'text'|'toolbar'|'banner'|'complementary'|'contentinfo'|'form'|'main'|'navigation'|'region'|'search'|'doc-abstract'|'doc-acknowledgments'|'doc-afterword'|'doc-appendix'|'doc-backlink'|'doc-biblioentry'|'doc-bibliography'|'doc-biblioref'|'doc-chapter'|'doc-colophon'|'doc-conclusion'|'doc-cover'|'doc-credit'|'doc-credits'|'doc-dedication'|'doc-endnote'|'doc-endnotes'|'doc-epigraph'|'doc-epilogue'|'doc-errata'|'doc-example'|'doc-footnote'|'doc-foreword'|'doc-glossary'|'doc-glossref'|'doc-index'|'doc-introduction'|'doc-noteref'|'doc-notice'|'doc-pagebreak'|'doc-pagelist'|'doc-part'|'doc-preface'|'doc-prologue'|'doc-pullquote'|'doc-qna'|'doc-subtitle'|'doc-tip'|'doc-toc'} AttrValueSetRoles */
/** @typedef {'application-name'|'author'|'description'|'format-detection'|'generator'|'keywords'|'publisher'|'referrer'|'robots'|'theme-color'|'viewport'} AttrValueSetMetanames */
/** @typedef {'false'|'true'|'menu'|'listbox'|'tree'|'grid'|'dialog'} AttrValueSetHaspopup */
/** @typedef {string} AttrValueSetV */


/**
 * @typedef {Object} GlobalAttr
 * @property {string} accesskey [Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout.]
 * @property {string} autocapitalize [Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:

*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)
*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase
*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase
*   `characters`, all letters should default to uppercase]
 * @property {string} class [A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](/en-US/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](/en-US/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").]
 * @property {string} contenteditable [An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:

*   `true` or the _empty string_, which indicates that the element must be editable;
*   `false`, which indicates that the element must not be editable.]
 * @property {string} contextmenu [The `[**id**](#attr-id)` of a [`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.]
 * @property {AttrValueSetD} dir [An enumerated attribute indicating the directionality of the element's text. It can have the following values:

*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);
*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);
*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.]
 * @property {AttrValueSetB} draggable [An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](/en-us/docs/DragDrop/Drag_and_Drop). It can have the following values:

*   `true`, which indicates that the element may be dragged
*   `false`, which indicates that the element may not be dragged.]
 * @property {string} dropzone [An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](/en-US/docs/DragDrop/Drag_and_Drop). It can have the following values:

*   `copy`, which indicates that dropping will create a copy of the element that was dragged
*   `move`, which indicates that the element that was dragged will be moved to this new location.
*   `link`, will create a link to the dragged data.]
 * @property {string} exportparts [Used to transitively export shadow parts from a nested shadow tree into a containing light tree.]
 * @property {AttrValueSetV} hidden [A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown.]
 * @property {string} id [Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).]
 * @property {string} inputmode [Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](/en-US/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.]
 * @property {string} is [Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](/en-US/docs/Web/Web_Components/Using_custom_elements) for more details).]
 * @property {string} itemid [The unique, global identifier of an item.]
 * @property {string} itemprop [Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair.]
 * @property {string} itemref [Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document.]
 * @property {AttrValueSetV} itemscope [`itemscope` (usually) works along with `[itemtype](/en-US/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context.]
 * @property {string} itemtype [Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](/en-US/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.]
 * @property {string} lang [Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it.]
 * @property {string} part [A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](/en-US/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.]
 * @property {AttrValueSetRoles} role [undefined]
 * @property {string} slot [Assigns a slot in a [shadow DOM](/en-US/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](/en-US/docs/Web/HTML/Element/slot "The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.") element whose `[name](/en-US/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value.]
 * @property {AttrValueSetB} spellcheck [An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:

*   `true`, which indicates that the element should be, if possible, checked for spelling errors;
*   `false`, which indicates that the element should not be checked for spelling errors.]
 * @property {string} style [Contains [CSS](/en-US/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](/en-US/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.]
 * @property {string} tabindex [An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:

*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document.]
 * @property {string} title [Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip.]
 * @property {AttrValueSetY} translate [An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](/en-US/docs/Web/API/Text "The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:

*   empty string and `yes`, which indicates that the element will be translated.
*   `no`, which indicates that the element will not be translated.]
 * @property {string} onabort [The loading of a resource has been aborted.]
 * @property {string} onblur [An element has lost focus (does not bubble).]
 * @property {string} oncanplay [The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.]
 * @property {string} oncanplaythrough [The user agent can play the media up to its end without having to stop for further buffering of content.]
 * @property {string} onchange [The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user.]
 * @property {string} onclick [A pointing device button has been pressed and released on an element.]
 * @property {string} oncontextmenu [The right button of the mouse is clicked (before the context menu is displayed).]
 * @property {string} ondblclick [A pointing device button is clicked twice on an element.]
 * @property {string} ondrag [An element or text selection is being dragged (every 350ms).]
 * @property {string} ondragend [A drag operation is being ended (by releasing a mouse button or hitting the escape key).]
 * @property {string} ondragenter [A dragged element or text selection enters a valid drop target.]
 * @property {string} ondragleave [A dragged element or text selection leaves a valid drop target.]
 * @property {string} ondragover [An element or text selection is being dragged over a valid drop target (every 350ms).]
 * @property {string} ondragstart [The user starts dragging an element or text selection.]
 * @property {string} ondrop [An element is dropped on a valid drop target.]
 * @property {string} ondurationchange [The duration attribute has been updated.]
 * @property {string} onemptied [The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.]
 * @property {string} onended [Playback has stopped because the end of the media was reached.]
 * @property {string} onerror [A resource failed to load.]
 * @property {string} onfocus [An element has received focus (does not bubble).]
 * @property {string} onformchange [undefined]
 * @property {string} onforminput [undefined]
 * @property {string} oninput [The value of an element changes or the content of an element with the attribute contenteditable is modified.]
 * @property {string} oninvalid [A submittable element has been checked and doesn't satisfy its constraints.]
 * @property {string} onkeydown [A key is pressed down.]
 * @property {string} onkeypress [A key is pressed down and that key normally produces a character value (use input instead).]
 * @property {string} onkeyup [A key is released.]
 * @property {string} onload [A resource and its dependent resources have finished loading.]
 * @property {string} onloadeddata [The first frame of the media has finished loading.]
 * @property {string} onloadedmetadata [The metadata has been loaded.]
 * @property {string} onloadstart [Progress has begun.]
 * @property {string} onmousedown [A pointing device button (usually a mouse) is pressed on an element.]
 * @property {string} onmousemove [A pointing device is moved over an element.]
 * @property {string} onmouseout [A pointing device is moved off the element that has the listener attached or off one of its children.]
 * @property {string} onmouseover [A pointing device is moved onto the element that has the listener attached or onto one of its children.]
 * @property {string} onmouseup [A pointing device button is released over an element.]
 * @property {string} onmousewheel [undefined]
 * @property {string} onmouseenter [A pointing device is moved onto the element that has the listener attached.]
 * @property {string} onmouseleave [A pointing device is moved off the element that has the listener attached.]
 * @property {string} onpause [Playback has been paused.]
 * @property {string} onplay [Playback has begun.]
 * @property {string} onplaying [Playback is ready to start after having been paused or delayed due to lack of data.]
 * @property {string} onprogress [In progress.]
 * @property {string} onratechange [The playback rate has changed.]
 * @property {string} onreset [A form is reset.]
 * @property {string} onresize [The document view has been resized.]
 * @property {string} onreadystatechange [The readyState attribute of a document has changed.]
 * @property {string} onscroll [The document view or an element has been scrolled.]
 * @property {string} onseeked [A seek operation completed.]
 * @property {string} onseeking [A seek operation began.]
 * @property {string} onselect [Some text is being selected.]
 * @property {string} onshow [A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute]
 * @property {string} onstalled [The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.]
 * @property {string} onsubmit [A form is submitted.]
 * @property {string} onsuspend [Media data loading has been suspended.]
 * @property {string} ontimeupdate [The time indicated by the currentTime attribute has been updated.]
 * @property {string} onvolumechange [The volume has changed.]
 * @property {string} onwaiting [Playback has stopped because of a temporary lack of data.]
 * @property {string} onpointercancel [The pointer is unlikely to produce any more events.]
 * @property {string} onpointerdown [The pointer enters the active buttons state.]
 * @property {string} onpointerenter [Pointing device is moved inside the hit-testing boundary.]
 * @property {string} onpointerleave [Pointing device is moved out of the hit-testing boundary.]
 * @property {string} onpointerlockchange [The pointer was locked or released.]
 * @property {string} onpointerlockerror [It was impossible to lock the pointer for technical reasons or because the permission was denied.]
 * @property {string} onpointermove [The pointer changed coordinates.]
 * @property {string} onpointerout [The pointing device moved out of hit-testing boundary or leaves detectable hover range.]
 * @property {string} onpointerover [The pointing device is moved into the hit-testing boundary.]
 * @property {string} onpointerup [The pointer leaves the active buttons state.]
 * @property {string} aria-activedescendant [Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application).]
 * @property {AttrValueSetB} aria-atomic [Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute.]
 * @property {AttrValueSetAutocomplete} aria-autocomplete [Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.]
 * @property {AttrValueSetB} aria-busy [Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user.]
 * @property {AttrValueSetTristate} aria-checked [Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).]
 * @property {string} aria-colcount [Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex).]
 * @property {string} aria-colindex [Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).]
 * @property {string} aria-colspan [Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).]
 * @property {string} aria-controls [Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns).]
 * @property {AttrValueSetCurrent} aria-current [Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements.]
 * @property {string} aria-describedby [Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).]
 * @property {AttrValueSetB} aria-disabled [Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly).]
 * @property {AttrValueSetDropeffect} aria-dropeffect [\[Deprecated in ARIA 1.1\] Indicates what functions can be performed when a dragged object is released on the drop target.]
 * @property {string} aria-errormessage [Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).]
 * @property {AttrValueSetU} aria-expanded [Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.]
 * @property {string} aria-flowto [Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.]
 * @property {AttrValueSetU} aria-grabbed [\[Deprecated in ARIA 1.1\] Indicates an element's "grabbed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.]
 * @property {AttrValueSetHaspopup} aria-haspopup [Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).]
 * @property {AttrValueSetB} aria-hidden [Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).]
 * @property {AttrValueSetInvalid} aria-invalid [Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage).]
 * @property {string} aria-label [Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).]
 * @property {string} aria-labelledby [Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).]
 * @property {string} aria-level [Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure.]
 * @property {AttrValueSetLive} aria-live [Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region).]
 * @property {AttrValueSetB} aria-modal [Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed.]
 * @property {AttrValueSetB} aria-multiline [Indicates whether a text box accepts multiple lines of input or only a single line.]
 * @property {AttrValueSetB} aria-multiselectable [Indicates that the user may select more than one item from the current selectable descendants.]
 * @property {AttrValueSetOrientation} aria-orientation [Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.]
 * @property {string} aria-owns [Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls).]
 * @property {string} aria-placeholder [Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.]
 * @property {string} aria-posinset [Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize).]
 * @property {AttrValueSetTristate} aria-pressed [Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).]
 * @property {AttrValueSetB} aria-readonly [Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled).]
 * @property {AttrValueSetRelevant} aria-relevant [Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic).]
 * @property {AttrValueSetB} aria-required [Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted.]
 * @property {string} aria-roledescription [Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element).]
 * @property {string} aria-rowcount [Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex).]
 * @property {string} aria-rowindex [Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan).]
 * @property {string} aria-rowspan [Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan).]
 * @property {AttrValueSetU} aria-selected [Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).]
 * @property {string} aria-setsize [Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset).]
 * @property {AttrValueSetSort} aria-sort [Indicates if items in a table or grid are sorted in ascending or descending order.]
 * @property {string} aria-valuemax [Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).]
 * @property {string} aria-valuemin [Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).]
 * @property {string} aria-valuenow [Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext).]
 * @property {string} aria-valuetext [Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget).]
 * @property {string} aria-details [Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby).]
 * @property {string} aria-keyshortcuts [Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.]
 */


/**
 * @typedef {GlobalAttr} HtmlAttr
 * @property {string} [manifest] Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details.
 * @property {string} [version] undefined
 * @property {string} [xmlns] undefined
 */


/**
 * @typedef {GlobalAttr} HeadAttr
 * @property {string} [profile] undefined
 */


/**
 * @typedef {GlobalAttr} TitleAttr

 */


/**
 * @typedef {GlobalAttr} BaseAttr
 * @property {string} [href] The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed.
 * @property {string} [target] A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:

*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.
*   `_blank`: Load the result into a new unnamed browsing context.
*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.

If this attribute is specified, this element must come before any other elements with attributes whose values are URLs.
 */


/**
 * @typedef {GlobalAttr} LinkAttr
 * @property {string} [href] This attribute specifies the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative.
 * @property {AttrValueSetXo} [crossorigin] This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:

`anonymous`

A cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn't include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn't disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.

`use-credentials`

A cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request's credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.

If the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.
 * @property {string} [rel] This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
 * @property {string} [media] This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.

**Notes:**

*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.
*   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4.
 * @property {string} [hreflang] This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present.
 * @property {string} [type] This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.
 * @property {string} [sizes] This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:

*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.
*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.

**Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it.
 * @property {string} [as] undefined
 * @property {string} [importance] undefined
 * @property {string} [importance] undefined
 * @property {string} [integrity] undefined
 * @property {string} [referrerpolicy] undefined
 * @property {string} [title] undefined
 */


/**
 * @typedef {GlobalAttr} MetaAttr
 * @property {string} [name] This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.

This metadata name is associated with the value contained by the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:

*   `application-name` which defines the name of the application running in the web page.
    
    **Note:**
    
    *   Browsers may use this to identify the application. It is different from the [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab.") element, which usually contain the application name, but may also contain information like the document name or a status.
    *   Simple web pages shouldn't define an application-name.
    
*   `author` which defines the name of the document's author.
*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
*   `generator` which contains the identifier of the software that generated the page.
*   `keywords` which contains words relevant to the page's content separated by commas.
*   `referrer` which controls the [`Referer` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:
    
    Values for the `content` attribute of `<meta name="referrer">`
    
    `no-referrer`
    
    Do not send a HTTP `Referrer` header.
    
    `origin`
    
    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.
    
    `no-referrer-when-downgrade`
    
    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.
    
    `origin-when-cross-origin`
    
    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.
    
    `same-origin`
    
    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.
    
    `strict-origin`
    
    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).
    
    `strict-origin-when-cross-origin`
    
    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).
    
    `unsafe-URL`
    
    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.
    
    **Notes:**
    
    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.
    *   Dynamically inserting `<meta name="referrer">` (with [`document.write`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.
    *   When several conflicting policies are defined, the no-referrer policy is applied.
    

This attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:

*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.
*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).
*   `publisher` which defines the name of the document's publisher.
*   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:
    
    Values for the content of `<meta name="robots">`
    
    Value
    
    Description
    
    Used by
    
    `index`
    
    Allows the robot to index the page (default).
    
    All
    
    `noindex`
    
    Requests the robot to not index the page.
    
    All
    
    `follow`
    
    Allows the robot to follow the links on the page (default).
    
    All
    
    `nofollow`
    
    Requests the robot to not follow the links on the page.
    
    All
    
    `none`
    
    Equivalent to `noindex, nofollow`
    
    [Google](https://support.google.com/webmasters/answer/79812)
    
    `noodp`
    
    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.
    
    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    `noarchive`
    
    Requests the search engine not to cache the page content.
    
    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    `nosnippet`
    
    Prevents displaying any description of the page in search engine results.
    
    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    `noimageindex`
    
    Requests this page not to appear as the referring page of an indexed image.
    
    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)
    
    `nocache`
    
    Synonym of `noarchive`.
    
    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    **Notes:**
    
    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.
    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.
    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.
    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot's behaviour is undefined and may vary between them.
    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.
    
*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.
*   `viewport`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.
    
    Values for the content of `<meta name="viewport">`
    
    Value
    
    Possible subvalues
    
    Description
    
    `width`
    
    A positive integer number, or the text `device-width`
    
    Defines the pixel width of the viewport that you want the web site to be rendered at.
    
    `height`
    
    A positive integer, or the text `device-height`
    
    Defines the height of the viewport. Not used by any browser.
    
    `initial-scale`
    
    A positive number between `0.0` and `10.0`
    
    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.
    
    `maximum-scale`
    
    A positive number between `0.0` and `10.0`
    
    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
    
    `minimum-scale`
    
    A positive number between `0.0` and `10.0`
    
    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
    
    `user-scalable`
    
    `yes` or `no`
    
    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.
    
    Specification
    
    Status
    
    Comment
    
    [CSS Device Adaptation  
    The definition of '<meta name="viewport">' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)
    
    Working Draft
    
    Non-normatively describes the Viewport META element
    
    See also: [`@viewport`](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")
    
    **Notes:**
    
    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.
    *   The default values may vary between devices and browsers.
    *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").
 * @property {string} [http-equiv] Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:

*   `"content-language"`  
    Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.
    
    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.
    
*   `"content-security-policy"`  
    Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.
*   `"content-type"`  
    Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string '`text/html`' followed by a character set with the following syntax: '`; charset=_IANAcharset_`', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)
    
    **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.
    
    **Note:** As [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can't change documents' types in XHTML or HTML5's XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.
    
*   `"refresh"`  
    This instruction specifies:
    *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.
    *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string '`;url=`', and a valid URL.
*   `"set-cookie"`  
    Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).
    
    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.
 * @property {string} [content] This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used.
 * @property {string} [charset] This attribute declares the page's character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn't request a specific encoding, it suggests:

*   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).
*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.

**Note:** ASCII-incompatible encodings are those that don't map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)

*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.
*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.

**Notes:**

*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.
*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.
*   This [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page's character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.
*   It is strongly recommended to define the character encoding. If a page's encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).
*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended.
 * @property {string} [scheme] undefined
 */


/**
 * @typedef {GlobalAttr} StyleAttr
 * @property {string} [media] This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing.
 * @property {string} [nonce] A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial.
 * @property {string} [type] This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified — there is very little reason to include this in modern web documents.
 * @property {AttrValueSetV} [scoped] undefined
 * @property {string} [title] undefined
 */


/**
 * @typedef {GlobalAttr} BodyAttr
 * @property {string} [onafterprint] Function to call after the user has printed the document.
 * @property {string} [onbeforeprint] Function to call when the user requests printing of the document.
 * @property {string} [onbeforeunload] Function to call when the document is about to be unloaded.
 * @property {string} [onhashchange] Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed.
 * @property {string} [onlanguagechange] Function to call when the preferred languages changed.
 * @property {string} [onmessage] Function to call when the document has received a message.
 * @property {string} [onoffline] Function to call when network communication has failed.
 * @property {string} [ononline] Function to call when network communication has been restored.
 * @property {string} [onpagehide] undefined
 * @property {string} [onpageshow] undefined
 * @property {string} [onpopstate] Function to call when the user has navigated session history.
 * @property {string} [onstorage] Function to call when the storage area has changed.
 * @property {string} [onunload] Function to call when the document is going away.
 * @property {string} [alink] undefined
 * @property {string} [background] undefined
 * @property {string} [bgcolor] undefined
 * @property {string} [bottommargin] undefined
 * @property {string} [leftmargin] undefined
 * @property {string} [link] undefined
 * @property {string} [onblur] undefined
 * @property {string} [onerror] undefined
 * @property {string} [onfocus] undefined
 * @property {string} [onload] undefined
 * @property {string} [onredo] undefined
 * @property {string} [onresize] undefined
 * @property {string} [onundo] undefined
 * @property {string} [rightmargin] undefined
 * @property {string} [text] undefined
 * @property {string} [topmargin] undefined
 * @property {string} [vlink] undefined
 */


/**
 * @typedef {GlobalAttr} ArticleAttr

 */


/**
 * @typedef {GlobalAttr} SectionAttr

 */


/**
 * @typedef {GlobalAttr} NavAttr

 */


/**
 * @typedef {GlobalAttr} AsideAttr

 */


/**
 * @typedef {GlobalAttr} H1Attr

 */


/**
 * @typedef {GlobalAttr} H2Attr

 */


/**
 * @typedef {GlobalAttr} H3Attr

 */


/**
 * @typedef {GlobalAttr} H4Attr

 */


/**
 * @typedef {GlobalAttr} H5Attr

 */


/**
 * @typedef {GlobalAttr} H6Attr

 */


/**
 * @typedef {GlobalAttr} HeaderAttr

 */


/**
 * @typedef {GlobalAttr} FooterAttr

 */


/**
 * @typedef {GlobalAttr} AddressAttr

 */


/**
 * @typedef {GlobalAttr} PAttr

 */


/**
 * @typedef {GlobalAttr} HrAttr
 * @property {string} [align] undefined
 * @property {string} [color] undefined
 * @property {string} [noshade] undefined
 * @property {string} [size] undefined
 * @property {string} [width] undefined
 */


/**
 * @typedef {GlobalAttr} PreAttr
 * @property {string} [cols] undefined
 * @property {string} [width] undefined
 * @property {string} [wrap] undefined
 */


/**
 * @typedef {GlobalAttr} BlockquoteAttr
 * @property {string} [cite] A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
 */


/**
 * @typedef {GlobalAttr} OlAttr
 * @property {AttrValueSetV} [reversed] This Boolean attribute specifies that the items of the list are specified in reversed order.
 * @property {string} [start] This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.

**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.
 * @property {AttrValueSetLt} [type] Indicates the numbering type:

*   `'a'` indicates lowercase letters,
*   `'A'` indicates uppercase letters,
*   `'i'` indicates lowercase Roman numerals,
*   `'I'` indicates uppercase Roman numerals,
*   and `'1'` indicates numbers (default).

The type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li "The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.") element.

**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.

Unless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property should be used instead.
 * @property {string} [compact] undefined
 */


/**
 * @typedef {GlobalAttr} UlAttr
 * @property {string} [compact] undefined
 */


/**
 * @typedef {GlobalAttr} LiAttr
 * @property {string} [value] This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).

**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.

**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed.
 * @property {string} [type] undefined
 */


/**
 * @typedef {GlobalAttr} DlAttr

 */


/**
 * @typedef {GlobalAttr} DtAttr

 */


/**
 * @typedef {GlobalAttr} DdAttr
 * @property {string} [nowrap] undefined
 */


/**
 * @typedef {GlobalAttr} FigureAttr

 */


/**
 * @typedef {GlobalAttr} FigcaptionAttr

 */


/**
 * @typedef {GlobalAttr} MainAttr

 */


/**
 * @typedef {GlobalAttr} DivAttr

 */


/**
 * @typedef {GlobalAttr} AAttr
 * @property {string} [href] Contains a URL or a URL fragment that the hyperlink points to.
 * @property {string} [target] Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:

*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.
*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.
*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.
*   `_top`: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.

**Note:** When using `target`, consider adding `rel="noreferrer"` to avoid exploitation of the `window.opener` API.

**Note:** Linking to another page using `target="_blank"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page's performance may suffer. To avoid this use `rel="noopener"`.
 * @property {string} [download] This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.

**Notes:**

*   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
*   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.
*   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.
*   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute.
 * @property {string} [ping] Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST "The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking.
 * @property {string} [rel] Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
 * @property {string} [hreflang] This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt "Tags for Identifying Languages").
 * @property {string} [type] Specifies the media type in the form of a [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type "MIME type: A MIME type (now properly called "media type", but also sometimes "content type") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).") for the linked URL. It is purely advisory, with no built-in functionality.
 * @property {string} [referrerpolicy] undefined
 */


/**
 * @typedef {GlobalAttr} EmAttr

 */


/**
 * @typedef {GlobalAttr} StrongAttr

 */


/**
 * @typedef {GlobalAttr} SmallAttr

 */


/**
 * @typedef {GlobalAttr} SAttr

 */


/**
 * @typedef {GlobalAttr} CiteAttr

 */


/**
 * @typedef {GlobalAttr} QAttr
 * @property {string} [cite] The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
 */


/**
 * @typedef {GlobalAttr} DfnAttr

 */


/**
 * @typedef {GlobalAttr} AbbrAttr

 */


/**
 * @typedef {GlobalAttr} RubyAttr

 */


/**
 * @typedef {GlobalAttr} RbAttr

 */


/**
 * @typedef {GlobalAttr} RtAttr

 */


/**
 * @typedef {GlobalAttr} RpAttr

 */


/**
 * @typedef {GlobalAttr} TimeAttr
 * @property {string} [datetime] This attribute indicates the time and/or date of the element and must be in one of the formats described below.
 */


/**
 * @typedef {GlobalAttr} CodeAttr

 */


/**
 * @typedef {GlobalAttr} VarAttr

 */


/**
 * @typedef {GlobalAttr} SampAttr

 */


/**
 * @typedef {GlobalAttr} KbdAttr

 */


/**
 * @typedef {GlobalAttr} SubAttr

 */


/**
 * @typedef {GlobalAttr} SupAttr

 */


/**
 * @typedef {GlobalAttr} IAttr

 */


/**
 * @typedef {GlobalAttr} BAttr

 */


/**
 * @typedef {GlobalAttr} UAttr

 */


/**
 * @typedef {GlobalAttr} MarkAttr

 */


/**
 * @typedef {GlobalAttr} BdiAttr

 */


/**
 * @typedef {GlobalAttr} BdoAttr
 * @property {string} [dir] undefined
 */


/**
 * @typedef {GlobalAttr} SpanAttr

 */


/**
 * @typedef {GlobalAttr} BrAttr
 * @property {string} [clear] undefined
 */


/**
 * @typedef {GlobalAttr} WbrAttr

 */


/**
 * @typedef {GlobalAttr} InsAttr
 * @property {string} [cite] undefined
 * @property {string} [datetime] undefined
 */


/**
 * @typedef {GlobalAttr} DelAttr
 * @property {string} [cite] A URI for a resource that explains the change (for example, meeting minutes).
 * @property {string} [datetime] This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").
 */


/**
 * @typedef {GlobalAttr} PictureAttr

 */


/**
 * @typedef {GlobalAttr} ImgAttr
 * @property {string} [alt] This attribute defines an alternative text description of the image.

**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element's `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.

**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering.
 * @property {string} [src] The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors.
 * @property {string} [srcset] A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:

1.  a URL to an image,
2.  optionally, whitespace followed by one of:
    *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.
    *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.

If no descriptor is specified, the source is assigned the default descriptor: `1x`.

It is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.

The user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example.
 * @property {AttrValueSetXo} [crossorigin] This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being "[tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas)." The allowed values are:
 * @property {string} [usemap] The partial URL (starting with '#') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.

**Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") element.
 * @property {AttrValueSetV} [ismap] This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.

**Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute.
 * @property {string} [width] The intrinsic width of the image in pixels.
 * @property {string} [height] The intrinsic height of the image in pixels.
 * @property {string} [decoding] undefined
 * @property {string} [decoding] undefined
 * @property {string} [importance] undefined
 * @property {string} [importance] undefined
 * @property {string} [intrinsicsize] undefined
 * @property {string} [referrerpolicy] undefined
 * @property {string} [sizes] undefined
 */


/**
 * @typedef {GlobalAttr} IframeAttr
 * @property {string} [src] The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `<iframe>`'s src attribute (e.g. via [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute "The Element method removeAttribute() removes the attribute with the specified name from the element.")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.
 * @property {string} [srcdoc] Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute.
 * @property {string} [name] A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL."), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server."), or [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base "The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.") elements; the `formtarget` attribute of the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") elements; or the `windowName` parameter in the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open "The Window interface's open() method loads the specified resource into the browsing context (window, <iframe> or tab) with the specified name. If the name doesn't exist, then a new window is opened and the specified resource is loaded into its browsing context.") method.
 * @property {AttrValueSetSb} [sandbox] Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:

*   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.
*   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).
*   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).
*   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).
*   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.
*   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.
*   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).
*   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy "same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.").
*   `allow-scripts`: Lets the resource run scripts (but not create popup windows).
*   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent's storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).
*   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).
*   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.

**Notes about sandboxing:**

*   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.
*   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.
*   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier.
 * @property {AttrValueSetV} [seamless] undefined
 * @property {AttrValueSetV} [allowfullscreen] Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen "The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.") method.
 * @property {string} [width] The width of the frame in CSS pixels. Default is `300`.
 * @property {string} [height] The height of the frame in CSS pixels. Default is `150`.
 * @property {string} [allow] undefined
 * @property {string} [allowpaymentrequest] undefined
 * @property {string} [allowpaymentrequest] undefined
 * @property {string} [csp] undefined
 * @property {string} [importance] undefined
 * @property {string} [referrerpolicy] undefined
 */


/**
 * @typedef {GlobalAttr} EmbedAttr
 * @property {string} [src] The URL of the resource being embedded.
 * @property {string} [type] The MIME type to use to select the plug-in to instantiate.
 * @property {string} [width] The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed.
 * @property {string} [height] The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed.
 */


/**
 * @typedef {GlobalAttr} ObjectAttr
 * @property {string} [data] The address of the resource as a valid URL. At least one of **data** and **type** must be defined.
 * @property {string} [type] The [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined.
 * @property {AttrValueSetV} [typemustmatch] This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used.
 * @property {string} [name] The name of valid browsing context (HTML5), or the name of the control (HTML 4).
 * @property {string} [usemap] A hash-name reference to a [`<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map "The HTML <map> element is used with <area> elements to define an image map (a clickable link area).") element; that is a '#' followed by the value of a [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map#attr-name) of a map element.
 * @property {string} [form] The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document.
 * @property {string} [width] The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))
 * @property {string} [height] The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))
 * @property {string} [archive] undefined
 * @property {string} [border] undefined
 * @property {string} [classid] undefined
 * @property {string} [codebase] undefined
 * @property {string} [codetype] undefined
 * @property {string} [declare] undefined
 * @property {string} [standby] undefined
 * @property {string} [tabindex] undefined
 */


/**
 * @typedef {GlobalAttr} ParamAttr
 * @property {string} [name] Name of the parameter.
 * @property {string} [value] Specifies the value of the parameter.
 * @property {string} [type] undefined
 * @property {string} [valuetype] undefined
 */


/**
 * @typedef {GlobalAttr} VideoAttr
 * @property {string} [src] undefined
 * @property {AttrValueSetXo} [crossorigin] undefined
 * @property {string} [poster] undefined
 * @property {AttrValueSetPl} [preload] undefined
 * @property {AttrValueSetV} [autoplay] A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.
 * @property {string} [mediagroup] undefined
 * @property {AttrValueSetV} [loop] undefined
 * @property {AttrValueSetV} [muted] undefined
 * @property {AttrValueSetV} [controls] undefined
 * @property {string} [width] undefined
 * @property {string} [height] undefined
 */


/**
 * @typedef {GlobalAttr} AudioAttr
 * @property {string} [src] The URL of the audio to embed. This is subject to [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element within the audio block to specify the audio to embed.
 * @property {AttrValueSetXo} [crossorigin] This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:

anonymous

Sends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.

use-credentials

Sends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.

When not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information.
 * @property {AttrValueSetPl} [preload] This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:

*   `none`: Indicates that the audio should not be preloaded.
*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.
*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.
*   _empty string_: A synonym of the `auto` value.

If not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.

**Usage notes:**

*   The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.
*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint.
 * @property {AttrValueSetV} [autoplay] A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.

**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.
 * @property {string} [mediagroup] undefined
 * @property {AttrValueSetV} [loop] A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio.
 * @property {AttrValueSetV} [muted] A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`.
 * @property {AttrValueSetV} [controls] If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.
 */


/**
 * @typedef {GlobalAttr} SourceAttr
 * @property {string} [src] Required for [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document."), address of the media resource. The value of this attribute is ignored when the `<source>` element is placed inside a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.
 * @property {string} [type] The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs.
 * @property {string} [sizes] undefined
 * @property {string} [srcset] undefined
 * @property {string} [media] undefined
 */


/**
 * @typedef {GlobalAttr} TrackAttr
 * @property {AttrValueSetV} [default] This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element.
 * @property {AttrValueSetTk} [kind] How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:

*   `subtitles`
    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.
    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.
*   `captions`
    *   Closed captions provide a transcription and possibly a translation of audio.
    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).
    *   Suitable for users who are deaf or when the sound is muted.
*   `descriptions`
    *   Textual description of the video content.
    *   Suitable for users who are blind or where the video cannot be seen.
*   `chapters`
    *   Chapter titles are intended to be used when the user is navigating the media resource.
*   `metadata`
    *   Tracks used by scripts. Not visible to the user.
 * @property {string} [label] A user-readable title of the text track which is used by the browser when listing available text tracks.
 * @property {string} [src] Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute.
 * @property {string} [srclang] Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined.
 */


/**
 * @typedef {GlobalAttr} MapAttr
 * @property {string} [name] The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value.
 */


/**
 * @typedef {GlobalAttr} AreaAttr
 * @property {string} [alt] undefined
 * @property {string} [coords] undefined
 * @property {AttrValueSetSh} [shape] undefined
 * @property {string} [href] undefined
 * @property {string} [target] undefined
 * @property {string} [download] undefined
 * @property {string} [ping] undefined
 * @property {string} [rel] undefined
 * @property {string} [hreflang] undefined
 * @property {string} [type] undefined
 * @property {string} [accesskey] undefined
 */


/**
 * @typedef {GlobalAttr} TableAttr
 * @property {string} [border] undefined
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} CaptionAttr
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} ColgroupAttr
 * @property {string} [span] undefined
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} ColAttr
 * @property {string} [span] undefined
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} TbodyAttr
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} TheadAttr
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} TfootAttr
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} TrAttr
 * @property {string} [align] undefined
 */


/**
 * @typedef {GlobalAttr} TdAttr
 * @property {string} [colspan] undefined
 * @property {string} [rowspan] undefined
 * @property {string} [headers] undefined
 * @property {string} [abbr] undefined
 * @property {string} [align] undefined
 * @property {string} [axis] undefined
 * @property {string} [bgcolor] undefined
 */


/**
 * @typedef {GlobalAttr} ThAttr
 * @property {string} [colspan] undefined
 * @property {string} [rowspan] undefined
 * @property {string} [headers] undefined
 * @property {AttrValueSetS} [scope] undefined
 * @property {string} [sorted] undefined
 * @property {string} [abbr] This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.
 * @property {string} [align] undefined
 * @property {string} [axis] undefined
 * @property {string} [bgcolor] undefined
 */


/**
 * @typedef {GlobalAttr} FormAttr
 * @property {string} [accept-charset] A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  
In previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.
 * @property {string} [action] The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
 * @property {AttrValueSetO} [autocomplete] Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:

*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.
*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.

For most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields).
 * @property {AttrValueSetEt} [enctype] When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:

*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.
*   `multipart/form-data`: The value used for an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".
*   `text/plain`: (HTML5)

This value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
 * @property {AttrValueSetM} [method] The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:

*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.
*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.
*   `dialog`: Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.

This value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
 * @property {string} [name] The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5.
 * @property {AttrValueSetV} [novalidate] This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form.
 * @property {string} [target] A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:

*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.
*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.
*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.
*   _iframename_: The response is displayed in a named [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").

HTML5: This value can be overridden by a [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formtarget) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.
 * @property {string} [accept] undefined
 * @property {string} [autocapitalize] undefined
 */


/**
 * @typedef {GlobalAttr} LabelAttr
 * @property {string} [form] The [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements.
 * @property {string} [for] The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.

**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element.
 */


/**
 * @typedef {GlobalAttr} InputAttr
 * @property {string} [accept] undefined
 * @property {string} [alt] undefined
 * @property {AttrValueSetInputautocomplete} [autocomplete] undefined
 * @property {AttrValueSetV} [autofocus] undefined
 * @property {AttrValueSetV} [checked] undefined
 * @property {string} [dirname] undefined
 * @property {AttrValueSetV} [disabled] undefined
 * @property {string} [form] undefined
 * @property {string} [formaction] undefined
 * @property {AttrValueSetEt} [formenctype] undefined
 * @property {AttrValueSetFm} [formmethod] undefined
 * @property {AttrValueSetV} [formnovalidate] undefined
 * @property {string} [formtarget] undefined
 * @property {string} [height] undefined
 * @property {AttrValueSetIm} [inputmode] undefined
 * @property {string} [list] undefined
 * @property {string} [max] undefined
 * @property {string} [maxlength] undefined
 * @property {string} [min] undefined
 * @property {string} [minlength] undefined
 * @property {AttrValueSetV} [multiple] undefined
 * @property {string} [name] undefined
 * @property {string} [pattern] undefined
 * @property {string} [placeholder] undefined
 * @property {AttrValueSetV} [readonly] undefined
 * @property {AttrValueSetV} [required] undefined
 * @property {string} [size] undefined
 * @property {string} [src] undefined
 * @property {string} [step] undefined
 * @property {AttrValueSetT} [type] undefined
 * @property {string} [value] undefined
 * @property {string} [width] undefined
 */


/**
 * @typedef {GlobalAttr} ButtonAttr
 * @property {AttrValueSetV} [autofocus] This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified.
 * @property {AttrValueSetV} [disabled] This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element with the **disabled** attribute set, then the button is enabled.

Firefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.
 * @property {string} [form] The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. If this attribute is not specified, the `<button>` element will be associated to an ancestor [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element, if one exists. This attribute enables you to associate `<button>` elements to [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements anywhere within a document, not just as descendants of [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements.
 * @property {string} [formaction] The URI of a program that processes the information submitted by the button. If specified, it overrides the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner.
 * @property {AttrValueSetEt} [formenctype] If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:

*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.
*   `multipart/form-data`: Use this value if you are using an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to `file`.
*   `text/plain`

If this attribute is specified, it overrides the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button's form owner.
 * @property {AttrValueSetFm} [formmethod] If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:

*   `post`: The data from the form are included in the body of the form and sent to the server.
*   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.

If specified, this attribute overrides the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner.
 * @property {AttrValueSetV} [formnovalidate] If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner.
 * @property {string} [formtarget] If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:

*   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.
*   `_blank`: Load the response into a new unnamed browsing context.
*   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
*   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.
 * @property {string} [name] The name of the button, which is submitted with the form data.
 * @property {AttrValueSetBt} [type] The type of the button. Possible values are:

*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.
*   `reset`: The button resets all the controls to their initial values.
*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur.
 * @property {string} [value] The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted.
 * @property {string} [autocomplete] undefined
 */


/**
 * @typedef {GlobalAttr} SelectAttr
 * @property {AttrValueSetInputautocomplete} [autocomplete] A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") providing a hint for a [user agent's](https://developer.mozilla.org/en-US/docs/Glossary/user_agent "user agent's: A user agent is a computer program representing a person, for example, a browser in a Web context.") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete.
 * @property {AttrValueSetV} [autofocus] This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute.
 * @property {AttrValueSetV} [disabled] This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled.
 * @property {string} [form] This attribute lets you specify the form element to which the select element is associated (that is, its "form owner"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.
 * @property {AttrValueSetV} [multiple] This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown.
 * @property {string} [name] This attribute is used to specify the name of the control.
 * @property {AttrValueSetV} [required] A Boolean attribute indicating that an option with a non-empty string value must be selected.
 * @property {string} [size] If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.

**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox.
 */


/**
 * @typedef {GlobalAttr} DatalistAttr

 */


/**
 * @typedef {GlobalAttr} OptgroupAttr
 * @property {AttrValueSetV} [disabled] If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones.
 * @property {string} [label] The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used.
 */


/**
 * @typedef {GlobalAttr} OptionAttr
 * @property {AttrValueSetV} [disabled] If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup "The HTML <optgroup> element creates a grouping of options within a <select> element.") element.
 * @property {string} [label] This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content.
 * @property {AttrValueSetV} [selected] If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `<option>` of this [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element may have the `selected` attribute.
 * @property {string} [value] The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element.
 */


/**
 * @typedef {GlobalAttr} TextareaAttr
 * @property {AttrValueSetInputautocomplete} [autocomplete] This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:

*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.
*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.

If the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element's form owner. The form owner is either the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").
 * @property {AttrValueSetV} [autofocus] This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified.
 * @property {string} [cols] The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`.
 * @property {string} [dirname] undefined
 * @property {AttrValueSetV} [disabled] This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled.
 * @property {string} [form] The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.
 * @property {AttrValueSetIm} [inputmode] undefined
 * @property {string} [maxlength] The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters.
 * @property {string} [minlength] The minimum number of characters (unicode code points) required that the user should enter.
 * @property {string} [name] The name of the control.
 * @property {string} [placeholder] A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.

**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The HTML <label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [<input>: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.
 * @property {AttrValueSetV} [readonly] This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.
 * @property {AttrValueSetV} [required] This attribute specifies that the user must fill in a value before submitting a form.
 * @property {string} [rows] The number of visible text lines for the control.
 * @property {AttrValueSetW} [wrap] Indicates how the control wraps text. Possible values are:

*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.
*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.
*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.

If this attribute is not specified, `soft` is its default value.
 * @property {string} [autocapitalize] undefined
 * @property {string} [spellcheck] undefined
 */


/**
 * @typedef {GlobalAttr} OutputAttr
 * @property {string} [for] A space-separated list of other elements’ [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation.
 * @property {string} [form] The [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) that this element is associated with (its "form owner"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.
 * @property {string} [name] The name of the element, exposed in the [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement "The HTMLFormElement interface represents a <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.") API.
 */


/**
 * @typedef {GlobalAttr} ProgressAttr
 * @property {string} [value] This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.
 * @property {string} [max] This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1.
 */


/**
 * @typedef {GlobalAttr} MeterAttr
 * @property {string} [value] The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.

**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it.
 * @property {string} [min] The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0.
 * @property {string} [max] The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1.
 * @property {string} [low] The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value.
 * @property {string} [high] The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value.
 * @property {string} [optimum] This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred.
 * @property {string} [form] undefined
 */


/**
 * @typedef {GlobalAttr} FieldsetAttr
 * @property {AttrValueSetV} [disabled] If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element won't be disabled.
 * @property {string} [form] This attribute takes the value of the `id` attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `<fieldset>` to be part of, even if it is not inside the form.
 * @property {string} [name] The name associated with the group.

**Note**: The caption for the fieldset is given by the first [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element nested inside it.
 */


/**
 * @typedef {GlobalAttr} LegendAttr

 */


/**
 * @typedef {GlobalAttr} DetailsAttr
 * @property {AttrValueSetV} [open] This Boolean attribute indicates whether or not the details — that is, the contents of the `<details>` element — are currently visible. The default, `false`, means the details are not visible.
 */


/**
 * @typedef {GlobalAttr} SummaryAttr

 */


/**
 * @typedef {GlobalAttr} DialogAttr
 * @property {string} [open] undefined
 */


/**
 * @typedef {GlobalAttr} ScriptAttr
 * @property {string} [src] This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.

If a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags.
 * @property {string} [type] This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:

*   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).
*   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.
*   **Any other value:** The embedded content is treated as a data block which won't be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.

**Note:** in Firefox you could specify the version of JavaScript contained in a `<script>` element by including a non-standard `version` parameter inside the `type` attribute — for example `type="text/javascript;version=1.8"`. This has been removed in Firefox 59 (see [bug 1428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 "FIXED: Remove support for version parameter from script loader")).
 * @property {string} [charset] undefined
 * @property {AttrValueSetV} [async] This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.

This attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.

Browsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async="false"`) during HTML parsing.

Dynamically inserted scripts (using [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async="false"`.

See [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts).
 * @property {AttrValueSetV} [defer] This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").

Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.

This attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.

To achieve a similar effect for dynamically inserted scripts use `async="false"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document.
 * @property {AttrValueSetXo} [crossorigin] Normal `script` elements pass minimal information to the [`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.") for scripts which do not pass the standard [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments.
 * @property {string} [nonce] A cryptographic nonce (number used once) to whitelist inline scripts in a [script-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.
 * @property {string} [integrity] undefined
 * @property {string} [nomodule] undefined
 * @property {string} [referrerpolicy] undefined
 * @property {string} [text] undefined
 */


/**
 * @typedef {GlobalAttr} NoscriptAttr

 */


/**
 * @typedef {GlobalAttr} TemplateAttr

 */


/**
 * @typedef {GlobalAttr} CanvasAttr
 * @property {string} [width] The width of the coordinate space in CSS pixels. Defaults to 300.
 * @property {string} [height] The height of the coordinate space in CSS pixels. Defaults to 150.
 * @property {string} [moz-opaque] undefined
 */

/**
 * @typedef {Object} AttrTagNameMap
 * @property {HtmlAttr} html
 * @property {HeadAttr} head
 * @property {TitleAttr} title
 * @property {BaseAttr} base
 * @property {LinkAttr} link
 * @property {MetaAttr} meta
 * @property {StyleAttr} style
 * @property {BodyAttr} body
 * @property {ArticleAttr} article
 * @property {SectionAttr} section
 * @property {NavAttr} nav
 * @property {AsideAttr} aside
 * @property {H1Attr} h1
 * @property {H2Attr} h2
 * @property {H3Attr} h3
 * @property {H4Attr} h4
 * @property {H5Attr} h5
 * @property {H6Attr} h6
 * @property {HeaderAttr} header
 * @property {FooterAttr} footer
 * @property {AddressAttr} address
 * @property {PAttr} p
 * @property {HrAttr} hr
 * @property {PreAttr} pre
 * @property {BlockquoteAttr} blockquote
 * @property {OlAttr} ol
 * @property {UlAttr} ul
 * @property {LiAttr} li
 * @property {DlAttr} dl
 * @property {DtAttr} dt
 * @property {DdAttr} dd
 * @property {FigureAttr} figure
 * @property {FigcaptionAttr} figcaption
 * @property {MainAttr} main
 * @property {DivAttr} div
 * @property {AAttr} a
 * @property {EmAttr} em
 * @property {StrongAttr} strong
 * @property {SmallAttr} small
 * @property {SAttr} s
 * @property {CiteAttr} cite
 * @property {QAttr} q
 * @property {DfnAttr} dfn
 * @property {AbbrAttr} abbr
 * @property {RubyAttr} ruby
 * @property {RbAttr} rb
 * @property {RtAttr} rt
 * @property {RpAttr} rp
 * @property {TimeAttr} time
 * @property {CodeAttr} code
 * @property {VarAttr} var
 * @property {SampAttr} samp
 * @property {KbdAttr} kbd
 * @property {SubAttr} sub
 * @property {SupAttr} sup
 * @property {IAttr} i
 * @property {BAttr} b
 * @property {UAttr} u
 * @property {MarkAttr} mark
 * @property {BdiAttr} bdi
 * @property {BdoAttr} bdo
 * @property {SpanAttr} span
 * @property {BrAttr} br
 * @property {WbrAttr} wbr
 * @property {InsAttr} ins
 * @property {DelAttr} del
 * @property {PictureAttr} picture
 * @property {ImgAttr} img
 * @property {IframeAttr} iframe
 * @property {EmbedAttr} embed
 * @property {ObjectAttr} object
 * @property {ParamAttr} param
 * @property {VideoAttr} video
 * @property {AudioAttr} audio
 * @property {SourceAttr} source
 * @property {TrackAttr} track
 * @property {MapAttr} map
 * @property {AreaAttr} area
 * @property {TableAttr} table
 * @property {CaptionAttr} caption
 * @property {ColgroupAttr} colgroup
 * @property {ColAttr} col
 * @property {TbodyAttr} tbody
 * @property {TheadAttr} thead
 * @property {TfootAttr} tfoot
 * @property {TrAttr} tr
 * @property {TdAttr} td
 * @property {ThAttr} th
 * @property {FormAttr} form
 * @property {LabelAttr} label
 * @property {InputAttr} input
 * @property {ButtonAttr} button
 * @property {SelectAttr} select
 * @property {DatalistAttr} datalist
 * @property {OptgroupAttr} optgroup
 * @property {OptionAttr} option
 * @property {TextareaAttr} textarea
 * @property {OutputAttr} output
 * @property {ProgressAttr} progress
 * @property {MeterAttr} meter
 * @property {FieldsetAttr} fieldset
 * @property {LegendAttr} legend
 * @property {DetailsAttr} details
 * @property {SummaryAttr} summary
 * @property {DialogAttr} dialog
 * @property {ScriptAttr} script
 * @property {NoscriptAttr} noscript
 * @property {TemplateAttr} template
 * @property {CanvasAttr} canvas
 */

