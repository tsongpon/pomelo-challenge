'use strict';

exports.process = (input) => {
    const nodes = Object.values(input).flat();
    const idMap = nodes.reduce((result, each, i) => {
        result[each.id] = i;
        return result;
    }, {});

    let root = {};
    nodes.forEach(each => {
        if (each.parent_id === null) {
            root = each;
            return;
        }
        const parentNode = nodes[idMap[each.parent_id]];
        parentNode.children = [...(parentNode.children || []), each];
    });

    return root;
}