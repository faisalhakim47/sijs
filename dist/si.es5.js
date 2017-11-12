'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.si = {});
})(undefined, function (exports) {
  'use strict';

  var MARKER = '__sim__';
  var PLACEHOLDER = '__sip__';
  var INSTANCE = '__sii__';
  var IFELSE = '__siie__';

  /**
   * @param {Node} dom 
   * @param {(node: Node, nodeIndex: number, stop?: Function) => void} walkerFn 
   */
  function walkDomTree(dom, walkerFn) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$whatToShow = _ref.whatToShow,
        whatToShow = _ref$whatToShow === undefined ? 1 /* NodeFilter.SHOW_ELEMENT */ | 4 : _ref$whatToShow,
        _ref$acceptNode = _ref.acceptNode,
        acceptNode = _ref$acceptNode === undefined ? function () {
      return 1;
    } : _ref$acceptNode;

    var walker = document.createTreeWalker(dom, whatToShow, { acceptNode: acceptNode }, false);
    var nodeIndex = -1;
    var isContinue = true;
    var stop = function stop() {
      return isContinue = false;
    };
    while (walker.nextNode() && isContinue) {
      nodeIndex++;
      walkerFn(walker.currentNode, nodeIndex, stop);
    }
  }

  var List = function () {
    function List() {
      _classCallCheck(this, List);

      this.keys = [];
      this.values = [];
    }

    _createClass(List, [{
      key: 'set',
      value: function set(key, value) {
        this.keys.push(key);
        this.values.push(value);
      }
    }, {
      key: 'get',
      value: function get(key) {
        return this.values[this.keys.indexOf(key)];
      }
    }, {
      key: 'remove',
      value: function remove(key) {
        var index = this.keys.indexOf(key);
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
      }
    }]);

    return List;
  }();

  var Expression =
  /**
   * @param {number} nodeIndex 
   */
  function Expression(nodeIndex) {
    _classCallCheck(this, Expression);

    this.nodeIndex = nodeIndex;
  };

  var AttributeExpression = function (_Expression) {
    _inherits(AttributeExpression, _Expression);

    /**
     * @param {number} nodeIndex
     * @param {string} attributeName 
     * @param {string[]} staticParts 
     */
    function AttributeExpression(nodeIndex, attributeName, staticParts) {
      _classCallCheck(this, AttributeExpression);

      var _this = _possibleConstructorReturn(this, (AttributeExpression.__proto__ || Object.getPrototypeOf(AttributeExpression)).call(this, nodeIndex));

      _this.attributeName = attributeName;
      _this.staticParts = staticParts;
      return _this;
    }

    return AttributeExpression;
  }(Expression);

  var ElementExpression = function (_Expression2) {
    _inherits(ElementExpression, _Expression2);

    /**
     * @param {number} nodeIndex 
     */
    function ElementExpression(nodeIndex) {
      _classCallCheck(this, ElementExpression);

      return _possibleConstructorReturn(this, (ElementExpression.__proto__ || Object.getPrototypeOf(ElementExpression)).call(this, nodeIndex));
    }

    return ElementExpression;
  }(Expression);

  var EventExpression = function (_Expression3) {
    _inherits(EventExpression, _Expression3);

    /**
     * @param {number} nodeIndex 
     * @param {string} eventName 
     */
    function EventExpression(nodeIndex, eventName) {
      _classCallCheck(this, EventExpression);

      var _this3 = _possibleConstructorReturn(this, (EventExpression.__proto__ || Object.getPrototypeOf(EventExpression)).call(this, nodeIndex));

      _this3.eventName = eventName;
      return _this3;
    }

    return EventExpression;
  }(Expression);

  var ContentExpression = function (_Expression4) {
    _inherits(ContentExpression, _Expression4);

    /**
     * @param {number} nodeIndex 
     */
    function ContentExpression(nodeIndex) {
      _classCallCheck(this, ContentExpression);

      return _possibleConstructorReturn(this, (ContentExpression.__proto__ || Object.getPrototypeOf(ContentExpression)).call(this, nodeIndex));
    }

    return ContentExpression;
  }(Expression);

  var Updater = function () {
    function Updater() {
      _classCallCheck(this, Updater);

      this.numberOfPart = 1;
    }

    _createClass(Updater, [{
      key: 'update',
      value: function update() {}
    }]);

    return Updater;
  }();

  var AttributeUpdater = function (_Updater) {
    _inherits(AttributeUpdater, _Updater);

    /**
     * @param {Attr} attribute 
     * @param {string[]} expression
     */
    function AttributeUpdater(attribute, staticParts) {
      _classCallCheck(this, AttributeUpdater);

      var _this5 = _possibleConstructorReturn(this, (AttributeUpdater.__proto__ || Object.getPrototypeOf(AttributeUpdater)).call(this));

      _this5.node = attribute.parentElement;
      _this5.attribute = attribute;
      _this5.staticParts = staticParts;
      /* @type {string[]}  */
      _this5.oldValue = '';
      _this5.numberOfPart = staticParts.length - 1;
      return _this5;
    }

    /**
     * @param {string[]} newValues
     */


    _createClass(AttributeUpdater, [{
      key: 'update',
      value: function update(newValues) {
        var length = this.staticParts.length;
        if (length === 1 && typeof newValues[0] === 'boolean') {
          if (newValues[0]) this.node.removeAttributeNode(this.attribute);else this.node.setAttributeNode(this.attribute);
        } else {
          var value = '';
          for (var index = 0; index < length; index++) {
            value += this.staticParts[index] + (newValues[index] || '');
          }
          if (value !== this.oldValue) {
            this.attribute.nodeValue = value;
            this.oldValue = value;
          }
        }
      }
    }]);

    return AttributeUpdater;
  }(Updater);

  var ElementUpdater = function (_Updater2) {
    _inherits(ElementUpdater, _Updater2);

    /**
     * @param {Element} node
     */
    function ElementUpdater(node) {
      _classCallCheck(this, ElementUpdater);

      var _this6 = _possibleConstructorReturn(this, (ElementUpdater.__proto__ || Object.getPrototypeOf(ElementUpdater)).call(this));

      _this6.node = node;
      _this6.prevNode = node.previousSibling;
      _this6.nextNode = node.nextSibling;
      _this6.options = {};
      node.removeAttribute(MARKER);
      return _this6;
    }

    _createClass(ElementUpdater, [{
      key: 'update',
      value: function update(options) {
        options = options[0];
        for (var key in options) {
          var newOption = options[key];
          if (key === 'if') {
            if (newOption === this.options.if) continue;else if (!newOption) {
              this.nextNode.parentNode.removeChild(this.node);
              this.nextNode[IFELSE] = false;
            } else if (newOption) {
              this.nextNode.parentNode.insertBefore(this.node, this.nextNode);
              this.nextNode[IFELSE] = true;
            }
            this.options.if = newOption;
          } else if (key === 'elseIf') {
            var prevIf = this.prevNode[IFELSE];
            if (newOption === this.options.elseIf && prevIf === this.options.prevIf) {
              continue;
            }
            if (!newOption || prevIf) {
              this.nextNode.parentNode.removeChild(this.node);
              this.nextNode[IFELSE] = prevIf;
            } else if (newOption) {
              this.nextNode.parentNode.insertBefore(this.node, this.nextNode);
              this.nextNode[IFELSE] = true;
            }
            this.options.prevIf = prevIf;
            this.options.elseIf = newOption;
          }
        }
      }
    }]);

    return ElementUpdater;
  }(Updater);

  var EventUpdater = function (_Updater3) {
    _inherits(EventUpdater, _Updater3);

    /**
     * @param {Element} node
     * @param {AttributeExpression} expression 
     */
    function EventUpdater(node, eventName) {
      _classCallCheck(this, EventUpdater);

      var _this7 = _possibleConstructorReturn(this, (EventUpdater.__proto__ || Object.getPrototypeOf(EventUpdater)).call(this));

      _this7.node = node;
      _this7.eventName = eventName;
      _this7.oldListener = null;
      node.removeAttribute('on' + eventName);
      return _this7;
    }

    /**
     * @param {((event:Event) => void)[]} newListener 
     */


    _createClass(EventUpdater, [{
      key: 'update',
      value: function update(newListener) {
        newListener = newListener[0];
        if (newListener === this.oldListener) return;
        if (this.oldListener) this.node.removeEventListener(this.eventName, this.oldListener);
        if (newListener) this.node.addEventListener(this.eventName, newListener);
        this.oldListener = newListener;
      }
    }]);

    return EventUpdater;
  }(Updater);

  /**
   * @param {any[]} items
   * @param {(item: any, index: number) => LitTag} mapFn 
   */


  function repeat(items, mapFn) {
    return new Repeat(items, mapFn);
  }

  var Repeat = function () {
    /**
     * @param {any[]} items
     * @param {(item: any, index: number) => LitTag} mapFn 
     */
    function Repeat(items, mapFn) {
      _classCallCheck(this, Repeat);

      this.items = items;
      this.mapFn = mapFn;
    }

    /**
     * @param {Node[]} oldElements 
     * @param {Node} prevNode 
     * @param {Node} nextNode 
     */


    _createClass(Repeat, [{
      key: 'update',
      value: function update(oldElements, prevNode, nextNode) {
        var parentNode = nextNode.parentNode;
        var length = this.items.length;
        for (var index = 0; index < length; index++) {
          var litTag = this.mapFn(this.items[index]);
          var _oldElement = oldElements.shift();
          if (_oldElement) litTag.render(_oldElement);else {
            parentNode.insertBefore(litTag.compile().element, nextNode);
          }
        }
        var oldElement = void 0;
        while (oldElement = oldElements.shift()) {
          parentNode.removeChild(oldElement);
        }
      }
    }]);

    return Repeat;
  }();

  var ContentUpdater = function (_Updater4) {
    _inherits(ContentUpdater, _Updater4);

    /**
     * @param {Node} node
     */
    function ContentUpdater(node) {
      _classCallCheck(this, ContentUpdater);

      var _this8 = _possibleConstructorReturn(this, (ContentUpdater.__proto__ || Object.getPrototypeOf(ContentUpdater)).call(this));

      if (node.previousSibling == null) node.parentNode.insertBefore(document.createTextNode(''), node);

      if (node.nextSibling == null) node.parentNode.appendChild(document.createTextNode(''));

      _this8.prevNode = node.previousSibling;
      _this8.nextNode = node.nextSibling;
      return _this8;
    }

    /**
     * @returns {Node[]}
     */


    _createClass(ContentUpdater, [{
      key: 'update',
      value: function update(newValues) {
        var newValue = newValues[0];
        var oldElement = this.prevNode.nextSibling;

        if (newValue instanceof LitTag) newValue.render(oldElement);else if (newValue instanceof Repeat) newValue.update(this.oldElements, this.prevNode, this.nextNode);else if (newValue + '' !== oldElement.nodeValue) oldElement.nodeValue = newValue;
      }
    }, {
      key: 'oldElements',
      get: function get() {
        var content = this.prevNode.nextSibling;
        var oldElements = [];
        while (content !== this.nextNode) {
          oldElements.push(content);
          content = content.nextSibling;
        }
        return oldElements;
      }
    }]);

    return ContentUpdater;
  }(Updater);

  var templateCache = new List();

  /**
   * @param {TemplateStringsArray} staticParts 
   */
  function requestTemplate(staticParts) {
    /**
     * @type {Template}
     */
    var cachedTemplate = templateCache.get(staticParts);
    if (cachedTemplate) return cachedTemplate;else {
      var newTemplate = new Template(staticParts);
      templateCache.set(staticParts, newTemplate);
      return newTemplate;
    }
  }

  var Template = function () {
    /**
     * @param {TemplateStringsArray} staticParts 
     */
    function Template(staticParts) {
      _classCallCheck(this, Template);

      /**
       * @type {Expression[]}
       */
      var templateParts = [];
      var templateElm = document.createElement('template');
      templateElm.innerHTML = staticParts.join(MARKER);

      /**
       * About the doAfterWalkTree,
       * when you want to modify the DOM Tree
       * you have to do it after the walkDomTree
       * or else walkDomTree will stop.
       */
      var doAfterWalkTree = [];
      walkDomTree(templateElm.content, function (node) {
        var fragment = document.createDocumentFragment();
        var staticParts = node.nodeValue.replace(new RegExp(MARKER, 'g'), MARKER + PLACEHOLDER + MARKER).split(MARKER);
        var length = staticParts.length;
        for (var index = 0; index < length; index++) {
          fragment.appendChild(document.createTextNode(staticParts[index]));
        }
        doAfterWalkTree.push(function () {
          node.parentNode.replaceChild(fragment, node);
        });
      }, {
        whatToShow: 4 /* NodeFilter.SHOW_TEXT */
        , acceptNode: function acceptNode(node) {
          return node.nodeValue.indexOf(MARKER) !== -1 ? 1 /* NodeFilter.FILTER_ACCEPT */
          : 3; /* NodeFilter.FILTER_SKIP */
        }
      });
      doAfterWalkTree.forEach(function (fn) {
        return fn();
      });

      walkDomTree(templateElm.content, function (node, nodeIndex) {
        if (node.nodeType === 3 /* Node.TEXT_NODE */) return templateParts.push(new ContentExpression(nodeIndex));

        var length = node.attributes.length;
        for (var index = 0; index < length; index++) {
          var attribute = node.attributes.item(index);

          if (attribute.name === MARKER) templateParts.push(new ElementExpression(nodeIndex));else if (attribute.name.slice(0, 2) === 'on') templateParts.push(new EventExpression(nodeIndex, attribute.name.slice(2)));else if (attribute.nodeValue.indexOf(MARKER) !== -1) templateParts.push(new AttributeExpression(nodeIndex, attribute.name, attribute.nodeValue.split(MARKER)));
        }
      }, {
        acceptNode: function acceptNode(node) {
          if (node.nodeType === 3 /* Node.TEXT_NODE */) return node.nodeValue === PLACEHOLDER ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3; /* NodeFilter.FILTER_SKIP */
          else return node.hasAttributes() ? 1 /* NodeFilter.FILTER_ACCEPT */
            : 3; /* NodeFilter.FILTER_SKIP */
        }
      });

      this.staticParts = staticParts;
      this.templateElm = templateElm;
      this.templateParts = templateParts;
    }

    _createClass(Template, [{
      key: 'create',
      value: function create() {
        var _this9 = this;

        var partUpdaters = [];
        var element = document.importNode(this.templateElm.content, true);

        walkDomTree(element, function (node, nodeIndex, stop) {

          var length = _this9.templateParts.length;

          for (var index = 0; index < length; index++) {
            var expression = _this9.templateParts[index];

            if (expression.nodeIndex !== nodeIndex) continue;

            if (expression instanceof ContentExpression) partUpdaters.push(new ContentUpdater(node));else if (expression instanceof AttributeExpression) partUpdaters.push(new AttributeUpdater(node.attributes.getNamedItem(expression.attributeName), expression.staticParts));else if (expression instanceof ElementExpression) partUpdaters.push(new ElementUpdater(node));else if (expression instanceof EventExpression) partUpdaters.push(new EventUpdater(node, expression.eventName));
          }
        }, {
          acceptNode: function acceptNode(node) {
            if (node.nodeType === 3 /* Node.TEXT_NODE */) return node.nodeValue === PLACEHOLDER ? 1 /* NodeFilter.FILTER_ACCEPT */
              : 3; /* NodeFilter.FILTER_SKIP */
            else return node.hasAttributes() ? 1 /* NodeFilter.FILTER_ACCEPT */
              : 3; /* NodeFilter.FILTER_SKIP */
          }
        });

        return new TemplateInstance(this.staticParts, element.children.item(0), partUpdaters);
      }
    }]);

    return Template;
  }();

  var TemplateInstance = function () {
    /**
     * @param {TemplateStringsArray} staticParts 
     * @param {Node} element 
     * @param {Updater[]} partUpdaters 
     */
    function TemplateInstance(staticParts, element, partUpdaters) {
      _classCallCheck(this, TemplateInstance);

      this.staticParts = staticParts;
      this.element = element;
      this.partUpdaters = partUpdaters;
    }

    /**
     * @param {any[]} expressions 
     */


    _createClass(TemplateInstance, [{
      key: 'update',
      value: function update(expressions) {
        var startIndex = 0;
        var index = 0;
        var updater = void 0;
        while (updater = this.partUpdaters[index++]) {
          updater.update(expressions.slice(startIndex, startIndex += updater.numberOfPart));
        }
      }
    }]);

    return TemplateInstance;
  }();

  var LitTag = function () {
    /**
     * @param {TemplateStringsArray} staticParts 
     * @param {any[]} dymanicParts 
     */
    function LitTag(staticParts, dymanicParts) {
      _classCallCheck(this, LitTag);

      this.staticParts = staticParts;
      this.dymanicParts = dymanicParts;
    }

    /**
     * @param {TemplateInstance} instance 
     */


    _createClass(LitTag, [{
      key: 'verify',
      value: function verify(instance) {
        return this.staticParts === instance.staticParts;
      }
    }, {
      key: 'compile',
      value: function compile() {
        var instance = requestTemplate(this.staticParts).create();
        instance.element[INSTANCE] = instance;
        instance.update(this.dymanicParts);
        return instance;
      }

      /**
       * @param {Node} container
       */

    }, {
      key: 'render',
      value: function render(container) {
        /** @type {TemplateInstance} */
        var instance = container[INSTANCE];
        if (instance instanceof TemplateInstance && this.verify(instance)) {
          instance.update(this.dymanicParts);
        } else {
          container.parentNode.replaceChild(this.compile().element, container);
        }
      }
    }]);

    return LitTag;
  }();

  /**
   * @param {TemplateStringsArray} staticParts 
   * @param {any[]} dynamicParts
   */


  function html(staticParts) {
    for (var _len = arguments.length, dynamicParts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      dynamicParts[_key - 1] = arguments[_key];
    }

    return new LitTag(staticParts, dynamicParts);
  }

  exports.html = html;
  exports.repeat = repeat;

  Object.defineProperty(exports, '__esModule', { value: true });
});