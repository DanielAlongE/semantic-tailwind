export function getComponentInterface (as: string) {
  const dict = {
    html: ['HTMLAttributes', 'react'],
    button: ['ButtonHTMLAttributes', 'react'],
    a: ['AnchorHTMLAttributes', 'react'],
    audio: ['AudioHTMLAttributes', 'react'],
    video: ['VideoHTMLAttributes', 'react'],
    source: ['SourceHTMLAttributes', 'react'],
    block: ['BlockquoteHTMLAttributes', 'react'],
    details: ['DetailsHTMLAttributes', 'react'],
    dialog: ['DialogHTMLAttributes', 'react'],
    form: ['FormHTMLAttributes', 'react'],
    input: ['InputHTMLAttributes', 'react'],
    label: ['LabelHTMLAttributes', 'react'],
    option: ['OptionHTMLAttributes', 'react'],
    select: ['SelectHTMLAttributes', 'react'],
    textarea: ['TextareaHTMLAttributes', 'react'],
    iframe: ['IframeHTMLAttributes', 'react'],
    img: ['ImgHTMLAttributes', 'react'],
    table: ['TableHTMLAttributes', 'react'],
    td: ['TdHTMLAttributes', 'react'],
    th: ['ThHTMLAttributes', 'react'],
    Button: ['ButtonHTMLAttributes', 'react']
  }

  if (as in dict) {
    return dict.button
  }

  return dict.html
}
