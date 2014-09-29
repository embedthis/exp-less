/*
    expansive.es - Configuration for exp-lessc

    Transform by less into css. Uses lessc|recess.
 */
Expansive.load({
    expansive: {
        transforms: {
            name:   'compile-less',
            input:  'less',
            output: 'css',
            script: `
                function transform(contents, meta, service) {
                    let less = Cmd.locate('lessc')
                    if (less) {
                        contents = Cmd.run(less + ' - ', {dir: meta.file.dirname}, contents)
                    } else {
                        let recess = Cmd.locate('recess')
                        if (recess) {
                            let results = runFile(recess + ' -compile', contents, meta)
                            if (results == '') {
                                /* Failed, run again to get diagnostics - Ugh! */
                                let errors = runFile(recess, contents, meta)
                                throw 'Failed to parse less sheet ' + meta.file + '\n' + errors + '\n'
                            }
                            contents = results
                        } else {
                            trace('Warn', 'Cannot find lessc or recess')
                        }
                    }
                    return contents
                }
            `
        }
    }
})
