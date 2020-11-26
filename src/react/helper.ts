/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function isHtmlProp(prop: string){
  const whiteList = ['accept', 'acceptCharset', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'as', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'charSet', 'challenge', 'checked', 'cite', 'classID', 'cols', 'colSpan', 'content', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'disabled', 'download', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'integrity', 'keyParams', 'keyType', 'kind', 'label', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'nonce', 'noValidate', 'open', 'optimum', 'pattern', 'placeholder', 'playsInline', 'poster', 'preload', 'readOnly', 'rel', 'required', 'reversed', 'rows', 'rowSpan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'summary', 'target', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap']
  return whiteList.includes(prop)
}

export function getValidHtmlProp(props: any){
  const p:Record<string,any> = {}
  Object.entries(props)
    .forEach(([key, value]) => {
      if(isHtmlProp(key)){
        p[key] = value
      }
    })
    return p
}