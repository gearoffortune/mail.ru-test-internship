import { storiesOf } from '@storybook/html';
import '../dist/main.js';

storiesOf('MaskedNumber', module)
  .add('for tests', () => {
    return '<masked-input mask="+7(985)333-II-**"></masked-input>';
  });
