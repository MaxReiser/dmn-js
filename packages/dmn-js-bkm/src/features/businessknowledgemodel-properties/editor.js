import BKMPropertiesEditor from './BKMPropertiesEditor';
import DebounceInput from 'dmn-js-shared/lib/features/debounce-input';

export default {
  __depends__: [ DebounceInput ],
  __init__: [ 'bkmProperties' ],
  decisionProperties: [ 'type', BKMPropertiesEditor ]
};