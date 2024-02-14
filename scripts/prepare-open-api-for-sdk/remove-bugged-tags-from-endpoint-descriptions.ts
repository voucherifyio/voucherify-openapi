export const removeBuggedTagsFromEndpointDescriptions = (paths: any) => {

    Object.keys(paths).forEach(key => {
        Object.keys(paths[key]).forEach(method => {
            let description = paths[key][method].description

            if(!description){
                return
            }

            description = removeUnnecessarilyHtmlTag(description);
            description = removeTable(description);
            description = reduceMultipleAndWrongNewLineElements(description);
            description = removeLinks(description);


            paths[key][method].description = description
        })
    })

    return paths
}

const removeUnnecessarilyHtmlTag = (description: string) => {
    return description
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/##/g, '#');
}

const removeTable = (description: string) => {
    return description.replace(/\|.*\|/g, '')
}

const reduceMultipleAndWrongNewLineElements = (description: string) => {
    return description
        .replace(/(?<!\r)\n\|/g, '\n')
        .replace(/(?<!\r)\n>/g, '\n')
        .replace(/(?<!\r)\n\n\n/g, '\n')
        .replace(/(?<!\r)\n\n/g, '\n')
        .replace(/(?<!\r)\n/g, '\n');
}

const removeLinks = (description: string) => {
    const matches = description.match(/\[(.*?)\]\(ref:(.*?)\)/g)

    if(matches && matches.length > 0){
        matches.forEach((match: any) => {

            const replacement = match.match(/\[([^\]]+)\]/);
            description = description.replace(match, replacement ? replacement[1] : '')
        })
    }

    return description
}
