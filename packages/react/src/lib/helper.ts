/* eslint-disable @typescript-eslint/no-explicit-any */

import { componentDirectivesToClassNames } from 'semantic-tailwind-core'
import { ComponentData } from 'semantic-tailwind-core/dist/types/component-data'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function isHtmlProp (prop: string) {
  const whiteList = ['defaultChecked', 'defaultValue', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'accept', 'acceptCharset', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'as', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'charSet', 'challenge', 'checked', 'cite', 'classID', 'cols', 'colSpan', 'content', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'disabled', 'download', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'integrity', 'keyParams', 'keyType', 'kind', 'label', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'nonce', 'noValidate', 'open', 'optimum', 'pattern', 'placeholder', 'playsInline', 'poster', 'preload', 'readOnly', 'rel', 'required', 'reversed', 'rows', 'rowSpan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'summary', 'target', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap']
  return whiteList.includes(prop)
}

export function isDomAttribute (prop: string) {
  return /on[A-Z]{1}\w+/.test(prop)
}

export function getValidHtmlProp (props: any) {
  const p:Record<string, any> = {}
  Object.entries(props)
    .forEach(([key, value]) => {
      if (key === 'className' || isHtmlProp(key) || isDomAttribute(key)) {
        p[key] = value
      }
    })
  return p
}

export function prepareComponentProps (props: any, data:ComponentData) {
  const { className = '', as: renderAs, ...rest } = props
  const cls = componentDirectivesToClassNames(data, rest, className)
  return { className: cls, ...rest }
}
