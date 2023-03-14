export default {
  BKM: [
    {
      label: 'add BKM logic to XML',
      actionName: 'copy-BKM-logic-to-xml',
      className: 'dmn-icon-paste',
      target: {
        type: 'dmn:BusinessKnowledgeModel',
        table: false,
        expression: false,
      }
    }
  ],
  DECISION: [
    {
      label: 'Empty',
      actionName: 'replace-with-empty-decision',
      className: 'dmn-icon-clear',
      target: {
        type: 'dmn:Decision',
        table: false,
        expression: false
      }
    },
    {
      label: 'Decision Table',
      actionName: 'replace-with-decision-table',
      className: 'dmn-icon-decision-table',
      target: {
        type: 'dmn:Decision',
        table: true,
        expression: false
      }
    },
    {
      label: 'Literal Expression',
      actionName: 'replace-with-literal-expression',
      className: 'dmn-icon-literal-expression',
      target: {
        type: 'dmn:Decision',
        table: false,
        expression: true
      }
    }
  ]
};
