import BKMPropertiesComponent from './components/BKMPropertiesComponent';

const HIGH_PRIORITY = 1500;

export default class BKMProperties {
  constructor(components) {
    components.onGetComponent('viewer', HIGH_PRIORITY, () => BKMPropertiesComponent);
  }
}

DecisionProperties.$inject = [ 'components' ];