import BKMPropertiesEditorComponent
  from './components/BKMPropertiesEditorComponent';

const HIGH_PRIORITY = 1500;

export default class BKMPropertiesEditor {
  constructor(components) {
    components.onGetComponent('viewer', HIGH_PRIORITY, () => {
      return BKMPropertiesEditorComponent;
    });
  }
}

BKMPropertiesEditor.$inject = [ 'components' ];