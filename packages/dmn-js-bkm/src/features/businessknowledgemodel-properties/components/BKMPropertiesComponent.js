import { Component } from 'inferno';


export default class BKMPropertiesComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this._viewer = context.injector.get('viewer');
  }

  render() {

    // there is only one single element
    const { name } = this._viewer.getBKM();

    return (
      <div className="bkm-properties">
        <h3 className="bkm-name">{ name }</h3>
      </div>
    );
  }
}