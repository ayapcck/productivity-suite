import { LinkedList } from '../utilities/dataStructures';

const parseListContentFromDOM = (noteId) => {
    const note = document.getElementById(noteId);
    const listItems = note.getElementsByClassName("listItem");
    let content = '';
    _.forEach(listItems, listItem => {
        content = `${content},${listItem.innerText}`;
    });
    content = content.slice(1);
    return content;
};

const parseNoteContentFromDOM = (noteId) => {
    const note = document.getElementById(noteId);
    let noteContent = note.getElementsByClassName("noteContent")[0].innerText;
    noteContent = noteContent.replace(/\n/g, '\\n');
    return noteContent;
}

const parseNote = (note) => {
    return { 
        id: note.id,
        name: note.name, 
        type: note.noteType,
        content: note.content !== null && note.content.replace(/\\n/g, '\n')
    };
};

const parseList = (list) => {
    const listItems = new LinkedList();
    list.content 
        ? _.forEach(list.content.split(','), (content, index) => {
            listItems.add({id: `LI${index}`, content: content});
        })
        : listItems.add({id: `LI0`, content: list.content});
    return { id: list.id, name: list.name, type: list.noteType, listItems };
};

export const NoteTypes = {
    'list': {
        getContent: (noteId) => parseListContentFromDOM(noteId),
        parse: (list) => parseList(list)
    },
    'note': {
        getContent: (noteId) => parseNoteContentFromDOM(noteId),
        parse: (note) => parseNote(note)
    }
};