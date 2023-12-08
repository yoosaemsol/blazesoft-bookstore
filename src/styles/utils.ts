import { css } from 'styled-components';

// Flexbox
type FlexboxValueOriginal =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'stretch';

type FlexboxValueAbbreviation =
  | 'center'
  | 'end'
  | 'start'
  | 'around'
  | 'between'
  | 'stretch';

type FlexboxValue = FlexboxValueOriginal | FlexboxValueAbbreviation;

function flexValue(value: FlexboxValue) {
  switch (value) {
    case 'center':
      return 'center';
    case 'end':
    case 'flex-end':
      return 'flex-end';
    case 'start':
    case 'flex-start':
      return 'flex-start';
    case 'around':
    case 'space-around':
      return 'space-around';
    case 'between':
    case 'space-between':
      return 'space-between';
    case 'stretch':
      return 'stretch';
  }
}

export function flexbox(
  jc: FlexboxValue = 'center',
  ai: FlexboxValue = 'center'
) {
  return css`
    display: flex;
    align-items: ${flexValue(ai)};
    justify-content: ${flexValue(jc)};
  `;
}

export function inlineFlexbox(
  jc: FlexboxValue = 'center',
  ai: FlexboxValue = 'center'
) {
  return css`
    display: inline-flex;
    justify-content: ${flexValue(jc)};
    align-items: ${flexValue(ai)};
  `;
}

// Scrollbar
export function noScrollbar() {
  return css`
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
      scrollbar-width: none;
    }
  `;
}
