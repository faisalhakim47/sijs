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
        whatToShow = _ref.whatToShow,
        acceptNode = _ref.acceptNode;

    var options = {
      acceptNode: acceptNode || function () {
        return NodeFilter.FILTER_ACCEPT;
      }
    };
    var walker = document.createTreeWalker(dom, whatToShow || NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, options, false);
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

      _this5.attribute = attribute;
      _this5.staticParts = staticParts;
      /* @type {string[]}  */
      _this5.oldValues = [];
      _this5.numberOfPart = staticParts.length - 1;
      return _this5;
    }

    /**
     * @param {string[]} newValues 
     */


    _createClass(AttributeUpdater, [{
      key: 'update',
      value: function update(newValues) {
        var _this6 = this;

        if (newValues.findIndex(function (newValue, index) {
          return newValue !== _this6.oldValues[index];
        }) === -1) return;
        var newValueIndex = 0;
        var lastPartIndex = this.numberOfPart;
        var value = this.staticParts.map(function (staticPart, index) {
          if (index === lastPartIndex) return staticPart;
          return staticPart + newValues[newValueIndex++];
        }).join('');
        this.attribute.value = value;
        this.oldValues = newValues;
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

      var _this7 = _possibleConstructorReturn(this, (ElementUpdater.__proto__ || Object.getPrototypeOf(ElementUpdater)).call(this));

      _this7.node = node;
      _this7.prevNode = node.previousSibling;
      _this7.nextNode = node.nextSibling;
      _this7.options = {};
      return _this7;
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

      var _this8 = _possibleConstructorReturn(this, (EventUpdater.__proto__ || Object.getPrototypeOf(EventUpdater)).call(this));

      _this8.node = node;
      _this8.eventName = eventName;
      _this8.oldListener = null;
      node.removeAttribute('on' + eventName);
      return _this8;
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
     * @param {Node} prevNode 
     * @param {Node} nextNode 
     */


    _createClass(Repeat, [{
      key: 'update',
      value: function update(oldElements, prevNode, nextNode) {
        var parentNode = nextNode.parentNode;
        this.items.map(this.mapFn).forEach(function (litTag) {
          var oldElement = oldElements.shift();
          if (oldElement) litTag.render(oldElement);else {
            var instance = litTag.compile();
            parentNode.insertBefore(instance.element, nextNode);
          }
        });
        oldElements.forEach(function (oldElement) {
          parentNode.removeChild(oldElement);
        });
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

      var _this9 = _possibleConstructorReturn(this, (ContentUpdater.__proto__ || Object.getPrototypeOf(ContentUpdater)).call(this));

      if (node.previousSibling == null) node.parentNode.insertBefore(document.createTextNode(''), node);

      if (node.nextSibling == null) node.parentNode.appendChild(document.createTextNode(''));

      _this9.prevNode = node.previousSibling;
      _this9.nextNode = node.nextSibling;
      return _this9;
    }

    _createClass(ContentUpdater, [{
      key: 'update',
      value: function update(newValues) {
        var oldElement = this.prevNode.nextSibling;
        var newValue = newValues[0];
        if (newValue instanceof LitTag) {
          newValue.render(oldElement);
        } else if (newValue instanceof Repeat) {
          newValue.update(this.oldElements, this.prevNode, this.nextNode);
        } else if ('' + newValue !== this.oldElements[0].nodeValue) {
          oldElement.nodeValue = newValue;
        }
      }
    }, {
      key: 'oldElements',
      get: function get() {
        var content = this.prevNode.nextSibling;
        /**
         * @type {Node[]}
         */
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
    if (cachedTemplate instanceof Template) {
      return cachedTemplate;
    }
    var newTemplate = new Template(staticParts);
    templateCache.set(staticParts, newTemplate);
    return newTemplate;
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
        whatToShow: NodeFilter.SHOW_TEXT,
        acceptNode: function acceptNode(node) {
          return node.nodeValue.indexOf(MARKER) !== -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      doAfterWalkTree.forEach(function (fn) {
        return fn();
      });

      walkDomTree(templateElm.content, function (node, nodeIndex) {
        if (node.nodeType === Node.TEXT_NODE) return templateParts.push(new ContentExpression(nodeIndex));

        var length = node.attributes.length;
        for (var index = 0; index < length; index++) {
          var attribute = node.attributes.item(index);
          if (attribute.name === MARKER) templateParts.push(new ElementExpression(nodeIndex));else if (attribute.name.slice(0, 2) === 'on') templateParts.push(new EventExpression(nodeIndex, attribute.name.slice(2)));else if (attribute.value.indexOf(MARKER) !== -1) templateParts.push(new AttributeExpression(nodeIndex, attribute.name, attribute.value.split(MARKER)));
        }
      }, {
        acceptNode: function acceptNode(node) {
          if (node.nodeType === Node.TEXT_NODE) return node.nodeValue === PLACEHOLDER ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;else return node.hasAttributes() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      });

      this.templateElm = templateElm;
      this.templateParts = templateParts;
    }

    _createClass(Template, [{
      key: 'create',
      value: function create() {
        var _this10 = this;

        var partUpdaters = [];
        var element = document.importNode(this.templateElm.content, true);

        walkDomTree(element, function (node, nodeIndex, stop) {

          _this10.templateParts.filter(function (expression) {
            return expression.nodeIndex === nodeIndex;
          }).forEach(function (expression) {
            if (expression instanceof ContentExpression) partUpdaters.push(new ContentUpdater(node));else if (expression instanceof AttributeExpression) partUpdaters.push(new AttributeUpdater(node.attributes.getNamedItem(expression.attributeName), expression.staticParts));else if (expression instanceof ElementExpression) partUpdaters.push(new ElementUpdater(node));else if (expression instanceof EventExpression) partUpdaters.push(new EventUpdater(node, expression.eventName));
          });
        }, {
          acceptNode: function acceptNode(node) {
            if (node.nodeType === Node.TEXT_NODE) return node.nodeValue === PLACEHOLDER ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;else return node.hasAttributes() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
          }
        });

        return new TemplateInstance(this, element.children.item(0), partUpdaters);
      }
    }]);

    return Template;
  }();

  var TemplateInstance = function () {
    /**
     * @param {Template} template 
     * @param {Node} element 
     * @param {Updater[]} partUpdaters 
     */
    function TemplateInstance(template, element, partUpdaters) {
      _classCallCheck(this, TemplateInstance);

      this.template = template;
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
        this.partUpdaters.forEach(function (updater) {
          updater.update(expressions.slice(startIndex, startIndex += updater.numberOfPart));
        });
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
        return templateCache.get(this.staticParts) === instance.template;
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
        if (container[INSTANCE] instanceof TemplateInstance && this.verify(container[INSTANCE])) {
          var instance = container[INSTANCE];
          instance.update(this.dymanicParts);
        } else {
          var _instance = this.compile();
          container.parentNode.replaceChild(_instance.element, container);
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