import { Component } from 'inferno';

import EditableComponent from 'dmn-js-shared/lib/components/EditableComponent';


export default class BKMPropertiesEditorComponent extends Component {

  constructor(props, context) {
    super(props, context);

    this._viewer = context.injector.get('viewer');
    this._modeling = context.injector.get('modeling');

    this.setupChangeListeners({
      bind: this.getBKM().id
    });
  }

  componentWillUnmount() {
    this.setupChangeListeners({
      unbind: this.getBKM().id
    });
  }

  getBKM() {
    return this._viewer.getBKM();
  }

  onElementsChanged = () => {
    this.forceUpdate();
  };

  setupChangeListeners({ bind, unbind }) {

    const {
      changeSupport
    } = this.context;

    if (typeof unbind === 'string') {
      changeSupport.offElementsChanged(unbind, this.onElementsChanged);
    }

    if (typeof bind === 'string') {
      changeSupport.onElementsChanged(bind, this.onElementsChanged);
    }
  }

  setBKMName = (name) => {
    this._modeling.editBKMName(name);
  };

  render() {
    const { name } = this.getBKM();

    return (
      <header className="bkm-properties">
        <BKMName
          className="bkm-name editor"
          value={ name }
          onBlur={ resetScroll }
          onChange={ this.setBKMName } />
      </header>
    );
  }
}

class BKMName extends EditableComponent {

  render() {

    return (
      <h3 className={ this.getClassName() }>
        { this.getEditor() }
      </h3>
    );
  }

}

function resetScroll(event) {
  event.target.scroll(0, 0);
}
