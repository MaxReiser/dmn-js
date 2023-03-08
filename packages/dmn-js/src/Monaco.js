import monaco from 'monaco-editor';

export function editXmlWithMonaco(xml) {
    const editor = monaco.editor.create(document.getElementById('container'), {
        value: xml,
        language: 'xml',
        theme: 'vs-dark',
        automaticLayout: true
    });
    editor.onDidChangeModelContent((event) => {
        console.log('event', event);
        console.log('editor.getValue()', editor.getValue());
    }
    );
    xml = editor.getValue();
    console.log('xml', xml);
    return xml;
}