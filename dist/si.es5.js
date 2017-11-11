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

  var NodeType = function () {
    function NodeType() {
      _classCallCheck(this, NodeType);
    }

    _createClass(NodeType, null, [{
      key: 'filter',
      value: function filter() {}
    }, {
      key: 'map',
      value: function map() {}
    }]);

    return NodeType;
  }();

  var nodetypeList = [];

  /**
   * @return {(typeof NodeType)[]}
   */
  function getNodeTypes() {
    return nodetypeList;
  }

  /**
   * @param {typeof NodeType} NodeTypeBase
   */
  function addNodeType(NodeTypeBase) {
    nodetypeList.push(NodeTypeBase);
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

  var Expression = function () {
    _createClass(Expression, [{
      key: 'filter',
      value: function filter() {}

      /**
       * @param {number} nodeIndex 
       */

    }]);

    function Expression(nodeIndex) {
      _classCallCheck(this, Expression);

      this.nodeIndex = nodeIndex;
    }

    return Expression;
  }();

  var expressionList = new List();

  /**
   * @param {number} nodeTypeBase
   * @return {(typeof Expression)[]}
   */
  function getExpressionsFor(nodeTypeBase) {
    return expressionList.get(nodeTypeBase);
  }

  /**
   * @param {number} nodeTypeBase
   * @param {typeof Expression} expressionBase
   */
  function addExpressionFor(nodeTypeBase, expressionBase) {
    var directives = getExpressionsFor(nodeTypeBase);
    if (Array.isArray(directives)) directives.push(expressionBase);else expressionList.set(nodeTypeBase, [expressionBase]);
  }

  var Updater = function () {
    function Updater() {
      _classCallCheck(this, Updater);
    }

    _createClass(Updater, [{
      key: 'update',
      value: function update() {}
    }], [{
      key: 'filter',
      value: function filter() {}
    }, {
      key: 'map',
      value: function map() {}
    }]);

    return Updater;
  }();

  var updaterList = new List();

  /**
   * @param {typeof Expression} expressionBase
   * @return {(typeof Updater)[]}
   */
  function getUpdatersFor(expressionBase) {
    return updaterList.get(expressionBase);
  }

  /**
   * @param {typeof Expression} expressionBase
   * @param {typeof Updater} updater
   */
  function addUpdaterFor(expressionBase, updater) {
    var updaters = getUpdatersFor(expressionBase);
    if (Array.isArray(updaters)) updaters.push(updater);else updaterList.set(expressionBase, [updater]);
  }

  var MARKER = '__sijs_marker__';
  var PLACEHOLDER = '__sijs_placeholder__';
  var INSTANCE = '__sijs_instance__';

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
        if (node.nodeValue.indexOf(MARKER) === -1) return;
        var fragment = document.createDocumentFragment();
        var staticParts = node.nodeValue.split(MARKER).join(MARKER + PLACEHOLDER + MARKER).split(MARKER).map(function (text) {
          return document.createTextNode(text);
        }).forEach(function (textNode) {
          fragment.appendChild(textNode);
        });
        doAfterWalkTree.push(function () {
          node.parentNode.replaceChild(fragment, node);
        });
      }, {
        whatToShow: NodeFilter.SHOW_TEXT,
        acceptNode: function acceptNode(node) {
          if (node.nodeValue.indexOf(MARKER) !== -1) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      });

      doAfterWalkTree.forEach(function (fn) {
        return fn();
      });

      walkDomTree(templateElm.content, function (node, nodeIndex) {
        var NodeTypeBase = getNodeTypes().find(function (NodeTypeBase) {
          return NodeTypeBase.filter(node);
        });

        if (!(NodeTypeBase && NodeTypeBase.prototype instanceof NodeType)) return;

        NodeTypeBase.map(node, nodeIndex, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var ExpressionBase = getExpressionsFor(NodeTypeBase).find(function (ExpressionBase) {
            return ExpressionBase.filter.apply(ExpressionBase, args);
          });

          if (!(ExpressionBase && ExpressionBase.prototype instanceof Expression)) return;

          templateParts.push(new (Function.prototype.bind.apply(ExpressionBase, [null].concat([nodeIndex], args)))());
        });
      });

      this.templateElm = templateElm;
      this.templateParts = templateParts;
    }

    _createClass(Template, [{
      key: 'create',
      value: function create() {
        var _this = this;

        var partUpdaters = [];
        var element = document.importNode(this.templateElm.content, true);
        var partIndex = 0;
        var expression = this.templateParts[partIndex];

        var doAfterWalkTree = [];

        walkDomTree(element, function (node, nodeIndex, stop) {
          if (!expression) return stop();
          if (expression.nodeIndex !== nodeIndex) return;

          var UpdaterBase = getUpdatersFor(expression.constructor).find(function (UpdaterBase) {
            return UpdaterBase.filter(expression);
          });

          if (!(UpdaterBase && UpdaterBase.prototype instanceof Updater)) return;

          partUpdaters.push(new UpdaterBase(node, expression));

          expression = _this.templateParts[++partIndex];
        });

        doAfterWalkTree.forEach(function (fn) {
          return fn();
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
    for (var _len2 = arguments.length, dynamicParts = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      dynamicParts[_key2 - 1] = arguments[_key2];
    }

    return new LitTag(staticParts, dynamicParts);
  }

  var ElementNodeType = function (_NodeType) {
    _inherits(ElementNodeType, _NodeType);

    function ElementNodeType() {
      _classCallCheck(this, ElementNodeType);

      return _possibleConstructorReturn(this, (ElementNodeType.__proto__ || Object.getPrototypeOf(ElementNodeType)).apply(this, arguments));
    }

    _createClass(ElementNodeType, null, [{
      key: 'filter',

      /**
       * @param {Node} node 
       */
      value: function filter(node) {
        return node.nodeType === Node.ELEMENT_NODE && node.hasAttributes();
      }

      /**
       * @param {Node} node
       * @param {Function} node
       */

    }, {
      key: 'map',
      value: function map(node, nodeIndex, mapFn) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = node.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var attribute = _step.value;
            mapFn(attribute);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }]);

    return ElementNodeType;
  }(NodeType);

  var TextNodeType = function (_NodeType2) {
    _inherits(TextNodeType, _NodeType2);

    function TextNodeType() {
      _classCallCheck(this, TextNodeType);

      return _possibleConstructorReturn(this, (TextNodeType.__proto__ || Object.getPrototypeOf(TextNodeType)).apply(this, arguments));
    }

    _createClass(TextNodeType, null, [{
      key: 'filter',

      /**
       * @param {Node} node 
       */
      value: function filter(node) {
        return node.nodeType === Node.TEXT_NODE && node.nodeValue === PLACEHOLDER;
      }

      /**
       * @param {Node} node
       * @param {Function} node
       */

    }, {
      key: 'map',
      value: function map(node, nodeIndex, mapFn) {
        mapFn();
      }
    }]);

    return TextNodeType;
  }(NodeType);

  var AttributeExpression = function (_Expression) {
    _inherits(AttributeExpression, _Expression);

    _createClass(AttributeExpression, null, [{
      key: 'filter',

      /**
       * @param {Attr} attribute 
       */
      value: function filter(attribute) {
        return attribute.value.indexOf(MARKER) !== -1;
      }

      /**
       * @param {number} nodeIndex
       * @param {Attr} attribute 
       */

    }]);

    function AttributeExpression(nodeIndex, attribute) {
      _classCallCheck(this, AttributeExpression);

      var _this4 = _possibleConstructorReturn(this, (AttributeExpression.__proto__ || Object.getPrototypeOf(AttributeExpression)).call(this, nodeIndex));

      _this4.attributeName = attribute.name;
      _this4.staticParts = attribute.value.split(MARKER);
      return _this4;
    }

    return AttributeExpression;
  }(Expression);

  var ContentExpression = function (_Expression2) {
    _inherits(ContentExpression, _Expression2);

    _createClass(ContentExpression, null, [{
      key: 'filter',
      value: function filter() {
        return true;
      }

      /**
       * @param {number} nodeIndex 
       */

    }]);

    function ContentExpression(nodeIndex) {
      _classCallCheck(this, ContentExpression);

      return _possibleConstructorReturn(this, (ContentExpression.__proto__ || Object.getPrototypeOf(ContentExpression)).call(this, nodeIndex));
    }

    return ContentExpression;
  }(Expression);

  var ElementExpression = function (_Expression3) {
    _inherits(ElementExpression, _Expression3);

    _createClass(ElementExpression, null, [{
      key: 'filter',

      /**
       * @param {Attr} attribute 
       */
      value: function filter(attribute) {
        return attribute.name === MARKER;
      }

      /**
       * @param {number} nodeIndex 
       */

    }]);

    function ElementExpression(nodeIndex) {
      _classCallCheck(this, ElementExpression);

      return _possibleConstructorReturn(this, (ElementExpression.__proto__ || Object.getPrototypeOf(ElementExpression)).call(this, nodeIndex));
    }

    return ElementExpression;
  }(Expression);

  var AttributeUpdater = function (_Updater) {
    _inherits(AttributeUpdater, _Updater);

    _createClass(AttributeUpdater, null, [{
      key: 'filter',
      value: function filter() {
        return true;
      }

      /**
       * @param {Node} node 
       * @param {AttributeExpression} expression
       */

    }]);

    function AttributeUpdater(node, expression) {
      _classCallCheck(this, AttributeUpdater);

      var _this7 = _possibleConstructorReturn(this, (AttributeUpdater.__proto__ || Object.getPrototypeOf(AttributeUpdater)).call(this));

      _this7.node = node;
      _this7.attributeName = expression.attributeName;
      _this7.staticParts = expression.staticParts;
      /* @type {string[]}  */
      _this7.oldValues = [];
      _this7.numberOfPart = staticParts.length - 1;
      return _this7;
    }

    /**
     * @param {string[]} newValues 
     */


    _createClass(AttributeUpdater, [{
      key: 'update',
      value: function update(newValues) {
        var _this8 = this;

        if (newValues.findIndex(function (newValue, index) {
          return newValue !== _this8.oldValues[index];
        }) === -1) return;
        var newValueIndex = 0;
        var lastPartIndex = this.numberOfPart;
        var value = this.staticParts.map(function (staticPart, index) {
          if (index === lastPartIndex) return staticPart;
          return staticPart + newValues[newValueIndex++];
        }).join('');
        this.node.setAttribute(this.attributeName, value);
        this.oldValues = newValues;
      }
    }]);

    return AttributeUpdater;
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

  var ContentUpdater = function (_Updater2) {
    _inherits(ContentUpdater, _Updater2);

    _createClass(ContentUpdater, null, [{
      key: 'filter',
      value: function filter() {
        return true;
      }

      /**
       * @param {Node} node
       */

    }]);

    function ContentUpdater(node, expression) {
      _classCallCheck(this, ContentUpdater);

      var _this9 = _possibleConstructorReturn(this, (ContentUpdater.__proto__ || Object.getPrototypeOf(ContentUpdater)).call(this));

      if (node.previousSibling == null) {
        node.parentNode.insertBefore(document.createTextNode(''), node);
      }
      _this9.prevNode = node.previousSibling;
      _this9.nextNode = node.nextSibling;
      _this9.numberOfPart = 1;
      return _this9;
    }

    _createClass(ContentUpdater, [{
      key: 'update',
      value: function update(newValues) {
        var oldElement = this.oldElements[0];
        var newValue = newValues[0];
        if (newValue instanceof LitTag) {
          newValue.render(oldElement);
        } else if (newValue instanceof Repeat) {
          newValue.update(this.oldElements, this.prevNode, this.nextNode);
        } else if ('' + newValues !== this.oldElements[0].nodeValue) {
          oldElement.nodeValue = newValues;
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

  var ElementUpdater = function (_Updater3) {
    _inherits(ElementUpdater, _Updater3);

    _createClass(ElementUpdater, null, [{
      key: 'filter',
      value: function filter() {
        return true;
      }

      /**
       * @param {Element} node 
       */

    }]);

    function ElementUpdater(node) {
      _classCallCheck(this, ElementUpdater);

      var _this10 = _possibleConstructorReturn(this, (ElementUpdater.__proto__ || Object.getPrototypeOf(ElementUpdater)).call(this));

      _this10.node = node;
      _this10.prevNode = node.previousSibling;
      _this10.nextNode = node.nextSibling;
      _this10.options = {};
      _this10.numberOfPart = 1;
      return _this10;
    }

    _createClass(ElementUpdater, [{
      key: 'update',
      value: function update(options) {
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

  var EventUpdater = function (_Updater4) {
    _inherits(EventUpdater, _Updater4);

    _createClass(EventUpdater, null, [{
      key: 'filter',

      /**
       * @param {AttributeExpression} expression 
       */
      value: function filter(expression) {
        return expression.attributeName.slice(0, 2) === 'on';
      }

      /**
       * @param {Element} node 
       * @param {AttributeExpression} expression 
       */

    }]);

    function EventUpdater(node, expression) {
      _classCallCheck(this, EventUpdater);

      var _this11 = _possibleConstructorReturn(this, (EventUpdater.__proto__ || Object.getPrototypeOf(EventUpdater)).call(this));

      _this11.node = node;
      _this11.eventName = expression.attributeName.slice(2);
      _this11.oldListener = null;
      _this11.numberOfPart = 1;
      _this11.node.removeAttribute(expression.attributeName);
      return _this11;
    }

    /**
     * @param {(event:Event) => void} newListener 
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

  /** the sequence affects the results */

  addNodeType(ElementNodeType);
  addNodeType(TextNodeType);

  addExpressionFor(ElementNodeType, AttributeExpression);
  addExpressionFor(ElementNodeType, ElementExpression);
  addExpressionFor(TextNodeType, ContentExpression);

  addUpdaterFor(AttributeExpression, EventUpdater);
  addUpdaterFor(AttributeExpression, AttributeUpdater);
  addUpdaterFor(ContentExpression, ContentUpdater);
  addUpdaterFor(ElementExpression, ElementUpdater);

  exports.html = html;
  exports.repeat = repeat;

  Object.defineProperty(exports, '__esModule', { value: true });
});