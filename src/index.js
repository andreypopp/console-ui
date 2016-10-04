/**
 * @flow
 */

import invariant from 'invariant';
import wrapString from 'word-wrap';
import color from 'cli-color';

type InlineElement
  = string
  | Array<InlineElement>;

type Element
  = {type: 'paragraph', children: InlineElement}
  | {type: 'indent', children: Element}
  | {type: 'listItem', children: Element}
  | string
  | Array<Element>;

type Options = {
  indentSize: number;
};

type Context = {
  width: number;
  indent: number;
};

const DEFAULT_OPTIONS = {
  indentSize: 2,
};

const INITIAL_CONTEXT = {
  indent: 0,
  width: 200,
};

export let text = color;

export function paragraph(...children: Array<InlineElement>) {
  return {type: 'paragraph', children};
}

export function indent(...children: Array<Element>) {
  return {type: 'indent', children};
}

export function listItem(...children: Array<Element>) {
  return {type: 'listItem', children};
}

export function format(...element: Array<Element>): string {
  return _format(INITIAL_CONTEXT, element, DEFAULT_OPTIONS).trimRight();
}

export function print(...element: Array<Element>): void {
  console.log(format(...element)); // eslint-disable-line no-console
}

function _format(context: Context, element: Element, options: Options): string {
  if (typeof element === 'string') {
    element = paragraph(element);
  }
  if (Array.isArray(element)) {
    return element
      .map(element => _format(context, element, options))
      .join('');
  } else if (element.type === 'paragraph') {
    let text = _formatInline(element.children);
    return wrapString(text, {
      width: context.width,
      indent: _formatIndent(context.indent),
    }) + '\n\n';
  } else if (element.type === 'indent') {
    let nextContext = {...context, indent: context.indent + options.indentSize};
    return _format(nextContext, element.children, options);
  } else if (element.type === 'listItem') {
    let out = _format(context, indent(element.children), options);
    out = '- ' + out.slice(2);
    return out;
  } else {
    invariant(false, 'Unknown element: %s', element);
  }
}

function _formatInline(element: InlineElement): string {
  if (Array.isArray(element)) {
    return element.map(_formatInline).join('');
  } else if (typeof element === 'string') {
    return element;
  } else {
    invariant(false, 'Unknown inline element: %s', element);
  }
}

function _formatIndent(size) {
  return (new Array(size)).fill(' ').join('');
}
