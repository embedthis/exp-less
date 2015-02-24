/*
    expansive.es - Configuration for exp-less

    Transform by less into css. Uses lessc|recess.
 */
Expansive.load({
    transforms: [{
        name:   'compile-less-css',
        mappings: {
            less: [ 'css', 'less' ],
        }
        stylesheet: 'css/all.css',
        dependencies: null,
        script: `
            let service = expansive.services['compile-less-css']
            if (service.enable) {
                let control = expansive.control
                if (expansive.directories.contents.join(service.stylesheet + '.less').exists) {
                    if (!service.dependencies) {
                        service.dependencies ||= {}
                        service.dependencies[service.stylesheet + '.less'] = '**.less'
                    }
                }
                blend(control.dependencies, service.dependencies)
            }

            function transform(contents, meta, service) {
                if (!meta.file.glob('**.css.less')) {
                    vtrace('Info', 'Skip included css file', meta.file)
                    return null
                }
                let less = Cmd.locate('lessc')
                if (less) {
                    contents = Cmd.run(less + ' - ', {dir: meta.source.dirname}, contents)
                } else {
                    /*
                        Can also use recess if lessc not installed
                     */
                    let recess = Cmd.locate('recess')
                    if (recess) {
                        let results = runFile(recess + ' -compile', contents, meta)
                        if (results == '') {
                            /* Failed, run again to get diagnostics - Ugh! */
                            let errors = runFile(recess, contents, meta)
                            throw 'Failed to parse less sheet ' + meta.source + '\n' + errors + '\n'
                        }
                        contents = results
                    } else {
                        trace('Warn', 'Cannot find lessc or recess')
                    }
                }
                return contents
            }
        `
    }, {
        /*
            Abort processing unwanted css files
            Uses configuration from compile-less-css (stylesheet)
         */
        name:     'clean-css',
        mappings: 'css',
        enable:   false,
        script: `
            function transform(contents, meta, service) {
                let lservice = expansive.services['compile-less-css']
                if (lservice.stylesheet) {
                    if (lservice.stylesheet != meta.dest) {
                        contents = null
                    }
                }
                return contents
            }
        `
    }]
})
