import { html } from './html.js'

import { addNodeType } from './structure/1_nodetype/nodetype.js'
import { ElementNodeType } from './structure/1_nodetype/element.js'
import { TextNodeType } from './structure/1_nodetype/text.js'

import { addExpressionFor } from './structure/2_expression/expression.js'
import { AttributeExpression } from './structure/2_expression/attribute.js'
import { ContentExpression } from './structure/2_expression/content.js'
import { ElementExpression } from './structure/2_expression/element.js'

import { addUpdaterFor } from './structure/3_updater/updater.js'
import { AttributeUpdater } from './structure/3_updater/attribute.js'
import { ContentUpdater } from './structure/3_updater/content.js'
import { ElementUpdater } from './structure/3_updater/element.js'
import { EventUpdater } from './structure/3_updater/event.js'

import { repeat } from './structure/4_directive/repeat.js'

/** the sequence affects the results */

addNodeType(ElementNodeType)
addNodeType(TextNodeType)

addExpressionFor(ElementNodeType, AttributeExpression)
addExpressionFor(ElementNodeType, ElementExpression)
addExpressionFor(TextNodeType, ContentExpression)

addUpdaterFor(AttributeExpression, EventUpdater)
addUpdaterFor(AttributeExpression, AttributeUpdater)
addUpdaterFor(ContentExpression, ContentUpdater)
addUpdaterFor(ElementExpression, ElementUpdater)

export { html, repeat }
