export const removeBuggedTagsFromEndpointDescriptions = (paths: any) => {

    Object.keys(paths).forEach(key => {
        Object.keys(paths[key]).forEach(method => {
            const description = paths[key][method].description?.replace(/<!--[\s\S]*?-->/g, '') ?? null;

            if(description){
                paths[key][method].description = description
            }
        })
    })

    console.log(paths)

    return paths
}
