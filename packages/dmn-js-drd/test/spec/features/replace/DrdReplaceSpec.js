'use strict';

require('../../../TestHelper');

/* global bootstrapModeler, inject */

var modelingModule = require('../../../../lib/features/modeling'),
    replaceModule = require('../../../../lib/features/replace'),
    moveModule = require('diagram-js/lib/features/move'),
    coreModule = require('../../../../lib/core');

var is = require('dmn-js-shared/lib/util/ModelUtil').is;


describe('features/replace - drd replace', function() {

  var testModules = [
    coreModule,
    modelingModule,
    replaceModule,
    moveModule
  ];


  describe('should replace', function() {

    var diagramXML = require('./replace.dmn');

    beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));


    it('decision table', inject(function(elementRegistry, drdReplace) {

      // given
      var decision = elementRegistry.get('decision');

      var newElementData =  {
        type: 'dmn:Decision',
        table: true,
        expression: false
      };

      // when
      var newElement = drdReplace.replaceElement(decision, newElementData);

      // then
      var businessObject = newElement.businessObject;

      expect(newElement).to.exist;
      expect(is(businessObject, 'dmn:Decision')).to.be.true;
      expect(businessObject.decisionTable).to.exist;
      expect(businessObject.decisionTable.output[0].id).to.exist;
    }));


    it('literal expression', inject(function(elementRegistry, drdReplace) {

      // given
      var decision = elementRegistry.get('decision');

      var newElementData =  {
        type: 'dmn:Decision',
        table: false,
        expression: true
      };

      // when
      var newElement = drdReplace.replaceElement(decision, newElementData);

      // then
      var businessObject = newElement.businessObject;

      expect(newElement).to.exist;
      expect(is(businessObject, 'dmn:Decision')).to.be.true;
      expect(businessObject.decisionTable).to.not.exist;
      expect(businessObject.literalExpression).to.exist;
    }));


    it('nothing', inject(function(elementRegistry, drdReplace) {

      // given
      var decision = elementRegistry.get('table');

      var newElementData =  {
        type: 'dmn:Decision',
        table: false,
        expression: false
      };

      // when
      var newElement = drdReplace.replaceElement(decision, newElementData);

      // then
      var businessObject = newElement.businessObject;

      expect(newElement).to.exist;
      expect(is(businessObject, 'dmn:Decision')).to.be.true;
      expect(businessObject.decisionTable).to.not.exist;
      expect(businessObject.literalExpression).to.not.exist;
    }));


    it('should undo', inject(function(elementRegistry, drdReplace, commandStack) {

      // given
      var decision = elementRegistry.get('table');

      var newElementData =  {
        type: 'dmn:Decision',
        table: false,
        expression: true
      };
      var newElement = drdReplace.replaceElement(decision, newElementData);

      // when
      commandStack.undo();

      // then
      var businessObject = elementRegistry.get('table').businessObject;

      expect(newElement).to.exist;
      expect(is(businessObject, 'dmn:Decision')).to.be.true;
      expect(businessObject.decisionTable).to.exist;
      expect(businessObject.literalExpression).to.not.exist;
    }));


    it('should redo', inject(function(elementRegistry, drdReplace, commandStack) {

      // given
      var decision = elementRegistry.get('table');

      var newElementData =  {
        type: 'dmn:Decision',
        table: false,
        expression: true
      };
      var newElement = drdReplace.replaceElement(decision, newElementData);

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      var businessObject = elementRegistry.get('table').businessObject;

      expect(newElement).to.exist;
      expect(is(businessObject, 'dmn:Decision')).to.be.true;
      expect(businessObject.decisionTable).to.not.exist;
      expect(businessObject.literalExpression).to.exist;
    }));
  });


  describe('should work with text annotations', function() {

    var diagramXML = require('./textAnnotation.dmn');

    beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));

    it('should keep references for associations', inject(function(elementRegistry, drdReplace) {
      // given
      var decision = elementRegistry.get('decision');

      var newElementData =  {
        type: 'dmn:Decision',
        table: true,
        expression: false
      };

      // when
      drdReplace.replaceElement(decision, newElementData);

      // then
      var association = elementRegistry.filter(function(element) {
        return element.type === 'dmn:Association';
      })[0];

      expect(association.businessObject.sourceRef.href).to.eql('#decision');
      expect(association.businessObject.extensionElements.values[0].source).to.eql('decision');
    }));


    it('should undo', inject(function(elementRegistry, drdReplace, commandStack) {
      // given
      var decision = elementRegistry.get('decision');

      var newElementData =  {
        type: 'dmn:Decision',
        table: true,
        expression: false
      };
      drdReplace.replaceElement(decision, newElementData);

      // when
      commandStack.undo();

      // then
      var association = elementRegistry.filter(function(element) {
        return element.type === 'dmn:Association';
      })[0];

      expect(association.businessObject.sourceRef.href).to.eql('#decision');
      expect(association.businessObject.extensionElements.values[0].source).to.eql('decision');
    }));


    it('should redo', inject(function(elementRegistry, drdReplace, commandStack) {
      // given
      var decision = elementRegistry.get('decision');

      var newElementData =  {
        type: 'dmn:Decision',
        table: true,
        expression: false
      };
      drdReplace.replaceElement(decision, newElementData);

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      var association = elementRegistry.filter(function(element) {
        return element.type === 'dmn:Association';
      })[0];

      expect(association.businessObject.sourceRef.href).to.eql('#decision');
      expect(association.businessObject.extensionElements.values[0].source).to.eql('decision');
    }));


  });
});
